"use client";

import PHForm from "@/src/components/form/PHForm";
import PHInput from "@/src/components/form/PHInput";
import Loading from "@/src/components/UI/Loading";
import { useCustomerRegistration } from "@/src/hooks/auth.hook";
import registerValidationSchema from "@/src/schema/register.schema";
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
  } = useCustomerRegistration();

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = (data: any) => {
    console.log(data);
    const { password, ...customer } = data;

    const formData = new FormData();

    // Check if a profile picture is selected
    if (imageFiles !== null) {
      formData.append("file", imageFiles); // Append image
      // Append password and customer details as JSON string
      formData.append(
        "data",
        JSON.stringify({
          password,
          customer: {
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
          },
        })
      );
      handleUserRegistration(formData);
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
      toast.success("Customer created successfully");
      router.push("/"); // Redirect to homepage or login page after success
    }
  }, [data, isSuccess, router]);

  return (
    <>
      {isPending && <Loading />} {/* Show loading state while pending */}
      <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center">
        <h3 className="my-2 text-xl font-bold">Register as a Customer</h3>
        <p className="mb-4">For Better User Experience</p>
        <div className="w-[35%]">
          <PHForm
            resolver={zodResolver(registerValidationSchema)}
            onSubmit={onSubmit}
          >
            {/* Input fields for registration */}
            <div className="py-3">
              <PHInput label="First Name" name="firstName" size="sm" />
            </div>
            <div className="py-3">
              <PHInput label="Last Name" name="lastName" size="sm" />
            </div>
            <div className="py-3">
              <PHInput label="Address" name="address" size="sm" />
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
