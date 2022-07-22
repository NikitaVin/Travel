import React, { FC } from 'react'
import styles from "./styles.module.scss";

export const NotFoundBlock: FC = () => {
   
  return (
    <div className={styles.notFoundBlock}>
      <span>
      	&#129488;
      </span>
      <h1 >Страница не найдена</h1>
      <h4>Попробуйте вернуться на главную страницу</h4>
   </div>
  )
}
