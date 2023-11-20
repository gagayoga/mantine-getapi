import { DashboardLayout } from "@/components/layouts";
import CategoryFeatures from "@/features/category";

export default function Category() {
  return (
    <>
      <CategoryFeatures />
    </>
  );
}

Category.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
