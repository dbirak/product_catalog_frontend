import { useForm } from "react-hook-form";
import MainContainer from "../../../components/containers/MainContainer";
import Navbar from "../../../components/navbar/Navbar";
import { axiosWithBearer } from "../../../api/axios";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import Loading from "../../../components/loading/Loading";
import { useState } from "react";

const Setting = () => {
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

      axiosWithBearer
        .post("/auth/password", data)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Sukces",
            text: "Twoje hasło zostało zmienione!",
          });
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
          } else if (error.response.status == 400) {
            if (error.response.data.message) {
              setError("obecne hasło", {
                message: "Niepoprawne obecne hasło!",
              });
            } else {
              setError("nowe hasło", { message: "" });
              setError("powtórz nowe hasło", {
                message: error.response.data.message,
              });
            }
          } else console.log(error);
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
      changePassword.mutate(data);
    }
  };

  return (
    <div>
      <Navbar value="ustawienia">
        {isLoading && <Loading />}
        <MainContainer>
          <div className="mt-10 flex justify-between w-auto">
            <div className="w-[95%] my-6">
              <h1 className="text-[35px] text-center font-semibold ">
                Ustawienia
              </h1>
            </div>
            <div className="w-[5%] mx-auto my-6 grid items-center"></div>
          </div>
          <div>
            <form
              onSubmit={handleSubmit(onSubmitHandler)}
              className="w-1/2 mx-auto"
            >
              <input
                type="password"
                placeholder="Wpisz obecne hasło"
                className={
                  errors["obecne hasło"] ? styleInputError : styleInputCorrect
                }
                {...register("obecne hasło", {
                  required: "Pole obecne hasło jest wymagane.",
                })}
              />
              <label className="label mb-5">
                {errors["obecne hasło"] && (
                  <span className="label-text-alt text-error text-[13px]">
                    {errors["obecne hasło"].message}
                  </span>
                )}
              </label>

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
      </Navbar>
    </div>
  );
};

export default Setting;
