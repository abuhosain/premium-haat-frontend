import { useMutation, useQuery } from "@tanstack/react-query";
import {
  BlockUser,
  DeleteUser,
  getAllActiveUser,
  getAllOrder,
  UnBlockUser,
} from "../services/Admin";

export const useGetAllActiveUser = () => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_ALL_ACTIVE_USER"],
    queryFn: async () => await getAllActiveUser(),
  });
};

export const useGetAllOrder = () => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_ALL_ORDER"],
    queryFn: async () => await getAllOrder(),
  });
};

// delete user
export const useDeleteUser = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_USER"],
    mutationFn: async (id) => await DeleteUser(id),
  });
};

// block user

export const useBlockUser = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["BLOCK_USER"],
    mutationFn: async (id) => await BlockUser(id),
  });
};

export const useUnBlockUser = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["UNBLOCK_USER"],
    mutationFn: async (id) => await UnBlockUser(id),
  });
};
