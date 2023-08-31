import { Server } from "@/types/api";
import SectionHeader from "./SectionHeader";

interface ServersSectionProps {
  servers: Server[];
}

const ServersSection = ({ servers }: ServersSectionProps) => {
  return (
    <div className="py-1 px-2 p-3 border h-full border-slate-300 rounded-md shadow-lg">
      <SectionHeader title="Servers" />
      ServersSection
    </div>
  );
};

export default ServersSection;
