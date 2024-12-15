"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { ChangeEvent, useState, useEffect } from "react";

import { useUser } from "@/src/context/user.provider";
import { useGetVendor, useUpdateVendor } from "@/src/hooks/vendor.hook";
import PHForm from "@/src/components/form/PHForm";
import PHInput from "@/src/components/form/PHInput";
import PHTextarea from "@/src/components/form/PHTextArea";

// Define the validation schema with Zod
const profileSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  description: z.string().optional(),
});

const EditVendorProfile = () => {
  const [imageFiles, setImageFiles] = useState<File | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const { mutate: updateProfile, isPending } = useUpdateVendor();
  const { data } = useGetVendor();
  const { setIsLoading } = useUser();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();
    console.log(data);
    if (imageFiles !== null) {
      formData.append("file", imageFiles);
    }

    formData.append(
      "data",
      JSON.stringify({
        updatedData: data,
      })
    );
    updateProfile(formData, {
      onSuccess: () => {
        setIsSuccess(true);
      },
      onError: () => {
        setIsSuccess(false);
      },
    });

    setIsLoading(true);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files![0];
    setImageFiles(files);
  };

  useEffect(() => {
    if (isSuccess !== null) {
      const timer = setTimeout(() => {
        setIsSuccess(null); // Reset success message after 3 seconds
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Edit Profile
      </h2>

      {isSuccess === true && (
        <div className="mb-4 p-3 bg-green-500 text-white text-center rounded-md">
          Profile updated successfully!
        </div>
      )}

      {isSuccess === false && (
        <div className="mb-4 p-3 bg-red-500 text-white text-center rounded-md">
          Something went wrong. Please try again.
        </div>
      )}

      <PHForm
        defaultValues={data?.data}
        resolver={zodResolver(profileSchema)}
        onSubmit={onSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Personal Information Section */}
          <div className="border p-6 rounded-lg bg-white dark:bg-gray-700 shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Personal Information
            </h3>

            <div className="py-3">
              <PHInput label="Name" name="name" type="text" />
            </div>

            <div className="py-3">
              <PHInput label="Phone Number" name="phone" type="text" />
            </div>
          </div>

          {/* Bio Section */}
          <div className="border p-6 rounded-lg bg-white dark:bg-gray-700 shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Descripton
            </h3>

            <PHTextarea label="Description" name="description" />

            <div className="py-3 ">
              <label
                className="flex border-dashed h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 shadow-sm transition-all duration-100 hover:border-gray-400 dark:hover:border-gray-500"
                htmlFor="image"
              >
                Change Profile Picture
              </label>
              <input
                multiple
                className="hidden"
                id="image"
                type="file"
                onChange={(e) => handleImageChange(e)}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            className="my-3 w-full rounded-md bg-blue-600 text-white font-semibold transition-all duration-200 hover:bg-blue-700 disabled:bg-blue-300"
            disabled={isPending}
            size="lg"
            type="submit"
          >
            {isPending ? "Updating..." : "Update Profile"}
          </Button>
        </div>
      </PHForm>
    </div>
  );
};

export default EditVendorProfile;
