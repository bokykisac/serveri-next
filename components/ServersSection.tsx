import { Server } from "@/types/api";
import { DataTable } from "@/ui/DataTable";
import { columns } from "@/components/table/table-columns/server-columns";
import { Dispatch, SetStateAction, useState } from "react";
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
import ServerForm from "@/components/forms/ServerForm";
import { useCurrentUser } from "@/hooks/useCurrentUser";
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
  const [open, setOpen] = useState<boolean>(false);
  const { isAdmin } = useCurrentUser();

  return (
    <div className="relative flex h-full flex-grow flex-col overflow-x-auto rounded-md border  border-slate-300 bg-stone-100 p-3 px-2 py-1">
      <div className="flex">
        <div className="flex-1" />
        <div className="m-auto truncate px-2 text-lg font-semibold text-palette-black">
          <span>Servers</span>
        </div>
        <div className="flex-1">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="xs"
                className="float-right mr-20 whitespace-nowrap"
                onClick={() => setOpen(true)}
                disabled={!isAdmin}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-full max-w-3xl overflow-y-scroll">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-center text-2xl">
                  Add new <span className="text-primary">Server</span>
                </DialogTitle>
                <DialogDescription className="text-center">
                  Fill out the required fields for the Server here. Click save
                  when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <ServerForm setOpen={setOpen} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={servers}
        setSelectedItem={setSelectedServer}
        isLoading={isLoading}
        selectable
        sortable
        canHideColumns
        selectedItem={selectedServer}
        defaultHiddenColumns={{
          ipAddress2: false,
          cpuNumber: false,
          cpuType: false,
          ram: false,
          hddDescription: false,
          model: false,
        }}
      />
    </div>
  );
};

export default ServersSection;
