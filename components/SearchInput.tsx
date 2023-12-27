import { InputHTMLAttributes } from "react";
import { Search } from "lucide-react";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = ({ placeholder, ...props }: SearchInputProps) => {
  return (
    <div className="relative mt-2 flex w-full items-center focus:bg-red-800">
      <input
        placeholder={placeholder || "Start typing..."}
        className="peer w-full border-b-2 border-slate-700 bg-transparent pl-7 outline-none transition-all duration-300 ease-in-out placeholder:ml-5 placeholder:text-sm focus:border-b-primary focus:pl-0 focus:placeholder-transparent focus:outline-none"
        {...props}
      />
      <Search
        size={20}
        className="duration-600 absolute text-slate-700 transition-all ease-out peer-focus:text-transparent"
      />
    </div>
  );
};

export default SearchInput;
