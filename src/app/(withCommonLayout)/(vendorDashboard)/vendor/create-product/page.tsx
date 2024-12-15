"use client";

import PHForm from "@/src/components/form/PHForm";
import PHInput from "@/src/components/form/PHInput";
import PHSelect from "@/src/components/form/PHSelect";
import PHTextarea from "@/src/components/form/PHTextArea";
import Loading from "@/src/components/UI/Loading";
import { useGetAllCateogry } from "@/src/hooks/category.hooks";
import { useCreateProduct } from "@/src/hooks/product.hooks";
import { createProductValidationSchema } from "@/src/schema/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export default function CreateProductPage() {
  const { data: Category, isLoading, isError } = useGetAllCateogry();
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<File | null>(null);
  const { mutate: handleCreateProduct, isPending, isSuccess, data } =
    useCreateProduct();

  const categoryData = Category?.data?.map((item: { id: string; name: string }) => ({
    key: item.id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FormData> = (formData: any) => {
    if (!imageFiles) {
      toast.error("Please input product image");
      return;
    }

    const data = new FormData();
    data.append("file", imageFiles);
    data.append(
      "data",
      JSON.stringify({
        categoryId: formData.categoryId,
        title: formData.title,
        description: formData.description,
        price: formData.price,
        quantity: formData.quantity,
        discount: formData.discount,
      })
    );
    handleCreateProduct(data);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files![0];
    setImageFiles(files);
  };

  useEffect(() => {
    if (data && !data?.success) toast.error(data?.message as string);
    if (isSuccess && data?.success) {
      toast.success("Product created successfully");
      router.push("/");
    }
  }, [data, isSuccess, router]);

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">Failed to load categories</p>;

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center border p-6">
      <h3 className="mb-4 text-2xl font-semibold text-gray-800">Create New Product</h3>
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-md">
        <PHForm
          resolver={zodResolver(createProductValidationSchema)}
          onSubmit={onSubmit}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <PHInput label="Title" name="title" size="sm" />
            <PHInput label="Price" name="price" size="sm" type="number" />
            <PHInput label="Quantity" name="quantity" size="sm" type="number" />
            {categoryData?.length ? (
              <PHSelect label="Category" name="categoryId" options={categoryData} />
            ) : (
              <p className="col-span-full text-red-500">No categories available</p>
            )}
            <PHInput label="Discount" name="discount" size="sm" type="number" />
          </div>
          <div className="my-6">
            <PHTextarea label="Description" name="description" size="sm" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700" htmlFor="image">
              Upload Product Image
            </label>
            <input
              className="mt-2 block w-full rounded border-gray-300 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              id="image"
              type="file"
              onChange={handleImageChange}
            />
          </div>
          <Button
            className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
            isLoading={isPending}
            size="lg"
            type="submit"
          >
            {isPending ? "Creating..." : "Create Product"}
          </Button>
        </PHForm>
      </div>
    </div>
  );
}
