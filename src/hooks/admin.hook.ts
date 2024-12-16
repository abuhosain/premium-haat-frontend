import { useMutation, useQuery } from "@tanstack/react-query";
import {
  BlockUser,
  DeleteUser,
  getAllActiveUser,
  UnBlockUser,
} from "../services/Admin";
import { toast } from "sonner";

export const useGetAllActiveUser = () => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_ALL_ACTIVE_USER"],
    queryFn: async () => await getAllActiveUser(),
  });
};

// delete user
export const useDeleteUser = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_USER"],
    mutationFn: async (id) => await DeleteUser(id),
    onSuccess: () => {
      toast.success(" Delete User successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// block user

export const useBlockUser = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["BLOCK_USER"],
    mutationFn: async (id) => await BlockUser(id),
    onSuccess: () => {
      toast.success(" User blocked successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUnBlockUser = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["UNBLOCK_USER"],
    mutationFn: async (id) => await UnBlockUser(id),
    onSuccess: () => {
      toast.success(" User Unblcok successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
