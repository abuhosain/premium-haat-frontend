import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label?: string;
  name: string;
  disabled?: boolean;
}

export interface IUser {
  email: string;
  role: string;
  id: string;
  name: string;
  img: string;
  phone: string;
  iat: number;
  exp: number;
}
