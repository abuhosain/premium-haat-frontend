import { useMutation } from "@tanstack/react-query";
import { loginUser, registerCustomer, registerVendor } from "../services/Auth";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useCustomerRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CUSTOMER_REGISTRATION"],
    mutationFn: async (userData) => await registerCustomer(userData),
  });
};
export const useVendorRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["VENDOR_REGISTRATION"],
    mutationFn: async (userData) => await registerVendor(userData),
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["LOGIN_USER"],
    mutationFn: async (userData) => await loginUser(userData),
    //     onSuccess : () => {
    //         toast.success("User Logged successfully")
    //    },
    //    onError : (error) => {
    //         toast.error(error.message)
    //    }
  });
};
