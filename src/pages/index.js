import ProductsFeatures from "@/features/products";
import { DashboardLayout } from "@/components/layouts";

export default function Products() {
  return (
    <>
      <ProductsFeatures />
    </>
  );
}

Products.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
