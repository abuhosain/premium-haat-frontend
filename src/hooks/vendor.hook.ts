import { useQuery } from "@tanstack/react-query";
import { getAllProdutByVendor, getVendor } from "../services/Vendor";

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
