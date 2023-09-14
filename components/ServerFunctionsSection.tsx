import { ServerFunction } from "@/types/api";
import SectionHeader from "@/components/SectionHeader";
import { DataTable } from "@/ui/DataTable";
import { columns } from "@/components/table-columns/server-function-columns";

interface ServerFunctionsSectionProps {
  serverFunctions: ServerFunction[];
  isLoading: boolean;
}

const ServerFunctionsSection = ({
  serverFunctions,
  isLoading,
}: ServerFunctionsSectionProps) => {
  return (
    <div className="relative flex flex-grow flex-col py-1 px-2 p-3 border h-full border-slate-300 rounded-md shadow-lg">
      <SectionHeader title="Server Functions" />
      <DataTable
        columns={columns}
        data={serverFunctions}
        canHideColumns
        sortable
      />
    </div>
  );
};

export default ServerFunctionsSection;
