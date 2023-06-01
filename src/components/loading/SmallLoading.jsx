import LoadingSVG from "../../assets/Loading.gif";

const SmallLoading = () => {
  return (
    <div className="m-8 mx-auto">
      <div className="w-[80px] h-auto mx-auto">
        <img src={LoadingSVG} />
      </div>
    </div>
  );
};

export default SmallLoading;
