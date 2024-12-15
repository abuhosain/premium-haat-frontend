"use client";

import Link from "next/link";
import { Button } from "@nextui-org/react";

import { useEffect, useState } from "react"; // Import useState and useEffect
import { useGetAllProductByVendor } from "@/src/hooks/vendor.hook";
import ProductTable from "@/src/components/vendorDashbaord/VendorProductTable";

const MyProductPage = () => {
  const { data, isPending } = useGetAllProductByVendor();
  const [product, setProduct] = useState<any[]>([]);  

  useEffect(() => {
    if (data?.data) {
      setProduct(data?.data || []);
    }
  }, [data]);
  return (
    <div className="lg:ml-4">
      <h3 className="text-2xl font-bold mb-4 text-center">My Products</h3>
      <Link className="flex justify-end" href="/vendor/create-product">
        <Button className="mb-4" color="success">
          Create Product
        </Button>
      </Link>
      <ProductTable
        isLoading={isPending}
        products={product}
        setProducts={setProduct}
      />
    </div>
  );
};

export default MyProductPage;
