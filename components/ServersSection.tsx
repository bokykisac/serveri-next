import { Server } from "@/types/api";
import SectionHeader from "@/components/SectionHeader";
import { DataTable } from "@/ui/DataTable";
import { columns } from "@/components/servers/columns";
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
        setSelectedItem={setSelectedServer}
        isLoading={isLoading}
        selectable
        sortable
      />
    </div>
  );
};

export default ServersSection;
