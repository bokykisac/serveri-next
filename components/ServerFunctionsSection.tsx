import { ServerFunction } from "@/types/api";
import SectionHeader from "@/components/SectionHeader";
import { DataTable } from "@/ui/DataTable";
import { columns } from "@/components/table/table-columns/server-function-columns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { useContext, useState } from "react";
import ServerFunctionForm from "@/components/forms/ServerFunctionForm";
import { SectionContext } from "./SectionContext";
interface ServerFunctionsSectionProps {
  serverFunctions: ServerFunction[];
  isLoading: boolean;
}

const ServerFunctionsSection = ({
  serverFunctions,
  isLoading,
}: ServerFunctionsSectionProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const { selectedServer } = useContext(SectionContext);

  return (
    <div className="relative flex h-full flex-grow flex-col rounded-md border  border-slate-300 bg-stone-100 p-3 px-2 py-1 shadow-lg">
      <div className="flex">
        <div className="flex-1" />
        <div className="m-auto truncate px-2 text-lg font-semibold text-palette-black">
          <span>Server Functions</span>
        </div>
        <div className="flex-1">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="xs"
                className="float-right mr-20 whitespace-nowrap"
                onClick={() => setOpen(true)}
                disabled={!selectedServer}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-full max-w-3xl overflow-y-scroll">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-center text-2xl">
                  Add new <span className="text-primary">Server function</span>
                </DialogTitle>
                <DialogDescription className="text-center">
                  Fill out the required fields for the server function here.
                  Click save when you&apos;re done.
                </DialogDescription>
                <hr />
              </DialogHeader>
              <ServerFunctionForm
                serverFunction={null}
                selectedServer={selectedServer}
                setOpen={setOpen}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
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
