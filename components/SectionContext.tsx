"use client";

import { Partner, Server } from "@/types/api";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

type SectionContextType = {
  selectedPartner: Partner | null;
  selectedServer: Server | null;
  setSelectedPartner: Dispatch<SetStateAction<Partner | null>>;
  setSelectedServer: Dispatch<SetStateAction<Server | null>>;
};

export const SectionContext = createContext<SectionContextType>({
  selectedPartner: null,
  selectedServer: null,
  setSelectedPartner: () => {},
  setSelectedServer: () => {},
});

interface SectionContextProps {
  children: ReactNode;
}

export const SectionContextProvider = ({ children }: SectionContextProps) => {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);

  return (
    <SectionContext.Provider
      value={{
        selectedPartner,
        selectedServer,
        setSelectedPartner,
        setSelectedServer,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
};
