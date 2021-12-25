import style from "./modal.module.css"
import PropTypes from "prop-types";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details"

const Modal = (props: any) => {
  const ingredientsDetails = props.modalData.ingredientsDetails.ingredientData;
  const orderDetails = props.modalData.orderDetails.orderData;
  const isOrderModal = props.modalData.orderDetails.isOrderModal;
  const isIngredientModal = props.modalData.ingredientsDetails.isIngredientModal;

  return(
    <div className={style.wr}>
      <div className={style.body}>
        {isIngredientModal && <IngredientDetails ingredientsDetails={ingredientsDetails} onClose={props.onClose}/>}
        {isOrderModal && <OrderDetails orderDetails={orderDetails} onClose={props.onClose}/>}
      </div>
    </div>
  )
}

Modal.propTypes = {
  onClose: PropTypes.func,
  modalData: PropTypes.objectOf(PropTypes.object)
}

export default Modal;