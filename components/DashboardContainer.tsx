"use client";

import PartnersSection from "@/components/PartnersSection";
import axios from "@/lib/axios";
import {
  Partner,
  PartnerDetail,
  Server,
  ServerFunction,
  VPNConnection,
} from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import VpnSection from "./VpnSection";
import ServersSection from "./ServersSection";
import ServerFunctionsSection from "./ServerFunctionsSection";

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

async function fetchServerFunctions(serverId: number) {
  const { data } = await axios.get<ServerFunction[]>(
    `/server-funkcije/getAllFromServer/${serverId}`
  );
  return data;
}

interface DashboardContainerProps {
  partners: Partner[];
}

const DashboardContainer = ({ partners }: DashboardContainerProps) => {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);

  const {
    data: partnerDetailsData,
    isLoading: partnerDetailsLoading,
    isFetching: partnerDetailsFetching,
  } = useQuery({
    queryKey: ["partnerClickQuery", selectedPartner?.id],
    queryFn: () => fetchPartnerDetails(selectedPartner?.id!),
    enabled: !!selectedPartner,
  });

  const {
    data: serverFunctionsData,
    isLoading: serverFunctionsLoading,
    isFetching: serverFunctionsFetching,
  } = useQuery({
    queryKey: ["serverClickQuery", selectedServer?.id],
    queryFn: () => fetchServerFunctions(selectedServer?.id!),
    enabled: !!selectedServer,
  });

  const partnerDetailsQueryLoading =
    partnerDetailsFetching && partnerDetailsLoading;
  const serverFunctionsQueryLoading =
    serverFunctionsLoading && serverFunctionsFetching;

  return (
    <div className="h-screen-nav grid grid-rows-3 gap-1">
      <div className="h-screen-nav grid grid-rows-3 gap-1 p-1">
        <div className="flex gap-1 ">
          <PartnersSection
            partners={partners}
            setSelectedPartner={setSelectedPartner}
            isLoading={partnerDetailsQueryLoading}
            selectedPartner={partnerDetailsData?.partner}
          />
          <VpnSection vpnConnections={partnerDetailsData?.serverVpns || []} />
        </div>
        <ServersSection
          servers={partnerDetailsData?.servers || []}
          setSelectedServer={setSelectedServer}
          isLoading={partnerDetailsQueryLoading}
        />
        <ServerFunctionsSection
          serverFunctions={serverFunctionsData || []}
          isLoading={serverFunctionsQueryLoading}
        />
      </div>
    </div>
  );
};

export default DashboardContainer;
