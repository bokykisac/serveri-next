"use client";

import PartnerDetails from "@/components/PartnerDetails";
import SearchInput from "@/components/SearchInput";
import SectionHeader from "@/components/SectionHeader";
import { columns } from "@/components/table-columns/partner-columns";
import { cn } from "@/lib/utils";
import { Partner, PartnerDetail } from "@/types/api";
import { DataTable } from "@/ui/DataTable";
import { useState } from "react";

interface PartnersSectionProps {
  partners: Partner[];
  setSelectedPartner: (selectedPartner: Partner) => void;
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

  const filteredPartners = partners.filter((partner) =>
    partner.name.toLowerCase().includes(searchValue.toLocaleLowerCase()),
  );

  const classes = cn(
    isSearchFocused ? "w-[30vw]" : "w-[250px]",
    "relative py-1 px-2 transition-all ease-in-out duration-300 max-w-[30vw] min-w-[250px] border border-slate-300 rounded-md shadow-lg",
  );

  return (
    <div className={classes}>
      <SectionHeader
        title={selectedPartner ? selectedPartner.name : "Partners"}
        isLoading={isLoading}
        className="mr-0"
      />
      <SearchInput
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setIsSearchFocused(false)}
      />
      <DataTable
        columns={columns}
        data={filteredPartners}
        setSelectedItem={setSelectedPartner}
        className="max-h-[120px] overflow-x-hidden"
        selectable
      />
      <PartnerDetails isLoading={isLoading} partnerDetails={selectedPartner} />
    </div>
  );
};

export default PartnersSection;
