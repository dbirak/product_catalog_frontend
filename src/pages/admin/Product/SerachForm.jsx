import { useForm } from "react-hook-form";
import { axiosWithBearer } from "../../../api/axios";
import { useMutation, useQuery } from "react-query";
import { useState } from "react";
import Loading from "../../../components/loading/Loading";

const SerachForm = (props) => {
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const styleInputCorrect = "input input-bordered w-full";
  const styleInputError = styleInputCorrect + " input-error text-error";

  const styleInputCorrecSelect =
    "select w-full font-normal text-[16px] input input-bordered";
  const styleInputErrorSelect =
    styleInputCorrecSelect + " input-error text-error";

  const getCategory = useQuery("getCategory", () => {
    axiosWithBearer
      .get("/category")
      .then((res) => {
        setCategory(res.data.data);
        setIsLoading(false);
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
      .finally(() => {});
  });

  const onSubmitHandler = async (data) => {
    data.kategoria = parseInt(data.kategoria);

    props.serachProduct(data);
  };

  if (category == null || isLoading) return <Loading />;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="w-1/2 mx-auto">
        <input
          type="text"
          placeholder="Wpisz nazwę produktu"
          className={errors.nazwa ? styleInputError : styleInputCorrect}
          {...register("nazwa")}
        />
        <label className="label mb-5">
          {errors.nazwa && (
            <span className="label-text-alt text-error text-[13px]">
              {errors.nazwa.message}
            </span>
          )}
        </label>

        <select
          className={
            errors.kategoria ? styleInputErrorSelect : styleInputCorrecSelect
          }
          defaultValue={"Kategoria"}
          {...register("kategoria")}
        >
          <option key={0} value="0" defaultValue>
            Kategoria
          </option>
          {category.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <label className="label mb-5">
          {errors.kategoria && (
            <span className="label-text-alt text-error text-[13px]">
              {errors.kategoria.message}
            </span>
          )}
        </label>

        <div className="w-[150px] mx-auto">
          <input
            className="btn btn-primary w-[150px]"
            type="submit"
            value="Szukaj"
          />
        </div>
      </form>
    </div>
  );
};

export default SerachForm;
