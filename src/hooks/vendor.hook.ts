import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAllProdutByVendor,
  getAllProdutByVendorId,
  getAllVendorByVendorId,
  getVendor,
  updateVendor,
} from "../services/Vendor";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useGetVendor = () => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_VENDOR"],
    queryFn: async () => await getVendor(),
  });
};

export const useGetAllProductByVendor = () => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_ALL_PRODUCT_BY_VENDOR"],
    queryFn: async () => await getAllProdutByVendor(),
  });
};

export const useGetAllProductsByVendorId = (vendorId: string) => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_ALL_PRODUCT_BY_VENDOR_ID"],
    queryFn: async () => await getAllProdutByVendorId(vendorId),
  });
};
export const useGetVendorByVendorId = (vendorId: string) => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_VENDOR_BY_VENDOR"],
    queryFn: async () => await getAllVendorByVendorId(vendorId),
  });
};

export const useUpdateVendor = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_VEMDOR"],
    mutationFn: async ({ updatedData }) => await updateVendor(updatedData),
    onSuccess: () => {
      toast.success("Profile Updated succesfully");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
