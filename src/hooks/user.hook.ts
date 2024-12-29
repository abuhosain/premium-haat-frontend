import { useMutation } from "@tanstack/react-query";
import { addFollowUnfollow } from "../services/User";
import { toast } from "sonner";

export const useAddFollowAndUnfollow = () => {
  return useMutation({
    mutationKey: ["FOLLOW_UNFOLLOW_USER"],
    mutationFn: async ({ vendorId }: { vendorId: string }) =>
      await addFollowUnfollow(vendorId),
    onSuccess: () => {
      toast.success("Your submission successfully done");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to follow this user");
    },
  });
};
