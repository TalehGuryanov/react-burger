import style from "./modal.module.css"
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import React from "react";

const Modal = (props) => {
  const modalContainer = document.getElementById("react-modals");

  React.useEffect(() => {
    function keyCloseModal(e) {
      if(e.code === "Escape") {
        props.onCloseModal();
      }
    }

    document.addEventListener("keyup", keyCloseModal)

    return(() => document.removeEventListener("keyup", keyCloseModal))
  }, []);

  return(
    ReactDOM.createPortal(
    <div className={style.wr}>
      <ModalOverlay onClose={props.onCloseModal}/>

      <div className={style.content} >
        <div className={style.body}>
          {props.children}
        </div>
      </div>
    </div>,
    modalContainer
    )
  )
}

Modal.propTypes = {
  onCloseModal: PropTypes.func,
  children: PropTypes.element.isRequired
}

export default Modal;