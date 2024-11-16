import { Segmented } from "antd";
import { ProductType } from "../pages/Home";
import { PlusOutlined } from "@ant-design/icons";

const PizzaItem: React.FC<{ pizza: ProductType }> = ({ pizza }) => {
  return (
    <div className="flex flex-col items-center w-[280px]">
      <img src={pizza.image} alt={pizza.name} className="w-[260px]" />
      <p className="text-[24px] font-bold">{pizza.name}</p>
      <div className="w-full">
        <Segmented options={["thin", "traditional"]} block />
        <Segmented options={["small", "medium", "big"]} block />
      </div>
      <div className="w-full flex justify-evenly mt-[15px] items-center">
        <span>{pizza.price} $</span>
        <button className="bg-[#fff] border border-[#EB5A1E] text-[#EB5A1E] px-[18px] py-2 flex items-center gap-2 rounded-3xl">
          <PlusOutlined />
          Add
        </button>
      </div>
    </div>
  );
};

export default PizzaItem;
