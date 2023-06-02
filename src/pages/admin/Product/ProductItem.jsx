import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiEdit } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductItem = (props) => {
  const editProduct = (id) => {
    console.log(id);
  };

  const deleteProduct = (id) => {
    console.log(id);
  };

  return (
    <div className="bg-base-300 p-4 flex items-center">
      <div className="w-[94%]">
        <span className=" font-semibold mr-3">{props.number}.</span>{" "}
        {props.name}
      </div>
      <div className="w-[4%] text-right text-blue-600">
        <span className="cursor-pointer" onClick={() => editProduct(props.id)}>
          <BiEdit />
        </span>
      </div>
      <div className="w-[2%] text-right text-red-600">
        <span
          className="cursor-pointer"
          onClick={() => deleteProduct(props.id)}
        >
          <FaTrashAlt />
        </span>
      </div>
    </div>
  );
};

export default ProductItem;
