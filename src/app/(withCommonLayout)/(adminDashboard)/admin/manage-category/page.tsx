"use client";

import Link from "next/link";
import { Button } from "@nextui-org/react";

import { useEffect, useState } from "react";
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
      <h3 className="text-2xl font-bold mb-4 text-center">Our Category</h3>
      <Link className="flex justify-end" href="/admin/create-category">
        <Button className="mb-4" color="success">
          Create Category
        </Button>
      </Link>
      <CateogryTable
        categories={category}
        isLoading={isPending}
        setCategory={setCategory}
      />
    </div>
  );
};

export default ManageCategory;
