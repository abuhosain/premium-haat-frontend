import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../services/Category";

export const useGetAllCateogry = () => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_ALL_CATEGORY"],
    queryFn: async () => await getAllCategories(),
  });
};
