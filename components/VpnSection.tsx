import SectionHeader from "@/components/SectionHeader";
import { DataTable } from "@/components/vpns/data-table";
import { columns } from "@/components/vpns/columns";
import { VPNConnection } from "@/types/api";

interface VpnSectionProps {
  vpnConnections: VPNConnection[];
}

const VpnSection = ({ vpnConnections }: VpnSectionProps) => {
  return (
    <div className="flex flex-grow flex-col py-1 px-2 border h-full border-slate-300 rounded-md shadow-lg">
      <SectionHeader title="VPN connections" />
      <DataTable columns={columns} data={vpnConnections || []} />
    </div>
  );
};

export default VpnSection;
