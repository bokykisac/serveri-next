"use client";

import { SectionContext } from "@/components/SectionContext";
import { SelectOption, Server } from "@/types/api";
import { DatabaseBackup } from "lucide-react";
import { useContext } from "react";
import NavLink from "@/components/NavLink";
import Link from "next/link";

interface BackupinfoLinkProps {
  selectedItem?: Server | SelectOption;
  selectedType?: "all" | "partner" | "server";
  isNav?: boolean;
}

const BackupinfoLink = ({
  selectedItem,
  selectedType,
  isNav = false,
}: BackupinfoLinkProps) => {
  const { selectedPartner, selectedServer } = useContext(SectionContext);

  const currentId = selectedServer?.id || selectedPartner?.id;
  const type: "server" | "partner" | "all" = selectedServer
    ? "server"
    : selectedPartner
      ? "partner"
      : "all";
  const hostname = selectedServer?.hostname || selectedServer?.ipAddress;

  let href = {
    pathname: currentId ? `/backup-info/${currentId}` : "/backup-info",
    query: {
      type,
      hostname,
      partnerName: selectedPartner?.name,
    },
  };

  if (selectedItem) {
    if (selectedType === "partner") {
      href = {
        pathname: `/backup-info/${selectedItem.id}`,
        query: {
          type: selectedType,
          partnerName: (selectedItem as SelectOption).name,
          hostname: "",
        },
      };
    } else if (selectedType === "server") {
      href = {
        pathname: `/backup-info/${selectedItem.id}`,
        query: {
          type: selectedType,
          partnerName: selectedPartner?.name,
          hostname:
            (selectedItem as Server)?.hostname ||
            (selectedItem as Server)?.ipAddress,
        },
      };
    } else {
      href = {
        pathname: `/backup-info`,
        query: {
          type: "all" as const,
          partnerName: "",
          hostname: "",
        },
      };
    }
  }

  return isNav ? (
    <NavLink href={href}>Backup Info</NavLink>
  ) : (
    <>
      <DatabaseBackup className="mr-2 h-4 w-4" />
      <Link href={href}>Backup Info</Link>
    </>
  );
};

export default BackupinfoLink;
