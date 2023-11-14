import { Input } from "@/ui/Input";
import { Column } from "@tanstack/react-table";

interface FilterProps {
  column: Column<any, unknown>;
}

const Filter = ({ column }: FilterProps) => {
  const columnFilterValue = column.getFilterValue();

  return (
    <Input
      type="text"
      className="px-1"
      placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
      onChange={(event) => {
        console.log("menja");
        return column.setFilterValue(event.target.value);
      }}
      value={(columnFilterValue ?? "") as string}
    />
  );
};

export default Filter;
