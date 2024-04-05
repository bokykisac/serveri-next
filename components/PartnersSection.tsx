"use client";

import PartnerDetails from "@/components/PartnerDetails";
import SearchInput from "@/components/SearchInput";
import { columns } from "@/components/table/table-columns/partner-columns";
import { cn } from "@/lib/utils";
import { SelectOption, PartnerDetail } from "@/types/api";
import { Button } from "@/ui/Button";
import { DataTable } from "@/ui/DataTable";
import Skeleton from "@/ui/Skeleton";
import { XSquare } from "lucide-react";
import { useState } from "react";

interface PartnersSectionProps {
  partners: SelectOption[];
  setSelectedPartner: (selectedPartner: SelectOption | null) => void;
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

  const filteredPartners = partners.filter((partner) =>
    partner.name.toLowerCase().includes(searchValue.toLocaleLowerCase()),
  );

  const classes = cn(
    "w-[30vw] relative py-1 px-2 transition-all ease-in-out duration-300 max-w-[30vw] min-w-[250px] rounded-md bg-stone-100  border border-slate-300",
  );

  return (
    <div className={classes}>
      <div className="flex">
        <div className="m-auto truncate px-2 text-lg font-semibold text-palette-black">
          {isLoading ? (
            <Skeleton className="h-[14px] w-20 bg-stone-300" />
          ) : (
            <span>{selectedPartner ? selectedPartner.name : "Partners"}</span>
          )}
        </div>
      </div>
      <hr />
      <SearchInput
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <DataTable
        columns={columns}
        data={filteredPartners}
        setSelectedItem={setSelectedPartner}
        className="max-h-[120px] overflow-x-hidden"
        selectable
        selectedItem={selectedPartner}
      />
      <PartnerDetails isLoading={isLoading} partnerDetails={selectedPartner} />
      <Button
        className="absolute bottom-1 right-3 p-0 hover:cursor-pointer "
        variant="ghost"
        disabled={!selectedPartner}
        onClick={() => setSelectedPartner(null)}
      >
        <XSquare className=" h-6 w-6 text-primary hover:text-palette-red" />
      </Button>
    </div>
  );
};

export default PartnersSection;
