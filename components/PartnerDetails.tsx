import { PartnerDetail } from "@/types/api";
import Skeleton from "./ui/Skeleton";
import { UserSquare2, Mail, Phone } from "lucide-react";

interface PartnerDetailsProps {
  isLoading: boolean;
  partnerDetails?: PartnerDetail;
}

const PartnerDetails = ({ isLoading, partnerDetails }: PartnerDetailsProps) => {
  if (isLoading) {
    const skeletonRows = [...Array(3)].map((_, index) => (
      <div key={index} className="my-3 flex flex-row items-center gap-1">
        <Skeleton className="h-3 w-5 bg-stone-300" />
        <Skeleton className="h-2 w-2/3 bg-stone-300" />
      </div>
    ));

    return <>{skeletonRows}</>;
  }

  if (!partnerDetails) return null;

  return (
    <div className="mt-1 flex flex-col gap-1 text-xs text-slate-600">
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
