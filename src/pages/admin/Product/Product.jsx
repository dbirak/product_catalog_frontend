import { GrAdd } from "react-icons/gr";
import MainContainer from "../../../components/containers/MainContainer";
import Navbar from "../../../components/navbar/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { axiosWithBearer, baseURL } from "../../../api/axios";
import ProductItem from "./ProductItem";
import SmallLoading from "../../../components/loading/SmallLoading";
import AddProduct from "./AddProduct";
import Modal from "../../../components/modal/Modal";
import SerachForm from "./SerachForm";
import EditProduct from "./EditProduct";

const Product = () => {
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);

  const [idProduct, setIdProduct] = useState(0);
  const [allProduct, setAllProduct] = useState(null);
  const [paginationButtons, setPaginationButtons] = useState(null);

  const navigate = useNavigate();

  const getProductPage = (page, method, data) => {
    setAllProduct(null);

    if (method == "GET") {
      axiosWithBearer
        .get(page)
        .then((res) => {
          setAllProduct(res.data);

          setButtonsFromResponse(res, baseURL + "/product?page=", "GET");
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
    }
    if (method == "POST") {
      axiosWithBearer
        .post(page, data)
        .then((res) => {
          setAllProduct(res.data);

          setButtonsFromResponse(
            res,
            baseURL + "/product/serach?page=",
            "POST"
          );
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
    }
  };

  const setButtonsFromResponse = (res, page, method, data) => {
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
            getProductPage(page + i, method, data);
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

        setButtonsFromResponse(res, baseURL + "/product?page=", "GET");
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

  const serachProduct = (data) => {
    setAllProduct(null);

    axiosWithBearer
      .post("/product/serach", data)
      .then((res) => {
        setAllProduct(res.data);

        setButtonsFromResponse(
          res,
          baseURL + "/product/serach?page=",
          "POST",
          data
        );
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
          <div className="mb-5">
            <SerachForm serachProduct={serachProduct} />
          </div>
          {allProduct === null ? (
            <SmallLoading />
          ) : allProduct.data.length === 0 ? (
            <p className="block text-center w-full">Brak produktów</p>
          ) : (
            <div>
              {allProduct.data.map((item, index) => (
                <ProductItem
                  key={index + 1}
                  number={index - 17 + allProduct.meta.current_page * 18}
                  id={item.id}
                  name={item.name}
                  category={item.category.name}
                  image={item.image_name}
                  pdf={item.pdf_name}
                  reloadProduct={reloadProduct}
                  editProduct={editProduct}
                />
              ))}

              <div className="join mt-8 w-fit mx-auto">{paginationButtons}</div>
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

          {isShowModalEdit && (
            <Modal>
              <EditProduct
                reloadProduct={reloadProduct}
                closeModal={closeModal}
                id={idProduct}
              />
            </Modal>
          )}
        </MainContainer>
      </Navbar>
    </div>
  );
};

export default Product;
