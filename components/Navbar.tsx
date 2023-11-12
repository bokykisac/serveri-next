"use client";

import { User2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/ui/Button";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const Navbar = () => {
  const { data } = useSession();
  // const searchParams = useSearchParams();

  // const createQueryString = useCallback(() => {
  //   if (!searchParams) return "";
  //   const params = new URLSearchParams(searchParams);
  //   return params.toString();
  // }, [searchParams]);

  const user = data?.user.name;

  return (
    <nav className="bg-zinc-900">
      <div className="max-auto  px-2">
        <div className="relative flex h-10 items-center justify-between">
          <div className="flex flex-1 items-center justify-start">
            <div className="flex flex-shrink-0 items-center ">
              <Image
                priority
                src="/MIS_logo.png"
                alt="M&I Logo"
                width={70}
                height={70}
              />
            </div>

            <div className="sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  href="/"
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-gray-700 hover:text-white"
                >
                  Dashboard
                </Link>
                <a
                  href="#"
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-gray-700 hover:text-white"
                >
                  Team
                </a>
                <a
                  href="#"
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-gray-700 hover:text-white"
                >
                  Projects
                </a>
                <a
                  href="#"
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-gray-700 hover:text-white"
                >
                  Calendar
                </a>
              </div>
            </div>
          </div>

          <div className="absolute inset-auto inset-y-0 right-0 ml-6 flex items-center gap-5 pr-2">
            <div className="flex items-center gap-2">
              <User2 className="text-slate-300" />
              <p className="text-sm text-slate-200">{user}</p>
            </div>
            <Button type="button" size="xs" onClick={() => signOut()}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
