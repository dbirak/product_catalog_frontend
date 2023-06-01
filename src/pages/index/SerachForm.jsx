import { useForm } from "react-hook-form";

const SerachForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const styleInputCorrect = "input input-bordered w-full";
  const styleInputError = styleInputCorrect + " input-error text-error";

  const onSubmitHandler = async (data) => {
    console.log(data);
  };

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
          className="select w-full font-normal text-[16px] input input-bordered"
          defaultValue={"Województwo"}
          {...register("kategoria")}
        >
          <option value="0" defaultValue>
            Kategoria
          </option>
          <option value="1">Dolnośląskie</option>
          <option value="2">Kujawsko-Pomorskie</option>
          <option value="3">Lubelskie</option>
          <option value="4">Lubuskie</option>
          <option value="5">Łódzkie</option>
          <option value="6">Małopolskie</option>
          <option value="7">Mazowieckie</option>
          <option value="8">Opolskie</option>
          <option value="9">Podkarpackie</option>
          <option value="10">Podlaskie</option>
          <option value="11">Pomorskie</option>
          <option value="12">Śląskie</option>
          <option value="13">Świętokrzyskie</option>
          <option value="14">Warmińsko-Mazurskie</option>
          <option value="15">Wielkopolskie</option>
          <option value="16">Zachodniopomorskie</option>
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
