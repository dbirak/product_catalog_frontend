const MainContainer = (props) => {
  return (
    <div className=" max-w-[1150px] p-5 mx-auto min-h-[calc(100vh-203px)]">
      {props.children}
    </div>
  );
};

export default MainContainer;
