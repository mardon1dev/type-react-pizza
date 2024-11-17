import { Link, useLocation, useNavigate } from "react-router-dom";

import Logo from "../assets/images/logo.svg";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ProductType } from "../pages/Home";

const Navbar = () => {
  const pizzaStore = useSelector((state: RootState) => state.pizzaStore);
  const location = useLocation();
  const isHeader = location.pathname == "/";
  const navigate = useNavigate();

  return (
    <header className="w-full sticky top-[0px] h-[137px] bg-white border-b-[1px] border-[#F6F6F6] z-[10]">
      <div className="container mx-auto w-full h-full">
        <div className="header w-full h-full flex items-center justify-between">
          <Link to="/" className="flex gap-5">
            <img
              src={Logo}
              alt="Logo"
              className="h-[38px]"
              width={38}
              height={38}
            />
            <div className="flex flex-col">
              <span className="font-bold text-[#181818]">REACT PIZZA</span>
              <span>the most delicious pizza in the universe</span>
            </div>
          </Link>
          <div
            className={`bg-[#FE5F1E] text-white px-6 py-4 rounded-[30px] cursor-pointer ${
              isHeader ? "flex" : "hidden"
            }`}
            onClick={() => navigate("/orders")}
          >
            <span className="botder border-r-[1px] border-[#FFFFFF]/50 pr-[13px]">
              {pizzaStore.reduce(
                (acc: number, item: ProductType) => acc + item.count * item.price,
                0
              )}{" "}
              $
            </span>
            <div className="pl-[13px]">
              <ShoppingCartOutlined />
              <span className="ml-2">
                {" "}
                {pizzaStore.reduce(
                  (acc: number, item: ProductType) => acc + item.count,
                  0
                )}{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
