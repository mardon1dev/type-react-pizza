import React, { useContext } from "react";
import { useAxios } from "../hook/useAxios";
import { API_URL } from "../hook/useEnv";
import { useQuery } from "@tanstack/react-query";
import { Context } from "../context/Context";

interface CategoryType {
  id: number;
  name: string;
  isActive: boolean;
}

const Categories: React.FC = () => {
  const { categoryId, setCategoryId, setCategoryName } = useContext(Context);

  async function getAllCategories() {
    try {
      const res = await useAxios().get(`${API_URL}/categories`);
      return await res.data;
    } catch (err) {
      console.error(err);
    }
  }

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const handleCategoryClick = (item: CategoryType) => {
    setCategoryId(item.id);
    setCategoryName(item.name);
  };

  return (
    <div className="flex items-center gap-2">
      {categories.map((category: CategoryType) => (
        <button
          key={category.id}
          className={`px-4 py-2 rounded-[30px] text-base font-bold leading-5 text-center ${
            categoryId == category.id
              ? "bg-[#282828] text-white"
              : "bg-[#F9F9F9] text-[#2C2C2C]"
          }`}
          onClick={() => handleCategoryClick(category)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default Categories;
