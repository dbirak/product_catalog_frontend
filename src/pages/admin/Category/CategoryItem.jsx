import { FaTrashAlt } from "react-icons/fa";

const CategoryItem = (props) => {
  return (
    <div className="bg-base-300 p-4 flex items-center">
      <div className="w-[98%]">
        <span className=" font-semibold mr-3">{props.number}.</span>{" "}
        {props.name}
      </div>
      <div className="w-[2%] text-right text-red-600">
        <span className="cursor-pointer">
          <FaTrashAlt />
        </span>
      </div>
    </div>
  );
};

export default CategoryItem;
