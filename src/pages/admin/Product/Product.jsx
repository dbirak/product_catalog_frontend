import { GrAdd } from "react-icons/gr";
import MainContainer from "../../../components/containers/MainContainer";
import Navbar from "../../../components/navbar/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { axiosWithBearer } from "../../../api/axios";
import ProductItem from "./ProductItem";
import SmallLoading from "../../../components/loading/SmallLoading";
import AddProduct from "./AddProduct";
import Modal from "../../../components/modal/Modal";

const Product = () => {
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);

  const [idProduct, setIdProduct] = useState(0);
  const [allProduct, setAllProduct] = useState(null);
  const [paginationButtons, setPaginationButtons] = useState(null);

  const navigate = useNavigate();

  const getProductPage = (id) => {
    console.log(id);
    setAllProduct(null);

    axiosWithBearer
      .get("/product?page=" + id)
      .then((res) => {
        setAllProduct(res.data);

        setButtonsFromResponse(res);
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
  };

  const setButtonsFromResponse = (res) => {
    var buttons_style = "join-item btn btn-outline btn-outline";
    var buttons_style_current = "join-item btn btn-primary btn-active";

    var buttons = [];
    for (let i = 1; i <= res.data.meta.last_page; i++) {
      let style = buttons_style;
      if (i === res.data.meta.current_page) style = buttons_style_current;

      buttons.push(
        <button
          key={i}
          className={style}
          onClick={() => {
            getProductPage(i);
          }}
        >
          {i}
        </button>
      );

      setPaginationButtons(buttons);
    }
  };

  const getAllProduct = useQuery("getAllProduct", () => {
    axiosWithBearer
      .get("/product")
      .then((res) => {
        setAllProduct(res.data);

        setButtonsFromResponse(res);
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

  const reloadProduct = () => {
    setAllProduct(null);
    setIsShowModalAdd(false);
    setIsShowModalEdit(false);
    getAllProduct.refetch();
  };

  const editProduct = (id) => {
    setIdProduct(id);
    setIsShowModalEdit(true);
  };

  const closeModal = () => {
    setIsShowModalAdd(false);
    setIsShowModalEdit(false);
  };

  return (
    <div>
      <Navbar value="produkty">
        <MainContainer>
          <div className="mt-10 flex justify-between w-auto">
            <div className="w-[95%] my-6">
              <h1 className="text-[35px] text-center font-semibold ">
                Produkty
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
          {allProduct === null ? (
            <SmallLoading />
          ) : allProduct.length === 0 ? (
            <p className="block text-center w-full">Brak produktów</p>
          ) : (
            <div>
              {allProduct.data.map((item, index) => (
                <ProductItem
                  key={index + 1}
                  number={index - 1 + allProduct.meta.current_page * 2}
                  id={item.id}
                  name={item.name}
                  reloadProduct={reloadProduct}
                  editProduct={editProduct}
                />
              ))}

              <div className="join mt-8">{paginationButtons}</div>
            </div>
          )}

          {isShowModalAdd && (
            <Modal>
              <AddProduct
                reloadProduct={reloadProduct}
                closeModal={closeModal}
              />
            </Modal>
          )}
        </MainContainer>
      </Navbar>
    </div>
  );
};

export default Product;
