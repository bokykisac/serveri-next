import Button from "@/ui/Button";

interface SectionHeaderProps {
  title: string;
}

const SectionHeader = ({ title }: SectionHeaderProps) => {
  return (
    <>
      <div className="flex text-center justify-between">
        <Button size="xs" variant="outline">
          New
        </Button>
        <h5>{title}</h5>
        <Button size="xs" variant="outline">
          Edit
        </Button>
      </div>
      <hr className="mx-5 bg-slate-700" />
    </>
  );
};

export default SectionHeader;
