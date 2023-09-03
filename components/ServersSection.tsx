import { Server } from "@/types/api";
import SectionHeader from "@/components/SectionHeader";
import { DataTable } from "./servers/data-table";
import { columns } from "./servers/columns";
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
    <div className="flex flex-grow flex-col py-1 px-2 p-3 border h-full border-slate-300 rounded-md shadow-lg">
      <SectionHeader title="Servers" />
      <DataTable
        columns={columns}
        data={servers}
        onRowClick={setSelectedServer}
      />
    </div>
  );
};

export default ServersSection;
