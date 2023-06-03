import { useNavigate, useParams } from "react-router-dom";
import { axiosBase, baseURL, imageURL } from "../../api/axios";
import { useState } from "react";
import { useQuery } from "react-query";
import MainContainer from "../../components/containers/MainContainer";
import Loading from "../../components/loading/Loading";
import Logo from "../../components/logo/Logo";
import QRCode from "react-qr-code";
import { FaFilePdf } from "react-icons/fa";
import Footer from "../../components/footer/Footer";
import SmallLoading from "../../components/loading/SmallLoading";

const ProductItem = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const getProduct = useQuery("getProduct", () => {
    axiosBase
      .get("/product/" + id)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response.status == 404) {
          navigate("/");
        } else console.log(error);
      })
      .finally(() => {});
  });

  const getPdf = (name, productName) => {
    fetch(baseURL + "/file/" + name, {
      method: "GET",
      headers: {
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
    <div>
      <Logo />
      <MainContainer>
        {isLoading ? (
          <SmallLoading />
        ) : (
          <div>
            <h1 className="text-[40px] text-center font-semibold mt-7 bg-base-300">
              {product.name}
            </h1>
            <div className="mx-auto w-fit mt-12">
              <img
                className="w-[480px] h-[328px] p-4"
                src={imageURL + product.image_name}
                alt=""
              />
            </div>
            <div className="bg-base-300 p-4 text-[25px] text-center">
              <div>{product.category.name}</div>
            </div>
            <div className="md:flex md:justify-between block">
              <div className="w-[100%] md:w-[48%] h-[350px] bg-base-300 mt-10">
                <h1 className="text-center text-[25px] text-semibold my-4">
                  Kod QR
                </h1>
                <QRCode
                  className="mx-auto"
                  size={256}
                  value={product.code_qr}
                  viewBox={`0 0 256 256`}
                />
              </div>
              <div className="w-[100%] md:w-[48%] bg-base-300 h-[350px] mt-10">
                <h1 className="text-center text-[25px] text-semibold my-4">
                  Plik PDF
                </h1>
                <div className="mx-auto text-[165px] w-fit mt-[50px] text-red-500">
                  <FaFilePdf
                    onClick={() => getPdf(product.pdf_name, product.name)}
                    className="cursor-pointer hover:text-red-600 ease-in-out duration-300 hover:scale-[1.05]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </MainContainer>
      <Footer />
    </div>
  );
};

export default ProductItem;
