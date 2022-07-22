import React, { FC } from "react";
import ReactPaginate from "react-paginate";
import styles from "./pagination.module.scss";

interface PaginationProps {
   value: number;
   changePage: (arg: number) => void;
}

export const Pagination: FC<PaginationProps> = ({ value, changePage }) => 
<ReactPaginate
   className={styles.pagination}
   breakLabel="..."
   nextLabel=">"
   previousLabel="<"
   onPageChange={(event) => changePage(event.selected + 1)}
   pageRangeDisplayed={3}
   pageCount={2}
   forcePage={value - 1}
/>
