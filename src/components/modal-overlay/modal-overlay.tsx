import style from "./modal-overlay.module.css";
import React from "react";
import {TOnCLoseModal} from "../../utils/types";

type TModalOverlayProps = {
  onCloseModal: TOnCLoseModal
}

export const ModalOverlay: React.FC<TModalOverlayProps> = ({onCloseModal}) => <div className={style.wr} onClick={onCloseModal}/>
