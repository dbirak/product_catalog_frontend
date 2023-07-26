import { useNavigate } from "react-router-dom";
import { imageURL } from "../../api/Axios";

const Product = (props) => {
  const navigate = useNavigate();

  const clickProduct = (id) => {
    navigate("/product/" + id);
  };

  return (
    <div
      className="card w-[320px] mx-2 my-4 bg-base-400 shadow-xl cursor-pointer hover:scale-[1.05] hover:ease-in-out duration-300"
      onClick={() => {
        clickProduct(props.id);
      }}
    >
      <figure>
        <img
          className="w-[300px] h-[205px] p-4 object-contain"
          src={imageURL + props.image}
          alt="Shoes"
        />
      </figure>
      <div className="card-body p-5">
        <h2 className="card-title block mx-auto font-semibold text-[26px]">
          {props.name}
        </h2>
      </div>
      <h2 className="block mx-auto pb-4">{props.category}</h2>
    </div>
  );
};

export default Product;
