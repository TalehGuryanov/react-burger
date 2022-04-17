import style from "./images-list.module.css";
import React from "react";

type TImagesListProps = {
  image: string
};

const ImagesList: React.FC<TImagesListProps> = (image) => {
  return (
      <ul className={style.images_list}>
        <li></li>
      </ul>
  )
}

export default ImagesList