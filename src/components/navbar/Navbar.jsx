import logo from "../../assets/Logo.png";
import { BiCategory, BiLogOut, BiPencil } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();

  const navbarClick = (value) => {
    if (value === "kategorie") navigate("/admin/category");
    else if (value === "produkty") navigate("/admin/product");
    else if (value === "ustawienia") navigate("/admin/settings");
    else {
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="w-full navbar bg-base-300 fixed">
          <div className="flex-none 2xl:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1">
            <img
              className="block mx-auto w-[130px] h-auto"
              src={logo}
              alt=""
            ></img>
          </div>
        </div>
        <div>
          <ul className="menu bg-base-300 hidden 2xl:flex fixed h-[calc(100vh-0px)] w-56 p-2">
            <li>
              <a
                className={props.value == "kategorie" ? "active" : ""}
                onClick={() => navbarClick("kategorie")}
              >
                <BiCategory />
                Kategorie
              </a>
            </li>
            <li>
              <a
                className={props.value == "produkty" ? "active" : ""}
                onClick={() => navbarClick("produkty")}
              >
                <BiPencil />
                Produkty
              </a>
            </li>
            <li>
              <a
                className={props.value == "ustawienia" ? "active" : ""}
                onClick={() => navbarClick("ustawienia")}
              >
                <FiSettings />
                Ustawienia
              </a>
            </li>
            <li className="mt-auto">
              <a onClick={() => navbarClick("wyloguj")}>
                <BiLogOut />
                Wyloguj się
              </a>
            </li>
          </ul>
        </div>
        <div className="block">{props.children}</div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu bg-base-100 w-56 p-2">
          <li>
            <a
              className={props.value == "kategorie" ? "active" : ""}
              onClick={() => navbarClick("kategorie")}
            >
              <BiCategory />
              Kategorie
            </a>
          </li>
          <li>
            <a
              className={props.value == "produkty" ? "active" : ""}
              onClick={() => navbarClick("produkty")}
            >
              <BiPencil />
              Produkty
            </a>
          </li>
          <li>
            <a
              className={props.value == "ustawienia" ? "active" : ""}
              onClick={() => navbarClick("ustawienia")}
            >
              <FiSettings />
              Ustawienia
            </a>
          </li>
          <li className=" mt-auto">
            <a onClick={() => navbarClick("wyloguj")}>
              <BiLogOut />
              Wyloguj się
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
