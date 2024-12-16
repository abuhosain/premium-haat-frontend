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
  phone?: string;
  iat?: number;
  exp?: number;
}

// types/product.ts

export type IProduct = {
  id: string; // Unique identifier for the product
  vendorId: string; // Identifier for the vendor
  title: string; // Name or title of the product
  img: string; // URL of the product image
  description: string; // Detailed description of the product
  price: number; // Price of the product
  categoryId: string; // Identifier for the category the product belongs to
  quantity: number; // Available quantity in stock
  discount: number; // Discount percentage or amount
  couponId?: string; // Optional identifier for an associated coupon
  createdAt: Date; // Date and time the product was created

  // Relations
  category: {
    id: string;
    name: string;
  }; // Associated category details
  vendor: {
    id: string;
    name: string;
    logo: string;
  }; // Vendor details
  coupon?: {
    id: string;
    code: string;
    discount: number;
  }; // Optional coupon details
  review: {
    id: string;
    rating: number;
    comment: string;
    createdAt: Date;
  }[]; // List of reviews for the product
  orderItem: {
    id: string;
    orderId: string;
    quantity: number;
    totalPrice: number;
  }[];  
};
