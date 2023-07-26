import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto py-5 max-w-[2000px] bg-[url('assets/background-image.jpg')] bg-no-repeat h-[120px]">
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
