import { Segmented } from "antd";
import { ProductType } from "../pages/Home";
import { PlusOutlined } from "@ant-design/icons";
import { addPizza } from "../store/pizzaStore";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useState } from "react";
import { PizzaOptions } from "../pages/Home";

const PizzaItem: React.FC<{ pizza: ProductType }> = ({ pizza }) => {
  const pizzaStore = useSelector((state: RootState) => state.pizzaStore);
  const dispatch = useDispatch();

  const [selectedOptions, setSelectedOptions] = useState<PizzaOptions>({
    dough: "thin",
    size: "small",
  });

  const handleOptionChange = (type: "dough" | "size", value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [type]: value as PizzaOptions["dough"] | PizzaOptions["size"],
    }));
  };
  const pizzaAdded = pizzaStore.find(
    (item: ProductType) =>
      item.id === pizza.id &&
      JSON.stringify(item.options) === JSON.stringify(selectedOptions)
  );

  const pizzaCount = pizzaAdded?.count || 0;

  const handleAdd = (item: ProductType) => {
    const pizzaWithOptions: ProductType = {
      ...item,
      options: selectedOptions,
    };
    dispatch(addPizza(pizzaWithOptions));
  };

  return (
    <div className="flex flex-col items-center w-[280px]">
      <img src={pizza.image} alt={pizza.name} className="w-[260px]" />
      <p className="text-[24px] font-bold">{pizza.name}</p>
      <div className="w-full">
        <Segmented
          options={pizza.dough}
          onChange={(value) => handleOptionChange("dough", value)}
          block
        />
        <Segmented
          options={pizza.size}
          onChange={(value) => handleOptionChange("size", value)}
          block
        />
      </div>
      <div className="w-full flex justify-end gap-5 mt-[15px] items-center">
        <span>{pizza.price} $</span>
        <button
          className={`${
            pizzaCount == 1
              ? "bg-[#eb5a1e] border border-[#EB5A1E] text-[#fff]"
              : "bg-[#fff] border border-[#EB5A1E] text-[#EB5A1E]"
          } px-[18px] py-2 flex items-center gap-4 rounded-3xl`}
          onClick={() => handleAdd(pizza)}
        >
          <PlusOutlined />
          <span>{pizzaCount > 0 ? "Added" : "Add"}</span>
          {pizzaCount > 1 && (
            <span className="bg-[#eb5a1e] text-white w-[22px] h-[22px] flex items-center justify-center rounded-full">
              {pizzaCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default PizzaItem;
