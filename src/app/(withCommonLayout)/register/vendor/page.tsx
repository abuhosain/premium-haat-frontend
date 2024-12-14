"use client";

import PHForm from "@/src/components/form/PHForm";
import PHInput from "@/src/components/form/PHInput";
import PHTextarea from "@/src/components/form/PHTextArea";
import Loading from "@/src/components/UI/Loading";
import { useVendorRegistration } from "@/src/hooks/auth.hook";
import { vendorRegisterValidationSchema } from "@/src/schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export default function CustomerRegisterPage() {
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<File | null>(null);
  const {
    mutate: handleUserRegistration,
    isPending,
    isSuccess,
    data,
  } = useVendorRegistration();

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = (data: any) => {
    const { password, ...vendor } = data;

    const formData = new FormData();

    // Check if a profile picture is selected
    if (imageFiles !== null) {
      formData.append("file", imageFiles); // Append image

      formData.append(
        "data",
        JSON.stringify({
          password,
          vendor: {
            name: vendor.name,
            email: vendor.email,
            phone: vendor.phone,
            description: vendor.description,
          },
        })
      );
      handleUserRegistration(formData);
    } else {
      toast.error("Please input profile picture"); // Error if no image is selected
    }
  };

  // Handle image file change
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files![0];
    setImageFiles(files);
  };

  // Handle API response for success or error
  useEffect(() => {
    if (data && !data?.success) {
      toast.error(data?.message as string); // Show error message if registration fails
    }
    if (isSuccess && data?.success) {
      toast.success("Vendor created successfully");
      router.push("/");
    }
  }, [data, isSuccess, router]);

  return (
    <>
      {isPending && <Loading />} {/* Show loading state while pending */}
      <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center">
        <h3 className="my-2 text-xl font-bold">Register as a Vendor</h3>
        <p className="mb-4">For Better User Experience</p>
        <div className="w-[35%]">
          <PHForm
            resolver={zodResolver(vendorRegisterValidationSchema)}
            onSubmit={onSubmit}
          >
            {/* Input fields for registration */}
            <div className="py-3">
              <PHInput label="Name" name="name" size="sm" />
            </div>

            <div className="py-3">
              <PHInput label="Email" name="email" size="sm" />
            </div>
            <div className="py-3">
              <PHInput label="Phone" name="phone" size="sm" />
            </div>

            <div className="py-3">
              <PHInput
                label="Password"
                name="password"
                size="sm"
                type="password"
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
                Upload Profile Picture
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
              Registration
            </Button>
          </PHForm>
          <div className="text-center">
            Already have an account? <Link href="/login">Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}
