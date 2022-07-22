import React, { FC, useMemo } from "react";

interface CountriesProps  {
   countryId: number;
   onClickCountry: (i: number) => void;
}

export const Countries: FC<CountriesProps> = ({ countryId, onClickCountry }) => {
  const categories = [
    "Все",
    "Россия",
    "Турция",
    "Греция",
    "Франция",
    "Германия",
  ];
  

  return (
    <div className="categories">
      <ul>
        { categories.map((category, index) => (
          <li
            key={category}
            onClick={() => onClickCountry(index)}
            className={countryId === index ? "active" : ""}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
