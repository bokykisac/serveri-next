import SectionHeader from "@/components/SectionHeader";
import { columns } from "@/components/table-columns/vpn-columns";
import { VPNConnection } from "@/types/api";
import { DataTable } from "@/ui/DataTable";

interface VpnSectionProps {
  vpnConnections: VPNConnection[];
  isLoading: boolean;
}

const VpnSection = ({ vpnConnections, isLoading }: VpnSectionProps) => {
  return (
    <div className="relative flex flex-grow flex-col py-1 px-2 border h-full border-slate-300 rounded-md shadow-lg">
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
