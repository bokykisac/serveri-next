import { InputHTMLAttributes } from "react";
import { Search } from "lucide-react";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = ({ placeholder, ...props }: SearchInputProps) => {
  return (
    <div className="relative flex items-center mt-2 focus:bg-red-800">
      <input
        placeholder={placeholder || "Start typing..."}
        className="peer w-full pl-7 outline-none focus:pl-0 placeholder:text-sm placeholder:ml-5 focus:placeholder-transparent focus:outline-none focus:border-b-primary-color transition-all ease-in-out duration-300 bg-transparent border-b-2 border-slate-700"
        {...props}
      />
      <Search
        size={20}
        className="transition-all ease-out duration-600 peer-focus:text-transparent absolute text-slate-700"
      />
    </div>
  );
};

export default SearchInput;
