import { useQueryProdutcts } from "./service";
import { Table, ScrollArea, UnstyledButton, Group, Text, Center, TextInput, rem, keys } from "@mantine/core";
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from "@tabler/icons-react";
import classes from "./table.module.css";
import { useEffect, useState } from "react";
import { Loading } from "@/components/loading";

const CategoryFeatures = () => {
  const { data, isFetching } = useQueryProdutcts(0);
  const products = data?.data.products;
  console.log(products, isFetching);
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(products);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  useEffect(() => {
    setSortedData(sortData(products, { sortBy, reversed: reverseSortDirection, search }));
  }, [products, reverseSortDirection, search, sortBy]);

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(products, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(products, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const rows = sortedData?.map((row) => (
    <tr key={row.id}>
      <td>{row.category}</td>
      <td>{row.createdAt}</td>
      <td>{row.updatedAt}</td>
    </tr>
  ));

  return (
    <ScrollArea>
      <TextInput placeholder="Search by any field" mb="md" leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />} value={search} onChange={handleSearchChange} />
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
        <tbody>
          <tr>
            <Th sorted={sortBy === "category"} reversed={reverseSortDirection} onSort={() => setSorting("category")}>
              Category
            </Th>
            <Th sorted={sortBy === "createdAt"} reversed={reverseSortDirection} onSort={() => setSorting("createdAT")}>
              Created At
            </Th>
            <Th sorted={sortBy === "updatedAt"} reversed={reverseSortDirection} onSort={() => setSorting("updatedAt")}>
              Updated At
            </Th>
          </tr>
        </tbody>
        <tbody>
          {rows?.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={!isFetching ? Object.keys(products[0]).length : ""}>
                <Center>
                  <Loading />
                </Center>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
};

export default CategoryFeatures;

function Th({ children, reversed, sorted, onSort }) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data, search) {
  const query = search.toLowerCase().trim();
  return data?.filter((item) => Object.keys(data[0]).some((key) => typeof item[key] === "string" && item[key].toLowerCase().includes(query)));
}

function sortData(data, payload) {
  var sortBy = payload.sortBy;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    data?.slice().sort(function (a, b) {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}
