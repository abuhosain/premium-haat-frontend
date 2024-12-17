"use client";

import PHForm from "@/src/components/form/PHForm";
import PHInput from "@/src/components/form/PHInput";
import PHSelect from "@/src/components/form/PHSelect";
import PHTextarea from "@/src/components/form/PHTextArea";
import Loading from "@/src/components/UI/Loading";
import { useGetAllCateogry } from "@/src/hooks/category.hooks";
import {
  useUpdateProduct,
  useGetSingleProduct,
} from "@/src/hooks/product.hooks";
import { createProductValidationSchema } from "@/src/schema/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { ChangeEvent, use, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface Params {
  productId: string;
}

export default function UpdateProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { productId } = use(params); 
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<File | null>(null);

  // Fetch categories
  const { data: categories, isLoading, isError } = useGetAllCateogry();

  // Fetch single product data
  const {
    data: singleProduct,
    isPending: singleProductPending,
    isSuccess: isProductLoaded,
  } = useGetSingleProduct(productId);

  // Update product mutation
  const {
    mutate: handleUpdateProduct,
    isPending,
    isSuccess,
    data: updateResponse,
  } = useUpdateProduct();

  const categoryOptions = categories?.data?.map(
    (category: { id: string; name: string }) => ({
      key: category.id,
      label: category.name,
    })
  );

  const onSubmit: SubmitHandler<FormData> = (formData: any) => {
    const formDataObj = new FormData();
    if (imageFiles) {
      formDataObj.append("file", imageFiles);
    }
    formDataObj.append(
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

    handleUpdateProduct({ productId, productData: formDataObj });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFiles(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (updateResponse && !updateResponse?.success) {
      toast.error(updateResponse?.message as string);
    }
    if (isSuccess && updateResponse?.success) {
      toast.success("Product updated successfully.");
      router.push("/");
    }
  }, [updateResponse, isSuccess, router]);

  if (isLoading) return <Loading />;
  if (isError)
    return <p className="text-red-500">Failed to load categories.</p>;
  if (singleProductPending) return <Loading />;
  if (!isProductLoaded || !singleProduct)
    return <p className="text-red-500">Failed to load product details.</p>;

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center border p-6">
      <h3 className="mb-4 text-2xl font-semibold text-gray-800">
        Update Product
      </h3>
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-md">
        <PHForm
          resolver={zodResolver(createProductValidationSchema)}
          onSubmit={onSubmit}
          defaultValues={singleProduct?.data} // Prefill form with product data
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <PHInput label="Title" name="title" size="sm" />
            <PHInput label="Price" name="price" size="sm" type="number" />
            <PHInput label="Quantity" name="quantity" size="sm" type="number" />
            {categoryOptions?.length ? (
              <PHSelect
                label="Category"
                name="categoryId"
                options={categoryOptions}
              />
            ) : (
              <p className="col-span-full text-red-500">
                No categories available
              </p>
            )}
            <PHInput label="Discount" name="discount" size="sm" type="number" />
          </div>
          <div className="my-6">
            <PHTextarea label="Description" name="description" size="sm" />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="image"
            >
              Change Product Image
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
            {isPending ? "Updating..." : "Update Product"}
          </Button>
        </PHForm>
      </div>
    </div>
  );
}
