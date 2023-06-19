import { useNavigate, useParams } from "react-router-dom";
import MainContainer from "../../../components/containers/MainContainer";
import Logo from "../../../components/logo/Logo";
import Footer from "../../../components/footer/Footer";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "react-query";
import { axiosBase } from "../../../api/Axios";
import Swal from "sweetalert2";
import Loading from "../../../components/loading/Loading";

const ResetPasswordForm = () => {
  const { token } = useParams();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const styleInputCorrect = "input input-bordered w-full";
  const styleInputError = styleInputCorrect + " input-error text-error";

  const changePassword = useMutation({
    mutationFn: (data) => {
      setIsLoading(true);

      axiosBase
        .post("/auth/reset-password", data)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Sukces",
            text: "Twoje hasło zostało zmienione!",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/login");
            }
          });
        })
        .catch((error) => {
          if (error.response.status == 422) {
            for (const validateField in error.response.data.errors) {
              const validateMessage =
                error.response.data.errors[validateField][0];

              setError(validateField, { message: validateMessage });
            }
          } else if (error.response.status == 404) {
            Swal.fire({
              icon: "error",
              title: "Błąd",
              text: "Twój token zmiany hasła wygasł lub jest nieprawdłowy!",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/login");
              }
            });
          } else {
            console.log(error);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  const onSubmitHandler = async (data) => {
    if (data["nowe hasło"] !== data["powtórz nowe hasło"]) {
      setError("powtórz nowe hasło", {
        message:
          "Podane powtórz nowe hasło nie jest takie same jak pole nowe hasło.",
      });
    } else {
      data.token = token;
      changePassword.mutate(data);
    }
  };

  return (
    <div>
      <Logo />
      {isLoading && <Loading />}
      <MainContainer>
        <div className="w-full my-6">
          <h1 className="my-6 text-[40px] text-center font-semibold ">
            Resetowanie hasła
          </h1>
        </div>
        <div className="mb-5">
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="max-w-lg mx-auto"
          >
            <input
              type="password"
              placeholder="Wpisz nowe hasło"
              className={
                errors["nowe hasło"] ? styleInputError : styleInputCorrect
              }
              {...register("nowe hasło", {
                required: "Pole nowe hasło jest wymagane.",
              })}
            />
            <label className="label mb-5">
              {errors["nowe hasło"] && (
                <span className="label-text-alt text-error text-[13px]">
                  {errors["nowe hasło"].message}
                </span>
              )}
            </label>

            <input
              type="password"
              placeholder="Powtórz nowe hasło"
              className={
                errors["powtórz nowe hasło"]
                  ? styleInputError
                  : styleInputCorrect
              }
              {...register("powtórz nowe hasło", {
                required: "Pole powtórz nowe hasło jest wymagane.",
              })}
            />
            <label className="label mb-5">
              {errors["powtórz nowe hasło"] && (
                <span className="label-text-alt text-error text-[13px]">
                  {errors["powtórz nowe hasło"].message}
                </span>
              )}
            </label>

            <div className="w-[150px] mx-auto">
              <input
                className="btn btn-primary w-[150px]"
                type="submit"
                value="Zmień hasło"
              />
            </div>
          </form>
        </div>
      </MainContainer>
      <Footer />
    </div>
  );
};

export default ResetPasswordForm;
