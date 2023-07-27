import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "../../../components/loading/Loading";
import Swal from "sweetalert2";
import { axiosWithBearer, axiosWithBearerFormData } from "../../../api/Axios";

const EditProduct = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm();

  const styleInputCorrect = "input input-bordered w-full";
  const styleInputError = styleInputCorrect + " input-error text-error";

  const styleInputCorrecSelect =
    "select w-full font-normal text-[16px] input input-bordered";
  const styleInputErrorSelect =
    styleInputCorrecSelect + " input-error text-error";

  const styleInputCorrectFile =
    "file-input file-input-primary file-input-bordered w-full max-w-xs";
  const styleInputErrorFile = styleInputCorrectFile + " input-error text-error";

  const getCategory = useQuery("getCategory", () => {
    axiosWithBearer
      .get("/category")
      .then((res) => {
        setCategory(res.data.data);
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
        if (category != null && product != null) setIsLoading(false);
      });
  });

  const getProduct = useQuery("getProduct", () => {
    axiosWithBearer
      .get("/product/" + props.id)
      .then((res) => {
        setProduct(res.data);

        setValue("kategoria", res.data.category.id);
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
        if (category != null && product != null) setIsLoading(false);
      });
  });

  const edit = useMutation({
    mutationFn: (data) => {
      setIsLoading(true);

      setIsLoading(true);
      axiosWithBearerFormData
        .post("/product/" + product.id, data)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Sukces",
            text: "Wybrany produkt został zaaktualizowany!",
          });
          props.reloadProduct();
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
    data.kategoria = parseInt(data.kategoria);

    const formData = new FormData();

    formData.append("nazwa", data.nazwa);
    formData.append("opis", data.opis);
    formData.append("kategoria", data.kategoria);

    if (data.zdjęcie[0]) {
      formData.append("zdjęcie", data.zdjęcie[0]);
    }

    if (data.pdf[0]) {
      formData.append("pdf", data.pdf[0]);
    }

    edit.mutate(formData);
  };

  if (category === null || product === null || isLoading) return <Loading />;

  return (
    <div>
      <h1 className=" text-[30px] mb-8 text-center font-semibold">
        Edytuj produkt
      </h1>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <input
          type="text"
          placeholder="Nazwa produktu"
          defaultValue={product.name}
          className={errors.nazwa ? styleInputError : styleInputCorrect}
          {...register("nazwa", {
            required: "Pole nazwa jest wymagane.",
          })}
        />
        <label className="label mb-5">
          {errors.nazwa && (
            <span className="label-text-alt text-error text-[13px]">
              {errors.nazwa.message}
            </span>
          )}
        </label>

        <input
          type="text"
          placeholder="Opis"
          defaultValue={product.code_qr}
          className={errors.opis ? styleInputError : styleInputCorrect}
          {...register("opis", {
            required: "Pole opis jest wymagane.",
          })}
        />
        <label className="label mb-5">
          {errors.opis && (
            <span className="label-text-alt text-error text-[13px]">
              {errors.opis.message}
            </span>
          )}
        </label>

        <select
          className={
            errors.kategoria ? styleInputErrorSelect : styleInputCorrecSelect
          }
          defaultValue={product.category.id}
          {...register("kategoria", {
            minLength: {
              value: 1,
              message: "Proszę wybrać kategorię",
            },
          })}
        >
          <option key={0} disabled value="0">
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

        <label className="label">
          <span className="label-text">
            Nowe zdjęcie (zastąpi aktualne zdjęcie)
          </span>
        </label>
        <input
          type="file"
          placeholder="zdjęcie"
          className={
            errors.zdjęcie ? styleInputErrorFile : styleInputCorrectFile
          }
          {...register("zdjęcie")}
        />
        <label className="label mb-5">
          {errors.zdjęcie && (
            <span className="label-text-alt text-error text-[13px]">
              {errors.zdjęcie.message}
            </span>
          )}
        </label>

        <label className="label mt-0">
          <span className="label-text">
            Nowy plik pdf (zastąpi aktualny plik)
          </span>
        </label>
        <input
          type="file"
          placeholder="pdf"
          className={errors.pdf ? styleInputErrorFile : styleInputCorrectFile}
          {...register("pdf")}
        />
        <label className="label mb-5">
          {errors.pdf && (
            <span className="label-text-alt text-error text-[13px]">
              {errors.pdf.message}
            </span>
          )}
        </label>

        <div className="w-full mx-auto mt-3 flex justify-around">
          <input
            className="btn btn-primary text-white block"
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

export default EditProduct;
