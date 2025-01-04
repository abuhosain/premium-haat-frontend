"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import NavbarDropdown from "./UI/NavbarDropdown";

import { siteConfig } from "@/src/config/site";
import { ThemeSwitch } from "@/src/components/theme-switch";
import { useUser } from "../context/user.provider";
import Image from "next/image";
import { ShoppingCart, User } from "lucide-react";

export const Navbar = () => {
  const { user } = useUser();
  return (
    <NextUINavbar
      className="border-b bg-gradient-to-r from-blue-600 to-blue-800"
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2" href="/">
            <Image
              alt="Premium"
              className="rounded-full bg-white p-1"
              height={40}
              src="/premium.png"
              width={40}
            />
            <p className="font-bold text-inherit text-white text-xl">Premium</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-4">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-yellow-300 data-[active=true]:font-medium text-white hover:text-yellow-100 transition-colors"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem>
          <Link
            className="text-white hover:text-yellow-100 transition-colors"
            href="/cart"
          >
            <ShoppingCart size={24} />
          </Link>
        </NavbarItem>
        {user?.email ? (
          <NavbarItem className="flex gap-1">
            <NavbarDropdown />
          </NavbarItem>
        ) : (
          <NavbarItem className="flex gap-1">
            <Button
              as={Link}
              className="text-blue-800 bg-white hover:bg-blue-100 transition-colors"
              href="/login"
              startContent={<User size={20} />}
              variant="flat"
            >
              Login
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarItem>
          <Link
            className="text-white hover:text-yellow-100 transition-colors"
            href="/cart"
          >
            <ShoppingCart size={24} />
          </Link>
        </NavbarItem>
        {user?.email ? (
          <NavbarItem className="flex gap-1">
            <NavbarDropdown />
          </NavbarItem>
        ) : (
          <NavbarItem className="flex gap-1">
            <Link
              className="text-white hover:text-yellow-100 transition-colors"
              href="/login"
            >
              <User size={24} />
            </Link>
          </NavbarItem>
        )}
        <NavbarMenuToggle className="text-white" />
      </NavbarContent>

      <NavbarMenu className="bg-blue-800 bg-opacity-95">
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className={clsx(
                  "w-full",
                  index === siteConfig.navMenuItems.length - 1
                    ? "text-danger"
                    : "text-white hover:text-yellow-100"
                )}
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
