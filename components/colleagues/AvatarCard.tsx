"use client";

import { Colleauge } from "@/types";
import AvatarCardText from "./AvatarCardText";

interface AvatarCardProps {
  colleague: Colleauge;
  cardRef?: any;
}

const AvatarCard = ({ colleague, cardRef }: AvatarCardProps) => {
  return (
    <div
      className="h-64 rounded-lg border border-slate-200 shadow-md transition delay-75 duration-300 ease-in-out hover:scale-105"
      ref={cardRef}
    >
      <div className="relative h-full">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-zinc-700 to-red-400 opacity-40"></div>

        <div className="relative flex h-full">
          <div className="w-full">test</div>
          <div className="flex w-full flex-col-reverse justify-center">
            <AvatarCardText>{`${colleague.firstName} ${colleague.lastName}`}</AvatarCardText>
            <AvatarCardText className="w-1/2" />
            <AvatarCardText>{colleague.email}</AvatarCardText>
            <div className="flex">
              <AvatarCardText className="rounded-full" />
              <AvatarCardText className="w-3/4">
                {colleague.mobileNumber}
              </AvatarCardText>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarCard;
