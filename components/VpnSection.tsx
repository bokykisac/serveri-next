import SectionHeader from "@/components/SectionHeader";
import { DataTable } from "@/components/vpns/data-table";
import { columns } from "@/components/vpns/columns";
import { VPNConnection } from "@/types/api";

interface VpnSectionProps {
  vpnConnections?: VPNConnection[];
  isLoading: boolean;
}

const VpnSection = ({ vpnConnections, isLoading }: VpnSectionProps) => {
  return (
    <div className="flex flex-grow flex-col p-3 border h-full border-slate-300 rounded-md shadow-lg">
      <SectionHeader title="VPN connections" />
      <DataTable
        columns={columns}
        data={vpnConnections || []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default VpnSection;
