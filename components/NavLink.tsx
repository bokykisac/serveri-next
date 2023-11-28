"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { buttonVariants } from "./ui/Button";
import { Query } from "@/types";

interface NavLinkProps {
  href: string | { pathname: string; query: Query };
}

const NavLink = ({ href, children }: PropsWithChildren<NavLinkProps>) => {
  const currentPath = usePathname();

  const getNavVariant = () => {
    const path = typeof href === "string" ? href : href.pathname;

    if (path === "/" && currentPath === "/") return "default";
    if (path === "/" && currentPath !== "/") return "link";
    return currentPath?.includes(path) ? "default" : "link";
  };

  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant: getNavVariant() }))}
    >
      {children}
    </Link>
  );
};

export default NavLink;
