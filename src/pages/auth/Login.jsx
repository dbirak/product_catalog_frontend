import MainContainer from "../../components/containers/MainContainer";
import Logo from "../../components/logo/Logo";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div>
      <div>
        <Logo />
        <MainContainer>
          <div className="mb-5">
            <LoginForm />
          </div>
        </MainContainer>
      </div>
    </div>
  );
};

export default Login;
