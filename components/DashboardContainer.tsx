"use client";

import PartnersSection from "@/components/PartnersSection";
import { SectionContext } from "@/components/SectionContext";
import ServerFunctionsSection from "@/components/ServerFunctionsSection";
import ServersSection from "@/components/ServersSection";
import VpnSection from "@/components/VpnSection";
import axios from "@/lib/axios";
import {
  SelectOption,
  PartnerDetail,
  Server,
  ServerFunction,
  VPNConnection,
} from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useContext } from "react";

type PartnerDetailsResponse = {
  partner: PartnerDetail;
  serverVpns: VPNConnection[];
  servers: Server[];
};

async function fetchPartnerDetails(partnerId: string) {
  const { data } = await axios.get<PartnerDetailsResponse>(
    `/poslovni-partner/getWithData/${partnerId}`,
  );
  return data;
}

async function fetchServerFunctions(serverId: number) {
  const { data } = await axios.get<ServerFunction[]>(
    `/server-funkcije/getAllFromServer/${serverId}`,
  );
  return data;
}

interface DashboardContainerProps {
  partners: SelectOption[];
}

const DashboardContainer = ({ partners }: DashboardContainerProps) => {
  const { data } = useSession();
  const {
    selectedPartner,
    selectedServer,
    setSelectedPartner,
    setSelectedServer,
  } = useContext(SectionContext);

  const {
    data: partnerDetailsData,
    isLoading: partnerDetailsLoading,
    isFetching: partnerDetailsFetching,
  } = useQuery({
    queryKey: ["partnerClickQuery", selectedPartner?.id],
    queryFn: () => fetchPartnerDetails((selectedPartner?.id as string)),
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

  //TODO: check from session
  const isAdmin = true;

  const servers = !isAdmin
    ? partnerDetailsData?.servers
    : partnerDetailsData?.servers?.filter((server) => server.active);

  const onSetSelectedPartner = (selectedPartner: SelectOption | null) => {
    setSelectedPartner(selectedPartner);
    setSelectedServer(null);
  };

  return (
    <div className="grid h-screen-nav grid-rows-3 gap-1">
      <div className="grid h-screen-nav grid-rows-3 gap-1 p-1">
        <div className="flex gap-1">
          <PartnersSection
            partners={partners}
            setSelectedPartner={onSetSelectedPartner}
            isLoading={partnerDetailsQueryLoading}
            selectedPartner={partnerDetailsData?.partner}
          />
          <VpnSection
            vpnConnections={partnerDetailsData?.serverVpns || []}
            isLoading={partnerDetailsQueryLoading}
          />
        </div>
        <ServersSection
          servers={servers || []}
          setSelectedServer={setSelectedServer}
          isLoading={partnerDetailsQueryLoading}
          selectedServer={selectedServer}
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
