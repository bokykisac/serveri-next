import SectionHeader from "@/components/SectionHeader";
import { columns } from "@/components/table/table-columns/vpn-columns";
import { VPNConnection } from "@/types/api";
import { DataTable } from "@/ui/DataTable";

interface VpnSectionProps {
  vpnConnections: VPNConnection[];
  isLoading: boolean;
}

const VpnSection = ({ vpnConnections, isLoading }: VpnSectionProps) => {
  return (
    <div className="relative flex h-full flex-grow flex-col rounded-md border  border-slate-300 bg-stone-100 px-2 py-1">
      <SectionHeader title="VPN connections" />
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
