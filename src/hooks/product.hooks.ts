import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { createProduct } from "../services/Products";

export const useCreateProduct = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_PRODUCT"],
    mutationFn: async (userData) => await createProduct(userData),
  });
};
