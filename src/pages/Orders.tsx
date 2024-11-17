import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";

import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { clearBusket } from "../store/pizzaStore";

import NoData from "../assets/images/no-data.png";
import { useNavigate } from "react-router-dom";
import { ProductType } from "./Home";
import CartItem from "../components/CartItem";

const Orders = () => {
  const pizzaStore = useSelector((state: RootState) => state.pizzaStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="w-full h-full">
      <div className="max-w-[821px] mx-auto">
        {pizzaStore.length > 0 ? (
          <div className="py-[100px]">
            <div className="w-full flex items-center justify-between mb-[30px]">
              <div className="text-[32px] font-bold space-x-4">
                <ShoppingCartOutlined />
                <span>Basket</span>
              </div>
              <button
                className="text-[#B6B6B6] hover:text-[#282828] space-x-3"
                onClick={() => dispatch(clearBusket())}
              >
                <DeleteOutlined />
                <span>Empty Basket</span>
              </button>
            </div>
            <div className="">
              {pizzaStore.map((item: ProductType, index: number) => (
                <CartItem pizza={item} key={index} />
              ))}
            </div>
            <div className="flex items-center justify-between py-[40px]">
              <p>
                {" "}
                Added carts:{" "}
                <span className="font-bold">{pizzaStore.length}</span>
              </p>
              <p>
                Total price:{" "}
                <span className="text-orange-500 font-bold">
                  {" "}
                  {pizzaStore.reduce(
                    (acc: number, item: ProductType) =>
                      acc + item.count * item.price,
                    0
                  )}
                  $
                </span>
              </p>
            </div>
            <div className="w-full flex items-center justify-between">
              <button className="text-[#000]/70 border-[1px] border-[#000]/70 py-2 px-6 rounded-[20px]" onClick={()=>navigate(-1)}>Back to main</button>
              <button className="text-[#fff] border-[1px] border-orange-500 bg-orange-500 py-2 px-6 rounded-[20px]">Checkout</button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center py-[20px]">
            <h1 className="text-[32px] font-bold text-[#282828]">
              The busket is empty.
            </h1>
            <div className="w-[347px] text-center mt-[10px] mb-[30px]">
              <p className="text-[#777777]">
                Most likely, you haven't ordered pizza yet. <br /> To order
                pizza, go to the main page.
              </p>
            </div>
            <img
              src={NoData}
              alt="No info"
              width={300}
              height={255}
              className="h-[255px] mb-[37px]"
            />
            <button
              className="text-white bg-black py-2 px-6 rounded-[30px]"
              onClick={() => navigate(-1)}
            >
              Back to main
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
