"use server";
import envConfig from "@/src/config/env.confg";
import axiosInstance from "@/src/lib/AxiousInstance";
import { FieldValues } from "react-hook-form";

export const getAllProduts = async () => {
  const res = await fetch(`${envConfig.baseApi}/product`);
  return res.json();
};

export const createProduct = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/product/create-product",
      userData
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

export const deleteProduct = async (id: string) => {
  const { data } = await axiosInstance.delete(`/product/${id}`);
  return data;
};

