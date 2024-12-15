"use client";

import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import Loading from "@/src/components/UI/Loading";
import { useForgotPassword } from "@/src/hooks/auth.hook";
import { useUser } from "@/src/context/user.provider";
import PHForm from "@/src/components/form/PHForm";
import { forgotPasswordValidationSchema } from "@/src/schema/login.schema";
import PHInput from "@/src/components/form/PHInput";

const ForgotPassword = () => {
  const { setIsLoading: userLoading } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams?.get("redirect"); // Make sure it's used only on the client-side
  const {
    mutate: handleForgotPassword,
    isPending,
    isSuccess,
  } = useForgotPassword();

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess, redirect, router]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleForgotPassword(data);
    userLoading(true);
  };

  return (
    <>
      {isPending && <Loading />}
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <h3 className="my-4 text-3xl font-bold">Forgot Password</h3>
        <p className="mb-6 text-lg">Enter your email to reset your password</p>

        <div className="w-full max-w-md">
          <PHForm
            resolver={zodResolver(forgotPasswordValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-4">
              <PHInput label="Email" name="email" type="email" />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Reset Password
            </Button>
          </PHForm>

          <div className="text-center mt-4">
            Remember your password?{" "}
            <Link className="text-blue-500 hover:underline" href="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ForgotPassword />
    </Suspense>
  );
}
