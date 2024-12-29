"use server";

import axiosInstance from "@/src/lib/AxiousInstance";

export const addFollowUnfollow = async (vendorId: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(`/follow/${vendorId}`);
    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };
    return data;
  }
};
