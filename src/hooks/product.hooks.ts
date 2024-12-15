import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import {
  createProduct,
  deleteProduct,
  getSingleProductById,
  updateProduct,
} from "../services/Products";
import { toast } from "sonner";

export const useCreateProduct = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_PRODUCT"],
    mutationFn: async (userData) => await createProduct(userData),
  });
};

export const useGetSingleProduct = (productId: string) => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_SINGLE_PRODUCT"],
    queryFn: async () => await getSingleProductById(productId),
  });
};

export const useUpdateProduct = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_PRODUCT"],
    mutationFn: async ({ productId, productData }) =>
      await updateProduct(productId, productData),
  });
};

export const useDeleteProduct = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_PRODUCT"],
    mutationFn: async (productId) => await deleteProduct(productId),
    onSuccess: () => {
      toast.success(" Delete Recipe  successfully");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
