"use client";

import Link from "next/link";
import { Button } from "@nextui-org/react";

import { useEffect, useState } from "react";
import ProductTable from "@/src/components/vendorDashbaord/VendorProductTable";
import { useGetAllCateogry } from "@/src/hooks/category.hooks";
import CateogryTable from "@/src/components/UI/adminDashboard/CategoryTable";

const ManageCategory = () => {
  const { data, isPending } = useGetAllCateogry();
  const [category, setCategory] = useState<any[]>([]);

  useEffect(() => {
    if (data?.data) {
      setCategory(data?.data || []);
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
      <CateogryTable
        isLoading={isPending}
        categories={category}
        setCategory={setCategory}
      />
    </div>
  );
};

export default ManageCategory;
