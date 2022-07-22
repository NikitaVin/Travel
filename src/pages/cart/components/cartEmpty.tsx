import React, { FC } from "react";
import { Link } from "react-router-dom";
import emprtyCartImg from "../../../assets/empty-cart.png";

export const CartEmpty: FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Корзина пустая <span>😕</span>
      </h2>
      <p>
        Вероятней всего, вы еще не выбрали курорт.
        <br />
        Для того, чтобы заказать билет, перейди на главную страницу.
      </p>
      <img src={emprtyCartImg} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};
