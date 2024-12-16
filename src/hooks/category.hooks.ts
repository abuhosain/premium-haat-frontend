import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategoryById,
  updateCategory,
} from "../services/Category";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useGetAllCateogry = () => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_ALL_CATEGORY"],
    queryFn: async () => await getAllCategories(),
  });
};

export const useCreateCategory = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_CATEGORY"],
    mutationFn: async (userData) => await createCategory(userData),
  });
};

export const useGetSingleCategory = (categoryId: string) => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_SINGLE_CATEGORY"],
    queryFn: async () => await getSingleCategoryById(categoryId),
  });
};

export const useUpdateCategory = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_CATEGORY"],
    mutationFn: async ({ categoryId, categoryData }) =>
      await updateCategory(categoryId, categoryData),
  });
};

export const useDeleteCategory = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_CATEGORY"],
    mutationFn: async (categoryId) => await deleteCategory(categoryId),
    onSuccess: () => {
      toast.success(" Delete Recipe  successfully");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
