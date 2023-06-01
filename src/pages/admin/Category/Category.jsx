import MainContainer from "../../../components/containers/MainContainer";
import Navbar from "../../../components/navbar/Navbar";
import { GrAdd } from "react-icons/gr";
import CategoryItem from "./CategoryItem";
import Modal from "../../../components/modal/Modal";
import { useState } from "react";
import AddCategory from "./AddCategory";
import { axiosWithBearer } from "../../../api/axios";
import { useQuery } from "react-query";
import SmallLoading from "../../../components/loading/SmallLoading";
import EditCategory from "./EditCategory";

const Category = () => {
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [idCategory, setIdCategory] = useState(0);

  const [allCategories, setAllCategories] = useState(null);

  const getAllCategories = useQuery("getAllCategories", () => {
    axiosWithBearer
      .get("/category")
      .then((res) => {
        setAllCategories(res.data.data);
        console.log(res.data);
      })
      .catch((error) => {
        if (error.response.status == 401) {
          localStorage.clear();
          navigate("/");
        } else if (error.response.status == 422) {
          for (const validateField in error.response.data.errors) {
            const validateMessage =
              error.response.data.errors[validateField][0];

            setError(validateField, { message: validateMessage });
          }
        } else console.log(error);
      })
      .finally(() => {});
  });

  const reloadCategory = () => {
    setAllCategories(null);
    setIsShowModalAdd(false);
    setIsShowModalEdit(false);
    getAllCategories.refetch();
  };

  const editCategory = (id) => {
    setIdCategory(id);
    setIsShowModalEdit(true);
  };

  const closeModal = () => {
    setIsShowModalAdd(false);
    setIsShowModalEdit(false);
  };

  return (
    <div>
      <Navbar value="kategorie">
        <MainContainer>
          <div className="mt-10 flex justify-between w-auto">
            <div className="w-[95%] my-6">
              <h1 className="text-[35px] text-center font-semibold ">
                Kategorie
              </h1>
            </div>
            <div className="w-[5%] mx-auto my-6 grid items-center">
              <button
                className="btn btn-primary btn-square"
                onClick={() => setIsShowModalAdd(true)}
              >
                <GrAdd />
              </button>
            </div>
          </div>
          {allCategories === null ? (
            <SmallLoading />
          ) : allCategories.length === 0 ? (
            <p className="block text-center w-full">Brak kategorii</p>
          ) : (
            <div>
              {allCategories.map((item, index) => (
                <CategoryItem
                  key={index + 1}
                  number={index + 1}
                  id={item.id}
                  name={item.name}
                  reloadCategory={reloadCategory}
                  editCategory={editCategory}
                />
              ))}
            </div>
          )}

          {isShowModalAdd && (
            <Modal>
              <AddCategory
                reloadCategory={reloadCategory}
                closeModal={closeModal}
              />
            </Modal>
          )}

          {isShowModalEdit && (
            <Modal>
              <EditCategory
                reloadCategory={reloadCategory}
                closeModal={closeModal}
                idCategory={idCategory}
              />
            </Modal>
          )}
        </MainContainer>
      </Navbar>
    </div>
  );
};

export default Category;
