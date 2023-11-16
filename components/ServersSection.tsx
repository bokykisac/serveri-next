import { Server } from "@/types/api";
import SectionHeader from "@/components/SectionHeader";
import { DataTable } from "@/ui/DataTable";
import { columns } from "@/components/table/table-columns/server-columns";
import { Dispatch, SetStateAction } from "react";

interface ServersSectionProps {
  servers: Server[];
  setSelectedServer: Dispatch<SetStateAction<Server | null>>;
  isLoading: boolean;
  selectedServer: Server | null;
}

const ServersSection = ({
  servers,
  setSelectedServer,
  isLoading,
  selectedServer,
}: ServersSectionProps) => {
  return (
    <div className="overflow-x-au relative flex h-full flex-grow flex-col rounded-md border border-slate-300 p-3 px-2 py-1 shadow-lg">
      <SectionHeader title="Servers" />
      <DataTable
        columns={columns}
        data={servers}
        setSelectedItem={setSelectedServer}
        isLoading={isLoading}
        selectable
        sortable
        canHideColumns
        selectedItem={selectedServer}
      />
    </div>
  );
};

export default ServersSection;
