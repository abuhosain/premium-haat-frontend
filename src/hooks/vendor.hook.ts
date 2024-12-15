import { useQuery } from "@tanstack/react-query";
import { getVendor } from "../services/Vendor";

export const useGetVendor = () => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_VENDOR"],
    queryFn: async () => await getVendor(),
  });
};
