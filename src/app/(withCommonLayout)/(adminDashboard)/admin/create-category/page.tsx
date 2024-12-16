"use client";

import PHForm from "@/src/components/form/PHForm";
import PHInput from "@/src/components/form/PHInput";
import { useCreateCategory } from "@/src/hooks/category.hooks";
import { createCategoryValidationSchema } from "@/src/schema/category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export default function CreateCategoryPage() {
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<File | null>(null);
  const {
    mutate: handleCreateCategory,
    isPending,
    isSuccess,
    data,
  } = useCreateCategory();

  const onSubmit: SubmitHandler<FormData> = (formData: any) => {
    if (!imageFiles) {
      toast.error("Please upload a category image");
      return;
    }
    const data = new FormData();
    data.append("file", imageFiles);
    data.append(
      "data",
      JSON.stringify({
        name: formData.name,
      })
    );
    handleCreateCategory(data);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files![0];
    setImageFiles(files);
  };

  useEffect(() => {
    if (data && !data?.success) toast.error(data?.message as string);
    if (isSuccess && data?.success) {
      toast.success("Category created successfully");
      router.push("/admin/manage-category");
    }
  }, [data, isSuccess, router]);

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center   p-6">
      <div className="w-full max-w-2xl rounded-xl  p-8 shadow-lg border">
        <h3 className="mb-2 text-3xl font-extrabold  text-center">
          Create New Category
        </h3>
        <p className="mb-6 text-center ">
          Add a new category to your inventory with an image and name.
        </p>

        <PHForm
          resolver={zodResolver(createCategoryValidationSchema)}
          onSubmit={onSubmit}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <PHInput
              label="Category Name"
              name="name"
              size="sm"
              
            />
          </div>

          <div className="mb-6 mt-5">
            <label
              className="block text-sm font-medium "
              htmlFor="image"
            >
              Upload Category Image
            </label>
            <div className="mt-2 flex items-center gap-4">
              <input
                className="hidden"
                id="image"
                type="file"
                onChange={handleImageChange}
              />
              <label
                htmlFor="image"
                className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-white shadow hover:bg-indigo-700"
              >
                Choose File
              </label>
              {imageFiles && (
                <span className="text-sm text-gray-700">{imageFiles.name}</span>
              )}
            </div>
          </div>

          <Button
            className="w-full rounded-lg bg-indigo-600 text-lg font-medium text-white hover:bg-indigo-700"
            isLoading={isPending}
            size="lg"
            type="submit"
          >
            {isPending ? "Creating..." : "Create Category"}
          </Button>
        </PHForm>
      </div>
    </div>
  );
}
