import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { orderProduct } from "../services/Order";

export const useOrderProdcut = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["ORDER_PRODCUT"],
    mutationFn: async (userData) => await orderProduct(userData),
  });
};
