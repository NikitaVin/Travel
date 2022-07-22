import React, { FC, useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectorSort, setSort, SortType } from "../../../../store/filterSlice";



type PopUpClick = MouseEvent & {
   path: Node[]
}

export const sortItems = [
  { name: "популярности ↑", sortProperty: "rating" },
  { name: "популярности ↓", sortProperty: "-rating" },
  { name: "цене ↑", sortProperty: "price" },
  { name: "цене ↓", sortProperty: "-price" },
  { name: "алфавиту ↑", sortProperty: "title" },
  { name: "алфавиту ↓", sortProperty: "-title" },
];

export const Sort: FC = () => {
  const sortRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const sort = useSelector(selectorSort);

  const [open, setOpen] = useState(false);

  const onClickSortItems = (obj: SortType) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopUpClick
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div>
      <div ref={sortRef} className="sort">
        <div className="sort__label">
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
          <b>Сортировка по:</b>
          <span onClick={() => setOpen(!open)}>{sort && sort.name}</span>
        </div>
        {open && (
          <div className="sort__popup">
            <ul>
              {sortItems.map(({ name, sortProperty }, id) => (
                <li
                  key={id}
                  onClick={() => onClickSortItems({ name, sortProperty })}
                  className={sort && sort.sortProperty === sortProperty ? "active" : ""}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
