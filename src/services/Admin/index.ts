"use server";

import axiosInstance from "@/src/lib/AxiousInstance";

export const getAllActiveUser = async () => {
  let fetchOptions = {};
  fetchOptions = {
    cache: "no-store",
  };
  const { data } = await axiosInstance.get("/admin", fetchOptions);
  return data;
};



// delete usser
export const DeleteUser = async (id: string) => {
    const { data } = await axiosInstance.delete(`/admin/user/${id}`);
    return data;
  };
  
  // block usser
  export const BlockUser = async (id: string) => {
    const { data } = await axiosInstance.put(`/admin/block/${id}`);
    return data;
  };
  
  // unblock usser
  export const UnBlockUser = async (id: string) => {
    const { data } = await axiosInstance.put(`/admin/unblock/${id}`);
    return data;
  }; 