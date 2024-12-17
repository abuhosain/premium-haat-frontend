"use server";

import axiosInstance from "@/src/lib/AxiousInstance";
import { FieldValues } from "react-hook-form";

export const orderProduct = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/order/confirmation", userData);
    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };
    return data;
  }
};
