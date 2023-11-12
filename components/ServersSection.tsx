import { Server } from "@/types/api";
import SectionHeader from "@/components/SectionHeader";
import { DataTable } from "@/ui/DataTable";
import { columns } from "@/components/table-columns/server-columns";
import { Dispatch, SetStateAction } from "react";

interface ServersSectionProps {
  servers: Server[];
  setSelectedServer: Dispatch<SetStateAction<Server | null>>;
  isLoading: boolean;
}

const ServersSection = ({
  servers,
  setSelectedServer,
  isLoading,
}: ServersSectionProps) => {
  return (
    <div className="relative flex h-full flex-grow flex-col overflow-x-scroll rounded-md border border-slate-300 p-3 px-2 py-1 shadow-lg">
      <SectionHeader title="Servers" />
      <DataTable
        columns={columns}
        data={servers}
        setSelectedItem={setSelectedServer}
        isLoading={isLoading}
        selectable
        sortable
        canHideColumns
      />
    </div>
  );
};

export default ServersSection;
