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

export const createCategory = async (categoryData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/category/create-category",
      categoryData
    );
    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };
    return data;
  }
};

export const updateCategory = async (
  categoryId: string,
  cateogryData: FieldValues
) => {
  try {
    const { data } = await axiosInstance.put(
      `/category/${categoryId}`,
      cateogryData
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

export const deleteCategory = async (id: string) => {
  const { data } = await axiosInstance.delete(`/category/${id}`);
  return data;
};
