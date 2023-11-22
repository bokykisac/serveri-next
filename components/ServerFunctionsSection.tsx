import { ServerFunction } from "@/types/api";
import SectionHeader from "@/components/SectionHeader";
import { DataTable } from "@/ui/DataTable";
import { columns } from "@/components/table/table-columns/server-function-columns";

interface ServerFunctionsSectionProps {
  serverFunctions: ServerFunction[];
  isLoading: boolean;
}

const ServerFunctionsSection = ({
  serverFunctions,
  isLoading,
}: ServerFunctionsSectionProps) => {
  return (
    <div className="relative flex h-full flex-grow flex-col rounded-md border  border-slate-300 bg-stone-100 p-3 px-2 py-1 shadow-lg">
      <SectionHeader title="Server Functions" />
      <DataTable
        columns={columns}
        data={serverFunctions}
        canHideColumns
        sortable
        isLoading={isLoading}
      />
    </div>
  );
};

export default ServerFunctionsSection;
