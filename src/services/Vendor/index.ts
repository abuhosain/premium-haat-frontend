"use server";

import axiosInstance from "@/src/lib/AxiousInstance";
import { FieldValues } from "react-hook-form";

export const getVendor = async () => {
  let fetchOptions = {};
  fetchOptions = {
    cache: "no-store",
  };
  const { data } = await axiosInstance.get("/vendor/me", fetchOptions);
  return data;
};

export const getAllProdutByVendor = async () => {
  let fetchOptions = {};
  fetchOptions = {
    cache: "no-store",
  };
  const { data } = await axiosInstance.get(
    "/product/vendor/product",
    fetchOptions
  );
  return data;
};

export const updateVendor = async (updatedData: FieldValues) => {
  try {
    const { data } = await axiosInstance.put("/vendor/update", updatedData);
    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };
    return data; // Fallback error
  }
};
