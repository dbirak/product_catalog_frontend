const Modal = (props) => {
  const onCloseModal = () => {
    props.onCloseModal();
  };

  return (
    <div className="fixed bg-[#000000a6] z-10 w-screen h-screen inset-0 flex items-center justify-center">
      <div className="m-5 p-7 bg-base-100 rounded-lg">{props.children}</div>
    </div>
  );
};

export default Modal;
