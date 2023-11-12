import Navbar from "@/components/Navbar";
import { SectionContextProvider } from "@/components/SectionContext";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <SectionContextProvider>
        <Navbar />
        {children}
      </SectionContextProvider>
    </>
  );
};

export default Layout;
