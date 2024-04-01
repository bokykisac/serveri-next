import { columns } from "@/components/table/table-columns/vpn-columns";
import { VPNConnection } from "@/types/api";
import { DataTable } from "@/ui/DataTable";
import Skeleton from "@/ui/Skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Button } from "@/ui/Button";
import { Plus } from "lucide-react";
import VPNConnectionForm from "@/components/forms/VPNConnectionForm";

interface VpnSectionProps {
  vpnConnections: VPNConnection[];
  isLoading: boolean;
}

const VpnSection = ({ vpnConnections, isLoading }: VpnSectionProps) => {
  return (
    <div className="relative flex h-full flex-grow flex-col rounded-md border  border-slate-300 bg-stone-100 px-2 py-1">
      <div className="flex">
        <div className="flex-1" />
        <div className="m-auto truncate px-2 text-lg font-semibold text-palette-black">
          {isLoading ? (
            <Skeleton className="h-[14px] w-20 bg-stone-300" />
          ) : (
            <span>VPN Connections</span>
          )}
        </div>
        <div className="flex-1">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="xs"
                className="float-right mr-20 whitespace-nowrap"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-full max-w-3xl overflow-y-scroll">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-center text-2xl">
                  Add new <span className="text-primary">VPN connection</span>
                </DialogTitle>
                <DialogDescription className="text-center">
                  Fill out the required fields for the VPN connection here.
                  Click save when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <VPNConnectionForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={vpnConnections || []}
        canHideColumns
        isLoading={isLoading}
      />
    </div>
  );
};

export default VpnSection;
