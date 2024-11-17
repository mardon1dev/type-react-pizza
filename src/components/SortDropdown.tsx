import React, { useContext, useState } from "react";
import { Context } from "../context/Context";

interface SortOption {
  id: number;
  label: string;
  value: string;
}

const SortDropdown: React.FC = () => {
  const { sortOption, setSortOption } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);

  const options: SortOption[] = [
    { id: 1, label: "Popularity", value: "popularity" },
    { id: 2, label: "Price", value: "price" },
    { id: 3, label: "Alphabetical", value: "alphabet" },
  ];

  const handleChangeEvent = (value: string) => {
    setSortOption(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div
        className="cursor-pointer flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Sort by:</span>
        <span className="text-orange-500">
          {options.find((o) => o.value === sortOption)?.label}
        </span>
        <span className="text-orange-500">{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <div className="absolute mt-2 right-0 bg-white border rounded shadow-md">
          {options.map((option) => (
            <div
              key={option.id}
              className={`px-4 py-2 cursor-pointer hover:bg-orange-100 ${
                sortOption === option.value ? "bg-orange-200 font-bold" : ""
              }`}
              onClick={() => handleChangeEvent(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
