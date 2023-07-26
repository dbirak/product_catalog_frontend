import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiEdit } from "react-icons/bi";
import { FaFilePdf, FaTrashAlt } from "react-icons/fa";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { axiosWithBearer, baseURL, imageURL } from "../../../api/Axios";

const ProductItem = (props) => {
  const editProduct = (id) => {
    props.editProduct(id);
  };

  const delProduct = useMutation({
    mutationFn: (data) => {
      axiosWithBearer
        .delete("/product/" + data)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Sukces",
            text: "Wybrany produkt został usunięty!",
          });
          props.reloadProduct();
        })
        .catch((error) => {
          if (error.response.status == 401) {
            localStorage.clear();
            navigate("/");
          } else {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "Błąd usuwania",
              text: "Wystąpił błąd podczas usuwania produktu!",
            });
          }
        });
    },
  });

  const deleteProduct = (id, name) => {
    Swal.fire({
      title: `Czy chcesz usunąć produkt ${name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Usuń!",
    }).then((result) => {
      if (result.isConfirmed) {
        delProduct.mutate(id);
      }
    });
  };

  const getPdf = (name, productName) => {
    fetch(baseURL + "/file/" + name, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        responseType: "arraybuffer",
      },
    }).then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = productName + ".pdf";
        alink.click();
      });
    });
  };

  return (
    <div className="bg-base-300 p-4 flex items-center">
      <div className="w-[35%]">
        <span className=" font-semibold mr-3">{props.number}.</span>{" "}
        {props.name}
      </div>
      <div className="w-[26%] font-semibold">{props.category}</div>
      <div className="w-[24%]">
        <img
          src={imageURL + props.image}
          className="h-[50px] w-[73px] object-contain"
        />
      </div>
      <div className="w-[7%] text-orange-700">
        <FaFilePdf
          className="cursor-pointer"
          onClick={() => getPdf(props.pdf, props.name)}
        />
      </div>
      <div className="w-[7%] text-right text-blue-600">
        <span>
          <BiEdit
            className="cursor-pointer"
            onClick={() => editProduct(props.id)}
          />
        </span>
      </div>
      <div className="w-[2%] text-right text-red-600">
        <span>
          <FaTrashAlt
            className="cursor-pointer"
            onClick={() => deleteProduct(props.id, props.name)}
          />
        </span>
      </div>
    </div>
  );
};

export default ProductItem;
