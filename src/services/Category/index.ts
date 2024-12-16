"use server";

import axiosInstance from "@/src/lib/AxiousInstance";
import { FieldValues } from "react-hook-form";

export const getAllCategories = async () => {
  let fetchOptions = {};
  fetchOptions = {
    cache: "no-store",
  };
  const { data } = await axiosInstance.get("/category", fetchOptions);
  return data;
};



export const updateProduct = async (
  productId: string,
  productData: FieldValues
) => {
  try {
    const { data } = await axiosInstance.put(
      `/category/${productId}`,
      productData
    );
    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };
    return data; // Fallback error
  }
};