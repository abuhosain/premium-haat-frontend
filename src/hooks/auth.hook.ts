import { useMutation } from "@tanstack/react-query"
import { registerCustomer } from "../services/Auth"
import { FieldValues } from "react-hook-form"
import { toast } from "sonner"
import { error } from "console"

export const useCustomerRegistration = () => {
    return useMutation<any, Error, FieldValues>({
        mutationKey : ["CUSTOMER_REGISTRATION"],
        mutationFn : async (userData) => await registerCustomer(userData),
        onSuccess : () => {
            toast.success("Customer Registered Successfully")
        },
        onError : (error) => {
            toast.error(error.message)
        }
    })
}