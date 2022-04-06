import React from 'react';
import { useHistory } from 'react-router-dom';
import {Modal} from "../modal/modal";

type TPreviewModalProps = {
  children: React.ReactNode
  title?: string
}

const PreviewModal: React.FC<TPreviewModalProps> = ({children, title}) => {
  const history = useHistory();
  
  const onCloseModal = () => {
    
    history.goBack()
  };
  
  return (
      <Modal onCloseModal={onCloseModal} title={title}>
        {children}
      </Modal>
  )
}

export default PreviewModal;
