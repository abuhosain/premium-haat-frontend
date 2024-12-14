"use client";

import PHForm from "@/src/components/form/PHForm";
import PHInput from "@/src/components/form/PHInput";
import PHTextarea from "@/src/components/form/PHTextArea";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import { useCreateProduct } from "@/src/hooks/product.hooks";
import { createProductValidationSchema } from "@/src/schema/product.schema";
import { getCurrentUser } from "@/src/services/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export default function CreatProductPage() {
  const { user } = useUser();
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<File | null>(null);
  const {
    mutate: handleCreateProduct,
    isPending,
    isSuccess,
    data,
  } = useCreateProduct();

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = (data: any) => {
    console.log(user?.id)
    const formData = new FormData();

    // Check if a profile picture is selected
    if (imageFiles !== null) {
      formData.append("file", imageFiles); // Append image
      // Append password and customer details as JSON string
      formData.append(
        "data",
        JSON.stringify({
          vendorId: "57dd87ec-d31b-4760-9392-2eafe0610173",
          categoryId: data.categoryId,
          title: data.title,
          description: data.description,
          price: data.price,
          quantity: data.quantity,
          discount: data.discount,
        })
      );
      handleCreateProduct(formData);
    } else {
      toast.error("Please input profile picture");
    }
  };

  // Handle image file change
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files![0];
    setImageFiles(files);
  };

  useEffect(() => {
    if (data && !data?.success) {
      toast.error(data?.message as string);
    }
    if (isSuccess && data?.success) {
      toast.success("Product created successfully");
      router.push("/"); // Redirect to homepage or login page after success
    }
  }, [data, isSuccess, router]);

  return (
    <>
      {isPending && <Loading />} {/* Show loading state while pending */}
      <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center">
        <h3 className="my-2 text-xl font-bold">Create new product</h3>

        <div className="w-[35%]">
          <PHForm
            resolver={zodResolver(createProductValidationSchema)}
            onSubmit={onSubmit}
          >
            {/* Input fields for registration */}
            <div className="py-3">
              <PHInput label="Title" name="title" size="sm" />
            </div>
            <div className="py-3">
              <PHInput label="Price" name="price" size="sm" type="number" />
            </div>
            <div className="py-3">
              <PHInput
                label="Quantity"
                name="quantity"
                size="sm"
                type="number"
              />
            </div>
            <div className="py-3">
              <PHInput label="Category" name="categoryId" size="sm" />
            </div>
            <div className="py-3">
              <PHInput
                label="Discount"
                name="discount"
                size="sm"
                type="number"
              />
            </div>
            <div className="py-3">
              <PHTextarea label="Description" name="description" size="sm" />
            </div>

            {/* Image upload */}
            <div className="py-3">
              <label
                className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                htmlFor="image"
              >
                Upload Product Picture
              </label>
              <input
                multiple
                className="hidden"
                id="image"
                type="file"
                onChange={handleImageChange}
              />
            </div>

            {/* Submit button */}
            <Button
              className="my-3 w-full rounded-md bg-default-900 text-default"
              size="lg"
              type="submit"
            >
              Create Product
            </Button>
          </PHForm>
        </div>
      </div>
    </>
  );
}
