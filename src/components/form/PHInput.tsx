"use client";

import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

import { IInput } from "@/src/types";

interface IProps extends IInput {}

export default function FXInput({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const errorMessage = errors ? (errors[name]?.message as string) : ""; // Get the error message for the specific field
  const isInvalid = !!errorMessage; // Check if there's an error
  return (
    <Input
      {...register(name)}
      errorMessage={errorMessage}
      isInvalid={isInvalid}
      label={label}
      required={required}
      size={size}
      type={type}
      variant={variant}
    />
  );
}
