"use server";

import axiosInstance from "@/src/lib/AxiousInstance";

export const getAllCategories = async () => {
  let fetchOptions = {};
  fetchOptions = {
    cache: "no-store",
  };
  const { data } = await axiosInstance.get("/category", fetchOptions);
  return data;
};
