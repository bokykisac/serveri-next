"use client";

import { useContext } from "react";
import { SectionContext } from "@/components/SectionContext";
import { DatabaseBackup } from "lucide-react";
import Link from "next/link";
import { Server } from "@/types/api";

interface BackupinfoLinkProps {
  id: number;
  selectedServer?: Server;
  type: "server" | "partner";
}

const BackupinfoLink = ({ id, selectedServer, type }: BackupinfoLinkProps) => {
  const { selectedPartner } = useContext(SectionContext);

  return (
    <>
      <DatabaseBackup className="mr-2 h-4 w-4" />
      <Link
        href={{
          pathname: `/backup-info/${id}`,
          query: {
            type,
            hostname: selectedServer?.hostname || selectedServer?.ipAddress,
            partnerName: selectedPartner?.name,
          },
        }}
      >
        Backup Info
      </Link>
    </>
  );
};

export default BackupinfoLink;
