"use client";

import PartnersSection from "@/components/PartnersSection";
import axios from "@/lib/axios";
import { Partner, PartnerDetail, Server, VPNConnection } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import VpnSection from "./VpnSection";

type PartnerDetailsResponse = {
  partner: PartnerDetail;
  serverVpns: VPNConnection[];
  servers: Server[];
};

async function fetchPartnerDetails(partnerId: string) {
  const { data } = await axios.get<PartnerDetailsResponse>(
    `/poslovni-partner/getWithData/${partnerId}`
  );
  return data;
}

interface DashboardContainerProps {
  partners: Partner[];
}

const DashboardContainer = ({ partners }: DashboardContainerProps) => {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["partnerClickQuery", selectedPartner?.id],
    queryFn: () => fetchPartnerDetails(selectedPartner?.id!),
    enabled: !!selectedPartner,
  });

  const queryLoading = isFetching && isLoading;

  return (
    <div className="h-screen-nav grid grid-rows-3 gap-1">
      <div className="h-screen-nav grid grid-rows-3 gap-1 p-1">
        <div className="flex gap-1 ">
          <PartnersSection
            partners={partners}
            setSelectedPartner={setSelectedPartner}
            isLoading={queryLoading}
            selectedPartner={data?.partner}
          />
          <VpnSection
            vpnConnections={data?.serverVpns}
            isLoading={queryLoading}
          />
        </div>
        <div className="border border-red-500">Servers</div>
        <div className="border border-red-500">Functions</div>
      </div>
    </div>
  );
};

export default DashboardContainer;
