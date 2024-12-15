import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { createProduct, deleteProduct } from "../services/Products";
import { toast } from "sonner";

export const useCreateProduct = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_PRODUCT"],
    mutationFn: async (userData) => await createProduct(userData),
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
