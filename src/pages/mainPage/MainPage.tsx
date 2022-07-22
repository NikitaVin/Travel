import { FC, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Countries } from "./components/countries/Countries";
import { Sort, sortItems } from "./components/Sort/Sort";
import { Town } from "./components/town/town";
import { TownSkeleton } from "./components/town/townSkeleton";
import styles from "./mainPage.module.scss";
import { useEffect } from "react";
import { Pagination } from "../../components/pagination";
import { useDispatch, useSelector } from "react-redux";
import {
   filterSelector,
   setCountryId,
   setCurrentPage,
   setFilters,
} from "../../store/filterSlice";
import qs from "qs";
import { getAsyncTowns, townsSelector } from "../../store/towns2";
import { useAppDispatch } from "../../store";



export const MainPage: FC = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const appDispatch = useAppDispatch()
   const { countryId, sort, currentPage, searchValue } = useSelector(
      filterSelector
   );
   const { towns, isLoading } = useSelector(townsSelector);
   const [isSearch, setIsSearch] = useState(false)
   const [isMounted, setIsMounted] = useState(false)
   const activeSortItem = sort.sortProperty;

   const onChangePage = (page: number) => {
      dispatch(setCurrentPage(page));
   };

   const fetchTowns = async () => {
      const order = activeSortItem.includes("-") ? "desc" : "asc";
      const sortBy = activeSortItem.replace("-", "");
      const category: string = (countryId || 0) > 0 ? `category=${countryId}` : "";
      appDispatch(getAsyncTowns({ order, sortBy, category, currentPage: String(currentPage) }));
   };

   //useEffect(() => {
   //   window.scrollTo(0, 0);
   
   //      fetchTowns();
      
     
   //}, [countryId, activeSortItem, currentPage]);



   useEffect(() => {
      //const queryString = qs.stringify({
      //   activeSortItem,
      //   countryId,
      //   currentPage,
      //});

      //navigate(`?${queryString}`);
      
      if (window.location.search) {
         const params = qs.parse(window.location.search.substring(1));
         

         const sort = sortItems.find(
            ({ sortProperty }) => sortProperty === params.activeSortItem
         );

         sort && dispatch(
            setFilters({
               ...params,
               sort,
            })
         );
         
      }
      window.scrollTo(0, 0);
   
      fetchTowns();
      
   }, [countryId, activeSortItem, currentPage]);

   useEffect(() => {
      if (isMounted) {
         const queryString = qs.stringify({
            activeSortItem,
            countryId,
            currentPage,
         });

         navigate(`?${queryString}`);
      }
      setIsMounted(true)
   }, [countryId, activeSortItem, currentPage, navigate]);



   return (
      <>
         <div className={styles.mainPage}>
            <Countries
               countryId={countryId || 0}
               onClickCountry={(i: number) => dispatch(setCountryId(i))}
            />
            <Sort />
         </div>
         <div className="content__top">
            <h2 className="content__title">Все курорты</h2>
            <div className="content__items">
               {isLoading
                  ? [...Array(6)].map((_, index) => <TownSkeleton key={index} />)
                  : towns
                     .filter((townFilter) =>
                        townFilter.title
                           .toLowerCase()
                           .includes((searchValue || '').toLowerCase())
                     )
                     .map((town) => <Town {...town} key={town.id} />)}
            </div>
            <Pagination value={currentPage || 0} changePage={onChangePage} />
         </div>
      </>
   );
};
