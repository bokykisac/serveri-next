"use client";

import Button from "@/ui/Button";
import { User2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const { data } = useSession();

  const user = data?.user.name;

  return (
    <nav className="bg-secondary-color">
      <div className="max-auto  px-2">
        <div className="relative flex h-10 items-center justify-between">
          <div className="flex flex-1 items-center justify-start">
            <div className="flex flex-shrink-0 items-center ">
              <Image
                src="/MIS_logo.png"
                alt="M&I Logo"
                width={70}
                height={70}
              />
            </div>

            <div className="sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-slate-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  aria-current="page"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="text-slate-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Team
                </a>
                <a
                  href="#"
                  className="text-slate-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Projects
                </a>
                <a
                  href="#"
                  className="text-slate-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Calendar
                </a>
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 inset-auto ml-6 gap-5">
            <div className="flex items-center gap-2">
              <User2 className="text-slate-300" />
              <p className="text-slate-200 text-sm">{user}</p>
            </div>
            <Button
              type="button"
              variant="secondary"
              size="xs"
              onClick={() => signOut()}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
