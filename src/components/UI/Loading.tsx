import { Spinner } from "@nextui-org/spinner";
import React from "react";

export default function Loading() {
  return (
    <div className="bg-black-500/10 h-screen flex justify-center items-center   fixed inset-0 z-[999] backdrop-blur-md">
      <Spinner size="lg" />
    </div>
  );
}
