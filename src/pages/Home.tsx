import { useQuery } from "@tanstack/react-query";
import Categories from "../components/Categories";
import { useAxios } from "../hook/useAxios";
import { API_URL } from "../hook/useEnv";
import PizzaItem from "../components/PizzaItem";
import { useContext } from "react";
import { Context } from "../context/Context";
import SortDropdown from "../components/SortDropdown";

export interface PizzaOptions {
  dough: "thin" | "traditional";
  size: "small" | "medium" | "big";
}

export interface ExtraType {
  id: number;
  name: string;
}

export interface ProductType {
  id: number;
  name: string;
  price: number;
  categories: ExtraType;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  dough: { label: string; value: string }[];
  size: { label: string; value: string }[];
  count: number;
  options?: PizzaOptions;
  orderId: number;
}

const Home = () => {
  const { categoryId, sortOption, categoryName } = useContext(Context);

  async function getAllPizzas() {
    try {
      const res = await useAxios().get(
        `${API_URL}/products?categoryId=${categoryId == 1 ? "" : categoryId}`
      );
      return await res.data;
    } catch (error) {
      console.error(error);
    }
  }

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pizzas", categoryId],
    queryFn: getAllPizzas,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  const getSortedPizzas = () => {
    switch (sortOption) {
      case "price":
        return [...data].sort((a, b) => a.price - b.price);
      case "alphabet":
        return [...data].sort((a, b) => a.name.localeCompare(b.name));
      case "popularity":
      default:
        return [...data].sort((a, b) => b.rating - a.rating);
    }
  };

  const sortedPizzas = getSortedPizzas();

  return (
    <div className="w-full py-[20px]  container mx-auto">
      <div className="pt-[40px] pb-[32px] flex items-center justify-between">
        <Categories />
        <SortDropdown />
      </div>
      <h2>{categoryName}</h2>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 py-[20px]">
        {sortedPizzas.map((pizza: ProductType) => (
          <PizzaItem key={pizza.id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
};

export default Home;
