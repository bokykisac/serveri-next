"use client";

import PartnersSection from "@/components/PartnersSection";
import ServerFunctionsSection from "@/components/ServerFunctionsSection";
import ServersSection from "@/components/ServersSection";
import VpnSection from "@/components/VpnSection";
import axios from "@/lib/axios";
import {
  Partner,
  PartnerDetail,
  Server,
  ServerFunction,
  VPNConnection,
} from "@/types/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useContext, useState } from "react";
import { SectionContext } from "@/components/SectionContext";

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
  partners: Partner[];
}

const DashboardContainer = ({ partners }: DashboardContainerProps) => {
  const { data } = useSession();
  const {
    selectedPartner,
    selectedServer,
    setSelectedPartner,
    setSelectedServer,
  } = useContext(SectionContext);

  // consider putting this in useEffect
  // const [selectedPartner, setSelectedPartner] = useState<Partner | null>(() => {
  //   const prevSelectedPartnerId = searchParams?.get("partnerId");
  //   if (prevSelectedPartnerId) {
  //     const queryData = queryClient.getQueriesData<PartnerDetailsResponse>([
  //       "partnerClickQuery",
  //       prevSelectedPartnerId,
  //     ]);

  //     if (queryData.length > 0) {
  //       const prevSelectedPartner = queryData[0][1];

  //       if (prevSelectedPartner) {
  //         return prevSelectedPartner.partner;
  //       }
  //     }
  //   }
  //   return null;
  // });
  // const [selectedServer, setSelectedServer] = useState<Server | null>(null);

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

  const isAdmin = data?.user.authorities.some(
    // TODO: update user auth type
    (group) => group.authority === "Partneri",
  );

  const servers = !isAdmin
    ? partnerDetailsData?.servers
    : partnerDetailsData?.servers?.filter((server) => server.active);

  const onSetSelectedPartner = (selectedPartner: Partner) => {
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
