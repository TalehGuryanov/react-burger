import style from "./modal-overlay.module.css";

import PropTypes from "prop-types";

const ModalOverlay = (props) => <div className={style.wr} onClick={props.onClose}/>

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default ModalOverlay;