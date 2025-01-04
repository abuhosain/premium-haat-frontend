import Footer from "@/src/components/UI/Home/Footer";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="container mx-auto max-w-7xl px-6 flex-grow">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default layout;
