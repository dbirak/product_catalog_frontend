import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { axiosWithBearer } from "../../../api/axios";
import { useState } from "react";
import Loading from "../../../components/loading/Loading";

const AddProduct = (props) => {
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

  const onSubmitHandler = (data) => {
    console.log(data);
  };

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
            className="btn btn-primary block"
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

export default AddProduct;
