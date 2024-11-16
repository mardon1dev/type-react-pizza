import { QueryClient, useQuery } from "@tanstack/react-query";
import Categories from "../components/Categories";
import { useAxios } from "../hook/useAxios";
import { API_URL } from "../hook/useEnv";
import PizzaItem from "../components/PizzaItem";

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
  size: Array<ExtraType>;
}

const Home = () => {
  const queryClient = new QueryClient();

  async function getAllPizzas() {
    try {
      const res = await useAxios().get(`${API_URL}/products`);
      return await res.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function getAllCategories() {
    try {
      const res = await useAxios().get(`${API_URL}/categories`);
      return await res.data;
    } catch (err) {
      console.error(err);
    }
  }

  const { data = [] } = useQuery({
    queryKey: ["pizzas"],
    queryFn: getAllPizzas,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  return (
    <div className="w-full py-[20px]">
      <div className="pt-[40px] pb-[32px] flex items-center justify-between">
        <Categories />
        <p>Select option</p>
      </div>
        <h2>All pizzas</h2>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 pt-[20px]">
        {data.map((pizza: ProductType) => (
          <PizzaItem key={pizza.id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
};

export default Home;
