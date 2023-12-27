"use client";

import { Colleauge } from "@/types";
import AvatarCardText from "./AvatarCardText";
import Image from "next/image";

interface AvatarCardProps {
  colleague: Colleauge;
  cardRef?: any;
}

const AvatarCard = ({ colleague, cardRef }: AvatarCardProps) => {
  const imageUrl = `data:image/png;base64,${colleague.photo}`;

  return (
    <div
      className="group h-64 rounded-lg border border-primary shadow-md transition delay-75 duration-300 ease-in-out hover:scale-105"
      ref={cardRef}
    >
      <div className="relative h-full">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-zinc-700 to-red-400 opacity-40 "></div>

        <div className="relative flex h-full">
          <div className="relative m-1 w-1/2">
            <Image
              src={imageUrl}
              alt={colleague.firstName}
              fill
              style={{ objectFit: "contain" }}
              className="rounded-full object-cover opacity-60 transition delay-75 duration-300 ease-in-out group-hover:border-primary group-hover:opacity-100 group-hover:shadow-2xl group-hover:shadow-primary"
              quality={100}
            />
          </div>
          <div className="flex w-1/2 flex-col-reverse justify-center">
            <AvatarCardText>{`${colleague.firstName} ${colleague.lastName}`}</AvatarCardText>
            <AvatarCardText className="w-1/2">
              {colleague.mobileNumber}
            </AvatarCardText>
            <AvatarCardText clipboard>{colleague.email}</AvatarCardText>
            <div className="flex">
              <AvatarCardText className="rounded-full" />
              <AvatarCardText className="w-3/4">
                {colleague.organizationUnit}
              </AvatarCardText>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarCard;
