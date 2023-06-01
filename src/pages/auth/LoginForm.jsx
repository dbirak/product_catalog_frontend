import { useMutation } from "react-query";
import { axiosBase } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const styleInputCorrect = "input input-bordered w-full";
  const styleInputError = styleInputCorrect + " input-error text-error";

  const login = useMutation({
    mutationFn: (data) => {
      axiosBase
        .post("/auth/login", data)
        .then((res) => {
          const token = res.data.token;

          localStorage.setItem("token", token);
          localStorage.setItem("role", "admin");

          navigate("/admin/category");
        })
        .catch((error) => {
          if (error.response.status == 401) {
            setError("email", { message: "" });
            setError("hasło", { message: error.response.data.message });
          } else if (error.response.status == 422) {
            for (const validateField in error.response.data.errors) {
              const validateMessage =
                error.response.data.errors[validateField][0];

              setError(validateField, { message: validateMessage });
            }
          } else console.log(error);
        })
        .finally(() => {
          //setIsLoading(false);
        });
    },
  });

  const onSubmitHandler = (data) => {
    login.mutate(data);
  };
  return (
    <div>
      <h1 className="my-6 text-[40px] text-center font-semibold ">Logowanie</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="w-1/2 mx-auto">
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

        <input
          type="password"
          placeholder="Hasło"
          className={errors.hasło ? styleInputError : styleInputCorrect}
          {...register("hasło", {
            required: "Pole hasło jest wymagane",
          })}
        />
        <label className="label mb-5">
          {errors.hasło && (
            <span className="label-text-alt text-error text-[13px]">
              {errors.hasło.message}
            </span>
          )}
        </label>

        <div className="w-[150px] mx-auto mt-3">
          <input
            className="btn btn-primary w-[150px]"
            type="submit"
            value="Zaloguj się"
          />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
