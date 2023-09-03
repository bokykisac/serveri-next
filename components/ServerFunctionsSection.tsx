import { ServerFunction } from "@/types/api";
import SectionHeader from "@/components/SectionHeader";
import { DataTable } from "@/components/server-functions/data-table";
import { columns } from "@/components/server-functions/columns";

interface ServerFunctionsSectionProps {
  serverFunctions: ServerFunction[];
  isLoading: boolean;
}

const ServerFunctionsSection = ({
  serverFunctions,
  isLoading,
}: ServerFunctionsSectionProps) => {
  return (
    <div className="flex flex-grow flex-col py-1 px-2 p-3 border h-full border-slate-300 rounded-md shadow-lg">
      <SectionHeader title="Server Functions" />
      <DataTable columns={columns} data={serverFunctions} />
    </div>
  );
};

export default ServerFunctionsSection;
