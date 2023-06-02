import MainContainer from "../../components/containers/MainContainer";
import SerachForm from "./SerachForm";
import Product from "./Product";
import Logo from "../../components/logo/Logo";
import { useState } from "react";
import { useQuery } from "react-query";
import { axiosBase, baseURL } from "../../api/axios";
import SmallLoading from "../../components/loading/SmallLoading";
import Footer from "../../components/footer/Footer";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allProduct, setAllProduct] = useState(null);
  const [paginationButtons, setPaginationButtons] = useState(null);

  const getProductPage = (page, method, data) => {
    setAllProduct(null);

    if (method == "GET") {
      axiosBase
        .get(page)
        .then((res) => {
          setAllProduct(res.data);

          setButtonsFromResponse(res, baseURL + "/product?page=", "GET");
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    }
    if (method == "POST") {
      axiosBase
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
          console.log(error);
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
    axiosBase
      .get("/product")
      .then((res) => {
        setAllProduct(res.data);

        setButtonsFromResponse(res, baseURL + "/product?page=", "GET");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  });

  const serachProduct = (data) => {
    setAllProduct(null);

    axiosBase
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

  return (
    <div className="">
      <Logo />
      <MainContainer>
        <div className="mb-5">
          <SerachForm serachProduct={serachProduct} />
        </div>

        {allProduct === null ? (
          <SmallLoading />
        ) : allProduct.data.length === 0 ? (
          <p className="block text-center w-full">Brak produktów</p>
        ) : (
          <div>
            <div className="flex justify-around flex-wrap">
              {allProduct.data.map((item, index) => (
                <Product
                  key={index + 1}
                  name={item.name}
                  image={item.image_name}
                  id={item.id}
                  category={item.category.name}
                />
              ))}
            </div>

            <div className="join mt-8 w-fit mx-auto">{paginationButtons}</div>
          </div>
        )}
      </MainContainer>
      <Footer />
    </div>
  );
};

export default Index;
