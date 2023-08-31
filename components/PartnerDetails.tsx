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
      <div>
        <Skeleton className="w-2/3 h-2 my-3 bg-slate-200" />
        <Skeleton className="w-2/3 h-2 my-3 bg-slate-200" />
        <Skeleton className="w-2/3 h-2 my-3 bg-slate-200" />
      </div>
    );
  }

  if (!partnerDetails) return null;

  return (
    <div className="flex flex-col text-xs gap-1 mt-1 text-slate-600">
      <div className="flex items-center gap-2">
        <div>
          <UserSquare2 className="text-red-900" size={18} />
        </div>
        <span>{partnerDetails?.contact || "-"}</span>
      </div>
      <div className="flex items-center gap-2">
        <div>
          <Mail className="text-red-900" size={18} />
        </div>
        <span className="truncate">{partnerDetails?.email || "-"}</span>
      </div>
      <div className="flex items-center gap-2">
        <div>
          <Phone className="text-red-900" size={18} />
        </div>
        <span className="truncate">{partnerDetails?.phone || "-"}</span>
      </div>
    </div>
  );
};

export default PartnerDetails;
