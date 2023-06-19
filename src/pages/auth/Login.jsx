import { useState } from "react";
import MainContainer from "../../components/containers/MainContainer";
import Footer from "../../components/footer/Footer";
import Logo from "../../components/logo/Logo";
import LoginForm from "./LoginForm";
import Modal from "../../components/modal/Modal";
import ResetPassword from "./ResetPassword";

const Login = () => {
  const [isResetPasswordForm, setIsResetPasswordForm] = useState(false);

  const closeModal = () => {
    setIsResetPasswordForm(false);
  };

  return (
    <div>
      <div>
        <Logo />
        <MainContainer>
          <div className="mb-5">
            <LoginForm />
            <p className="text-center mt-6">
              Nie pamiętasz hasła?{" "}
              <a
                className="link link-primary"
                onClick={() => {
                  isResetPasswordForm
                    ? setIsResetPasswordForm(false)
                    : setIsResetPasswordForm(true);
                }}
              >
                Kliknij tutaj
              </a>
            </p>
          </div>

          {isResetPasswordForm && (
            <Modal>
              <ResetPassword closeModal={closeModal} />
            </Modal>
          )}
        </MainContainer>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
