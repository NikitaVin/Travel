import React, { FC } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./fullTown.module.scss";

export const FullTown: FC = () => {
  const [town, setTown] = useState<{
   title: string,
   imageUrl: string,
   description: string,
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTown() {
      try {
        const { data } = await axios.get(
          "https://62b9929eff109cd1dc9590fa.mockapi.io/towns/" + id
        );
        setTown(data);
      } catch (error) {
        console.log(error);
        alert("Произошла ошибка");
        navigate("/");
      }
    }
    fetchTown();
  }, []);

  if (!town) {
    return <>Loading...</>;
  }

  return (
    <>
      <h1 className={styles.title}>{town.title}</h1>
      <div className={styles.container}>
        <div>
          <img className="pizza-block__image" src={town.imageUrl} />
        </div>
        <p className={styles.description}>{town.description}</p>
      </div>
    </>
  );
};
