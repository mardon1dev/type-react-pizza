import { MinusOutlined, PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { ProductType } from "../pages/Home";
import { addPizza, removePizza, removePizzaCount } from "../store/pizzaStore";
import { useDispatch } from "react-redux";

const CartItem: React.FC<{ pizza: ProductType }> = ({ pizza }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between border-t-[1px] border-gray-200 py-4">
      <div className="flex items-center gap-4 w-[50%]">
        <img
          src={pizza.image}
          alt={pizza.name}
          className="h-[80px] object-cover"
          width={80}
          height={80}
        />
        <div>
          <h3 className="font-bold text-lg">{pizza.name}</h3>
          <p className="text-sm text-gray-500">
            {pizza.options?.size}, {pizza.options?.dough}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 w-[50%] justify-between">
        <div className="flex items-center gap-2">
          <button
            className="flex items-center justify-center w-8 h-8 border border-orange-500 rounded-full text-orange-500"
            onClick={() => dispatch(removePizzaCount(pizza))}
          >
            <MinusOutlined />
          </button>
          <span className="text-lg font-bold">{pizza.count}</span>
          <button
            className="flex items-center justify-center w-8 h-8 border border-orange-500 rounded-full text-orange-500"
            onClick={() => dispatch(addPizza(pizza))}
          >
            <PlusOutlined />
          </button>
        </div>
        <div className="text-lg font-bold">{pizza.price * pizza.count} $</div>

        <button
          className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-red-500"
          onClick={() => dispatch(removePizza(pizza.id))}
        >
          <CloseOutlined />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
