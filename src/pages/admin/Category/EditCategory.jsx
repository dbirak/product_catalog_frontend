import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { axiosWithBearer } from "../../../api/axios";
import { useState } from "react";
import Loading from "../../../components/loading/Loading";
import Swal from "sweetalert2";

const EditCategory = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const styleInputCorrect = "input input-bordered w-full";
  const styleInputError = styleInputCorrect + " input-error text-error";

  const getCategory = useQuery("getCategory", () => {
    axiosWithBearer
      .get("/category/" + props.idCategory)
      .then((res) => {
        setCategory(res.data);
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

  const edit = useMutation({
    mutationFn: (data) => {
      setIsLoading(true);
      axiosWithBearer
        .put("/category/" + category.id, data)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Sukces",
            text: "Wybrana kategoria została zaaktualizowana!",
          });
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
    edit.mutate(data);
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className=" text-[30px] mb-8 text-center font-semibold">
        Edytuj kategorię
      </h1>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <input
          type="text"
          placeholder="Nazwa kategorii"
          defaultValue={category.name}
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
            value="Edytuj"
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

export default EditCategory;
