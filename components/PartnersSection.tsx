"use client";

import SearchInput from "@/components/SearchInput";
import SectionHeader from "@/components/SectionHeader";
import { Partner, PartnerDetail } from "@/types/api";
import { type Dispatch, type SetStateAction, useState } from "react";
import { DataTable } from "./partners/data-table";
import { columns } from "@/components/partners/columns";
import { cn } from "@/lib/utils";
import PartnerDetails from "./PartnerDetails";

interface PartnersSectionProps {
  partners: Partner[];
  setSelectedPartner: Dispatch<SetStateAction<Partner | null>>;
  isLoading: boolean;
  selectedPartner?: PartnerDetail;
}

const PartnersSection = ({
  partners,
  setSelectedPartner,
  isLoading,
  selectedPartner,
}: PartnersSectionProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

  const [hideTable, setHideTable] = useState<boolean>(false);

  const filteredPartners = partners.filter((partner) =>
    partner.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
  );

  const classes = cn(
    isSearchFocused ? "w-[30vw]" : "w-[250px]",
    "p-3 transition-all ease-in-out duration-300 max-w-[30vw] min-w-[250px] border border-slate-300 rounded-md shadow-lg"
  );

  return (
    <div className={classes}>
      <SectionHeader
        title={selectedPartner ? selectedPartner.name : "Partners"}
        isLoading={isLoading}
      />
      <SearchInput
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => {
          setHideTable(false);
          setIsSearchFocused(true);
        }}
        onBlur={() => {
          setIsSearchFocused(false);
        }}
      />
      <DataTable
        columns={columns}
        data={filteredPartners}
        setSelectedPartner={setSelectedPartner}
      />
      <PartnerDetails isLoading={isLoading} partnerDetails={selectedPartner} />
    </div>
  );
};

export default PartnersSection;
