import { useMutation } from "@tanstack/react-query";
import { changePassword, forgotPassword, loginUser, registerCustomer, registerVendor, resetPassword } from "../services/Auth";
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




export const useForgotPassword = () => {
  return useMutation<any, Error, FieldValues>({
      mutationKey: ["FORGOT_PASSWORD"],
      mutationFn: async (userData) => await forgotPassword(userData),
      onSuccess: () => {
          toast.success('Send Recovery token to user email Successful')
      },
      onError: (error) => {
          toast.error(error.message)
      }
  })

}


export const useResetPassword = () => {

  return useMutation<any, Error, FieldValues>({
      mutationKey: ["RESET_PASSWORD"],
      mutationFn: async (userData) => await resetPassword(userData),
      onSuccess: () => {
          toast.success('Password Resset  Successfully')
      },
      onError: (error) => {
          toast.error(error.message)
      }
  })

}


export const useChangePassword = () => {

  return useMutation<any, Error, FieldValues>({
      mutationKey: ["CHANGE_PASSWORD"],
      mutationFn: async (userData) => await changePassword(userData),
      onSuccess: () => {
          toast.success('Password Changed Successfully')
      },
      onError: (error) => {
          toast.error(error.message)
      }
  })

}