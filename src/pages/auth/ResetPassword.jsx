import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosBase } from "../../api/Axios";
import Loading from "../../components/loading/Loading";
import Swal from "sweetalert2";

const ResetPassword = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const styleInputCorrect = "input input-bordered w-full";
  const styleInputError = styleInputCorrect + " input-error text-error";

  const reset = useMutation({
    mutationFn: (data) => {
      setIsLoading(true);
      axiosBase
        .post("/auth/forgot-password", data)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Sukces",
            text: "Wiadomość została wysłana na podany adres email!",
          });
          props.closeModal();
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
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  const onSubmitHandler = (data) => {
    reset.mutate(data);
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className=" text-[30px] mb-8 text-center font-semibold">
        Resetowanie hasła
      </h1>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <input
          type="text"
          placeholder="Adres e-mail"
          className={errors.email ? styleInputError : styleInputCorrect}
          {...register("email", {
            required: "Pole email jest wymagane.",
            pattern: {
              value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
              message: "Nieprawidłowy adres email.",
            },
          })}
        />
        <label className="label mb-5">
          {errors.email && (
            <span className="label-text-alt text-error text-[13px]">
              {errors.email.message}
            </span>
          )}
        </label>

        <div className="w-full mx-auto mt-3 flex justify-around">
          <input
            className="btn btn-primary text-white block"
            type="submit"
            value="Resetuj"
          />
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => {
              props.closeModal();
            }}
          >
            Anuluj
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
