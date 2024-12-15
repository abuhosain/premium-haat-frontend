"use server";

import axiosInstance from "@/src/lib/AxiousInstance";

export const getVendor = async () => {
  let fetchOptions = {};
  fetchOptions = {
    cache: "no-store",
  };
  const { data } = await axiosInstance.get("/vendor/me", fetchOptions);
  return data;
};
