import { PartnerDetail } from "@/types/api";
import Skeleton from "./ui/Skeleton";
import { UserSquare2, Mail, Phone } from "lucide-react";

interface PartnerDetailsProps {
  isLoading: boolean;
  partnerDetails?: PartnerDetail;
}

const PartnerDetails = ({ isLoading, partnerDetails }: PartnerDetailsProps) => {
  if (isLoading) {
    return (
      <div className="">
        <Skeleton className="w-full h-3 my-3 bg-slate-200 rounded-md" />
        <Skeleton className="w-full h-3 my-3 bg-slate-200 rounded-md" />
        <Skeleton className="w-full h-3 my-3 bg-slate-200 rounded-md" />
        <Skeleton className="w-full h-3 my-3 bg-slate-200 rounded-md" />
      </div>
    );
  }

  if (!partnerDetails) return null;

  return (
    <div className="flex flex-col text-xs gap-1 mt-5">
      <div className="flex items-center justify-center font-semibold text-sm text-center mb-2">
        {partnerDetails.name}
      </div>
      <div className="flex items-center gap-2">
        <div>
          <UserSquare2 className="text-slate-500" size={18} />
        </div>
        <span>{partnerDetails.contact || "-"}</span>
      </div>
      <div className="flex items-center gap-2">
        <div>
          <Mail className="text-slate-500" size={18} />
        </div>
        <span className="truncate">{partnerDetails.email || "-"}</span>
      </div>
      <div className="flex items-center gap-2">
        <div>
          <Phone className="text-slate-500" size={18} />
        </div>
        <span className="truncate">{partnerDetails.phone || "-"}</span>
      </div>
    </div>
  );
};

export default PartnerDetails;
