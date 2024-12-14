"use server";

import axiosInstance from "@/src/lib/AxiousInstance";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerCustomer = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/user/create-customer",
      userData
    );
    if (data.success) {
      (await cookies()).set("accessToken", data?.data?.accessToken);
      (await cookies()).set("refreshToken", data?.data?.refreshToken);
    }
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
