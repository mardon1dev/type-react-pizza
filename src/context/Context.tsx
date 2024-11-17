import React, { ReactNode, createContext, useState } from "react";

interface ContextWrapperTypes {
  categoryId: number;
  setCategoryId: React.Dispatch<React.SetStateAction<number>>;
  sortOption: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
  categoryName: string;
  setCategoryName: React.Dispatch<React.SetStateAction<string>>;
}

export const Context = createContext<ContextWrapperTypes>({
  categoryId: 1,
  setCategoryId: () => {},
  sortOption: "popularity",
  setSortOption: () => {},
  categoryName: "All pizzas",
  setCategoryName: () => {},
});

interface ContextWrapperProps {
  children: ReactNode;
}

export const ContextWrapper: React.FC<ContextWrapperProps> = ({ children }) => {
  const [sortOption, setSortOption] = useState<string>("popularity");
  const [categoryId, setCategoryId] = useState<number>(1);
  const [categoryName, setCategoryName] = useState<string>("All pizzas");

  return (
    <Context.Provider
      value={{
        categoryId,
        setCategoryId,
        sortOption,
        setSortOption,
        categoryName,
        setCategoryName,
      }}
    >
      {children}
    </Context.Provider>
  );
};
