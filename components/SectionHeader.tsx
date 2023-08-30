import Button from "@/ui/Button";
import Skeleton from "./ui/Skeleton";

interface SectionHeaderProps {
  title: string;
  isLoading?: boolean;
}

const SectionHeader = ({ title, isLoading }: SectionHeaderProps) => {
  return (
    <>
      <div className="flex text-center justify-between">
        <Button size="xs" variant="outline">
          New
        </Button>
        <span className="px-2 truncate font-semibold text-sm">
          {isLoading ? (
            <Skeleton className="w-20 h-[14px] bg-slate-200" />
          ) : (
            title
          )}
        </span>
        <Button size="xs" variant="outline">
          Edit
        </Button>
      </div>
      <hr className="mx-5 bg-slate-700" />
    </>
  );
};

export default SectionHeader;
