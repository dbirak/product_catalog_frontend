import MainContainer from "../../components/containers/MainContainer";
import SerachForm from "./SerachForm";
import Product from "./Product";
import Logo from "../../components/logo/Logo";

const Index = () => {
  return (
    <div>
      <Logo />
      <MainContainer>
        <div className="mb-5">
          <SerachForm />
        </div>
        <div className="flex justify-around flex-wrap">
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
      </MainContainer>
    </div>
  );
};

export default Index;
