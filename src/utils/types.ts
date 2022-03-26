export type TIsLogged = boolean;

export type TOnCLoseModal = () => void;

interface IDefaultIngredientType {
  __v: number;
  _id: string;
  calories: number,
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
};

export interface IEditedIngredientType extends IDefaultIngredientType {
  id: string;
  index: number | string;
};
