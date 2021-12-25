import style from "./modal-overlay.module.css";
import Modal from "../modal/modal";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";

const ModalOverlay = (props: any) => {
  const modalContainer = document.getElementById("react-modals")!;

  return (
    ReactDOM.createPortal(
      <div className={style.wr} onClick={props.onClose}>
        <Modal onClose={props.onClose} modalData={props.modalData}/>
      </div>,
      modalContainer
    )
  )
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func,
  modalData: PropTypes.object
}

export default ModalOverlay;