import logo from "../../assets/Logo.png";
import { BiCategory, BiLogOut, BiPencil } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";

const Navbar = (props) => {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="w-full navbar bg-base-300 fixed">
          <div className="flex-none lg:hidden">
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
          <ul className="menu bg-base-300 hidden lg:flex fixed h-[calc(100vh-0px)] w-56 p-2">
            <li>
              <a className={props.value == "kategorie" ? "active" : ""}>
                <BiCategory />
                Kategorie
              </a>
            </li>
            <li>
              <a className={props.value == "produkty" ? "active" : ""}>
                <BiPencil />
                Produkty
              </a>
            </li>
            <li>
              <a className={props.value == "ustawienia" ? "active" : ""}>
                <FiSettings />
                Ustawienia
              </a>
            </li>
            <li className="mt-auto">
              <a>
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
            <a className={props.value == "kategorie" ? "active" : ""}>
              <BiCategory />
              Kategorie
            </a>
          </li>
          <li>
            <a className={props.value == "produkty" ? "active" : ""}>
              <BiPencil />
              Produkty
            </a>
          </li>
          <li>
            <a className={props.value == "ustawienia" ? "active" : ""}>
              <FiSettings />
              Ustawienia
            </a>
          </li>
          <li className=" mt-auto">
            <a>
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
