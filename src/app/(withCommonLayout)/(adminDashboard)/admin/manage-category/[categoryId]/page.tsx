"use client";

import PHForm from "@/src/components/form/PHForm";
import PHInput from "@/src/components/form/PHInput";
import Loading from "@/src/components/UI/Loading";
import { useUpdateCategory, useGetSingleCategory } from "@/src/hooks/category.hooks";
import { createCategoryValidationSchema } from "@/src/schema/category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { ChangeEvent, use, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface Params {
  categoryId: string;
}

export default function UpdateCategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { categoryId } = use(params); // Unwrap `params` using React.use()
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<File | null>(null);

  // Fetch single category data
  const {
    data: singleCategory,
    isPending: singleCategoryPending,
    isSuccess: isCategoryLoaded,
  } = useGetSingleCategory(categoryId);

  // Update category mutation
  const {
    mutate: handleUpdateCategory,
    isPending,
    isSuccess,
    data: updateResponse,
  } = useUpdateCategory();

  const onSubmit: SubmitHandler<FormData> = (formData: any) => {
    const formDataObj = new FormData();
    if (imageFiles) {
      formDataObj.append("file", imageFiles);
    }
    formDataObj.append(
      "data",
      JSON.stringify({
        name: formData.name,
      })
    );

    handleUpdateCategory({ categoryId, categoryData: formDataObj });
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
      toast.success("Category updated successfully.");
      router.push("/admin/manage-category");
    }
  }, [updateResponse, isSuccess, router]);

  if (singleCategoryPending) return <Loading />;
  if (!isCategoryLoaded || !singleCategory)
    return <p className="text-red-500">Failed to load category details.</p>;

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center border p-6">
      <h3 className="mb-4 text-2xl font-semibold text-gray-800">
        Update Category
      </h3>
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-md">
        <PHForm
          resolver={zodResolver(createCategoryValidationSchema)}
          onSubmit={onSubmit}
          defaultValues={singleCategory?.data} // Prefill form with category data
        >
          <div className="grid grid-cols-1 gap-6">
            <PHInput label="Category Name" name="name" size="sm" />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="image"
            >
              Change Category Image
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
            {isPending ? "Updating..." : "Update Category"}
          </Button>
        </PHForm>
      </div>
    </div>
  );
}
