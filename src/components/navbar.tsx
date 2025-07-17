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
import { Badge } from "@nextui-org/badge";
import NextLink from "next/link";
import clsx from "clsx";
import NavbarDropdown from "./UI/NavbarDropdown";
import { siteConfig } from "@/src/config/site";
import { ThemeSwitch } from "@/src/components/theme-switch";
import { useUser } from "../context/user.provider";
import Image from "next/image";
import { ShoppingCart, User, Menu, X, Bell } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mock cart count - replace with actual cart state
  const cartCount = 0;

  return (
    <NextUINavbar
      className="border-b border-slate-200/20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm"
      isMenuOpen={isMenuOpen}
      maxWidth="xl"
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Main Content */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        {/* Brand */}
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink
            className="flex justify-start items-center gap-3 group"
            href="/"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
              <Image
                alt="Premium"
                className="relative rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-1.5 group-hover:scale-110 transition-transform duration-300"
                height={42}
                src="/premium.png"
                width={42}
              />
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-slate-900 dark:text-white text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                Premium
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 -mt-1">
                Marketplace
              </p>
            </div>
          </NextLink>
        </NavbarBrand>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex gap-1 justify-start ml-8">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  "px-4 py-2 rounded-lg font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 relative group"
                )}
                href={item.href}
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full" />
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {/* Right Side Actions */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="flex gap-2">
          <ThemeSwitch />
        </NavbarItem>

        {/* Notifications */}
        {user?.email && (
          <NavbarItem>
            <Badge color="danger" content="2" size="sm">
              <Button
                isIconOnly
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                variant="light"
              >
                <Bell size={20} />
              </Button>
            </Badge>
          </NavbarItem>
        )}

        {/* Cart */}
        <NavbarItem>
          <Badge
            color="primary"
            content={cartCount > 0 ? cartCount.toString() : ""}
            size="sm"
          >
            <Button
              isIconOnly
              as={Link}
              className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
              href="/cart"
              variant="light"
            >
              <ShoppingCart size={20} />
            </Button>
          </Badge>
        </NavbarItem>

        {/* User Actions */}
        {user?.email ? (
          <NavbarItem>
            <NavbarDropdown />
          </NavbarItem>
        ) : (
          <NavbarItem className="flex gap-2">
            <Button
              as={Link}
              className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
              href="/register"
              variant="light"
            >
              Sign Up
            </Button>
            <Button
              as={Link}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              href="/login"
              startContent={<User size={18} />}
            >
              Login
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      {/* Mobile Content */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarItem>
          <Badge
            color="primary"
            content={cartCount > 0 ? cartCount.toString() : ""}
            size="sm"
          >
            <Button
              isIconOnly
              as={Link}
              className="text-slate-600 dark:text-slate-400"
              href="/cart"
              variant="light"
            >
              <ShoppingCart size={20} />
            </Button>
          </Badge>
        </NavbarItem>

        {user?.email ? (
          <NavbarItem>
            <NavbarDropdown />
          </NavbarItem>
        ) : (
          <NavbarItem>
            <Button
              isIconOnly
              as={Link}
              className="text-slate-600 dark:text-slate-400"
              href="/login"
              variant="light"
            >
              <User size={20} />
            </Button>
          </NavbarItem>
        )}

        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>

        <NavbarMenuToggle className="text-slate-600 dark:text-slate-400">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </NavbarMenuToggle>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-700">
        {/* Mobile Navigation Items */}
        <div className="flex flex-col gap-2 px-4 py-4">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className={clsx(
                  "w-full py-3 px-4 rounded-lg font-medium transition-all duration-200",
                  index === siteConfig.navMenuItems.length - 1
                    ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                )}
                href={item.href}
                size="lg"
                onPress={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>

        {/* Mobile User Actions */}
        {!user?.email && (
          <div className="px-4 py-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
            <Button
              as={Link}
              className="w-full justify-start text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
              href="/register"
              variant="light"
              onPress={() => setIsMenuOpen(false)}
            >
              Create Account
            </Button>
            <Button
              as={Link}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium"
              href="/login"
              startContent={<User size={18} />}
              onPress={() => setIsMenuOpen(false)}
            >
              Login
            </Button>
          </div>
        )}
      </NavbarMenu>
    </NextUINavbar>
  );
};
