import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto py-5 bg-base-300">
      <img
        className="block mx-auto cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
        src={logo}
        alt=""
      ></img>
    </div>
  );
};

export default Logo;