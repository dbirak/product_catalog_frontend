import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { axiosWithBearer } from "../../../api/Axios";
import { useState } from "react";
import Loading from "../../../components/loading/Loading";

const AddCategory = (props) => {
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

  const create = useMutation({
    mutationFn: (data) => {
      setIsLoading(true);
      axiosWithBearer
        .post("/category", data)
        .then((res) => {
          props.reloadCategory();
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
    create.mutate(data);
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className=" text-[30px] mb-8 text-center font-semibold">
        Dodaj nową kategorię
      </h1>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <input
          type="text"
          placeholder="Nazwa kategorii"
          className={errors.nazwa ? styleInputError : styleInputCorrect}
          {...register("nazwa", {
            required: "Pole nazwa jest wymagane.",
            pattern: {
              value: /^[a-zA-ZĄ-ŻĄąĆćĘęŁłŃńÓóŚśŹźŻż _-]{1,}$/,
              message: "Niepoprawna nazwa kategorii.",
            },
          })}
        />
        <label className="label mb-5">
          {errors.nazwa && (
            <span className="label-text-alt text-error text-[13px]">
              {errors.nazwa.message}
            </span>
          )}
        </label>

        <div className="w-full mx-auto mt-3 flex justify-around">
          <input
            className="btn btn-primary text-white block"
            type="submit"
            value="Dodaj"
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

export default AddCategory;
