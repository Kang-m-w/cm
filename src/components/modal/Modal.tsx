import React from "react";
import "./Modal.css";
import { SetterOrUpdater } from "recoil";

type Props = {
  option: {
    isRes?: boolean;
  };
  style: {};
  children?: React.ReactNode;
};

export const Modal = ({
  init,
  isOpen,
  setIsOpen,
  children,
}: {
  init: Props;
  isOpen: boolean,
  setIsOpen: SetterOrUpdater<boolean>,
  children?: React.ReactNode;
}) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleModal = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`overlay ${isOpen ? "isOpen" : "isClose"}`}
      onClick={closeModal}
    >
      <div
        className={`modal ${init.option.isRes ? "isRes" : ""}`}
        style={init.style}
        onClick={handleModal}
      >
        {children}
      </div>
    </div>
  );
};
