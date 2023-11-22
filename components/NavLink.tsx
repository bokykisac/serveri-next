"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { buttonVariants } from "./ui/Button";

interface NavLinkProps {
  to: string;
}

const NavLink = ({ to, children }: PropsWithChildren<NavLinkProps>) => {
  const pathname = usePathname();

  const getNavVariant = () => {
    if (to === "/" && pathname === "/") return "default";
    if (to === "/" && pathname !== "/") return "link";
    return pathname?.includes(to) ? "default" : "link";
  };

  return (
    <Link
      href={to}
      className={cn(buttonVariants({ variant: getNavVariant() }))}
    >
      {children}
    </Link>
  );
};

export default NavLink;
