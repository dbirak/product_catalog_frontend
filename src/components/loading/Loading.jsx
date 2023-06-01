import LoadingSVG from "../../assets/Loading.gif";

const Loading = () => {
  return (
    <div className="fixed left-0 top-0 w-full h-full bg-[#000000a6] z-10">
      <div className="w-[80px] h-auto fixed left-[calc(50vw-40px)] top-[calc(50vh-40px)]">
        <img src={LoadingSVG} />
      </div>
    </div>
  );
};

export default Loading;
