import SearchInput from "@/components/SearchInput";
import type { Dispatch, SetStateAction } from "react";

interface SearchBarProps {
  setFirstName: Dispatch<SetStateAction<string | undefined>>;
  setLastName: Dispatch<SetStateAction<string | undefined>>;
  setEmail: Dispatch<SetStateAction<string | undefined>>;
  setOrganizationUnit: Dispatch<SetStateAction<string | undefined>>;
}

const SearchBar = ({
  setFirstName,
  setLastName,
  setEmail,
  setOrganizationUnit,
}: SearchBarProps) => {
  return (
    <div className="sticky top-0 z-50 my-2 flex w-full gap-4 rounded border border-slate-200 bg-white p-2">
      <SearchInput
        placeholder="First name..."
        onChange={(e) => setFirstName(e.target.value)}
      />
      <SearchInput
        placeholder="Last name..."
        onChange={(e) => setLastName(e.target.value)}
      />
      <SearchInput
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <SearchInput
        placeholder="Department..."
        onChange={(e) => setOrganizationUnit(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
