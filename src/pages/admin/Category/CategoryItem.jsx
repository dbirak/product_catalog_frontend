import { FaTrashAlt } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { useMutation } from "react-query";
import { axiosWithBearer } from "../../../api/axios";
import Swal from "sweetalert2";

const CategoryItem = (props) => {
  const delCategory = useMutation({
    mutationFn: (data) => {
      axiosWithBearer
        .delete("/category/" + data)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Sukces",
            text: "Wybrana kategoria została usunięta!",
          });
          props.reloadCategory();
        })
        .catch((error) => {
          if (error.response.status == 401) {
            localStorage.clear();
            navigate("/");
          } else if (error.response.status == 409) {
            Swal.fire({
              icon: "error",
              title: "Błąd usunięcia",
              text: "Nie można usunąć kategorii, ponieważ istnieją produkty należące do tej kategorii!",
            });
          } else {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "Błąd usunięcia",
              text: "Wystąpił błąd usunięcia kategorii!",
            });
          }
        });
    },
  });

  const deleteCategory = (id, name) => {
    Swal.fire({
      title: `Czy chcesz usunąć kategorię ${name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Usuń!",
    }).then((result) => {
      if (result.isConfirmed) {
        delCategory.mutate(id);
      }
    });
  };

  const editCategory = (id) => {
    props.editCategory(id);
  };

  return (
    <div className="bg-base-300 p-4 flex items-center">
      <div className="w-[94%]">
        <span className=" font-semibold mr-3">{props.number}.</span>{" "}
        {props.name}
      </div>
      <div className="w-[4%] text-right text-blue-600">
        <span className="cursor-pointer" onClick={() => editCategory(props.id)}>
          <BiEdit />
        </span>
      </div>
      <div className="w-[2%] text-right text-red-600">
        <span
          className="cursor-pointer"
          onClick={() => deleteCategory(props.id, props.name)}
        >
          <FaTrashAlt />
        </span>
      </div>
    </div>
  );
};

export default CategoryItem;
