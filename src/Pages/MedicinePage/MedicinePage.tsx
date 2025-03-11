// import css from "./MedicinePage.module.css";
// import searchIcon from "../../images/search.svg";
// import filterIcon from "../../images/filter.svg";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { getProducts } from "../../redux/products/operation";
// import { productsSelector } from "../../redux/products/selector";
// import { AppDispatch } from "../../redux/store";
// import toast from "react-hot-toast";

// const MedicinePage = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [category, setCategory] = useState("");

//   const products = useSelector(productsSelector) || [];
//   console.log(products);

//   useEffect(() => {
//     dispatch(
//       getProducts({
//         name: searchTerm.trim() || undefined,
//         category: category || undefined,
//         page: 1,
//         limit: 12,
//       })
//     );
//   }, [dispatch, category]); // Фильтрация по select при изменении категории

//   const handleFilterClick = () => {
//     dispatch(
//       getProducts({
//         name: searchTerm.trim() || undefined,
//         category: category || undefined,
//       })
//     )
//       .unwrap()
//       .catch(() => toast.error("There are no products with this name!"));
//   };

//   return (
//     <section className={css.mainSection}>
//       <h2 className={css.pageTitle}>Medicine</h2>
//       <div className={css.filterMainCont}>
//         <div className={css.filterInputs}>
//           {/* Фильтр по категории (onChange) */}
//           <select
//             className={css.filterSelect}
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="">All Categories</option>
//             <option value="Medicine">Medicine</option>
//             <option value="Heart">Heart</option>
//             <option value="Head">Head</option>
//             <option value="Hand">Hand</option>
//             <option value="Leg">Leg</option>
//           </select>

//           {/* Поиск по названию (по кнопке) */}
//           <div className={css.searchInputCont}>
//             <input
//               type="text"
//               placeholder="Search medicine"
//               className={css.searchInput}
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <img src={searchIcon} alt="" className={css.inputSearchIcon} />
//           </div>
//         </div>

//         {/* Кнопка запуска поиска по имени */}
//         <button className={css.filterBtn} onClick={handleFilterClick}>
//           <img src={filterIcon} alt="" className={css.filterBtnIcon} />
//           Filter
//         </button>
//       </div>

//       <ul className={css.productsList}>
//         {products.length > 0 ? (
//           products.map((product) => (
//             <li key={product._id} className={css.listItem}>
//               <div
//                 className={css.productImage}
//                 style={{ backgroundImage: `url(${product.photo})` }}
//               ></div>
//               <div className={css.mainInfoCont}>
//                 <div className={css.infoCont}>
//                   <div className={css.descriptionCont}>
//                     <h3>{product.name}</h3>
//                     <p>{product.suppliers}</p>
//                   </div>
//                   <p className={css.price}>৳{product.price}</p>
//                 </div>
//                 <div className={css.functionalCont}>
//                   <button className={css.addBtn}>Add to cart</button>
//                   <Link
//                     to={`/product/${product._id}`}
//                     className={css.detailsLink}
//                   >
//                     Details
//                   </Link>
//                 </div>
//               </div>
//             </li>
//           ))
//         ) : (
//           <p className={css.noResults}>No products found</p>
//         )}
//       </ul>
//     </section>
//   );
// };

// export default MedicinePage;

//ХОРОШИЙ ВАРИАНТ

// import css from "./MedicinePage.module.css";
// import searchIcon from "../../images/search.svg";
// import filterIcon from "../../images/filter.svg";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { getProducts } from "../../redux/products/operation";
// import { productsSelector } from "../../redux/products/selector";
// import { AppDispatch } from "../../redux/store";
// import toast from "react-hot-toast";

// const MedicinePage = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   // Состояния фильтрации
//   const [searchTerm, setSearchTerm] = useState("");
//   const [category, setCategory] = useState("");

//   // Состояние для пагинации
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const products = useSelector(productsSelector) || [];

//   useEffect(() => {
//     // Сбрасываем страницу при смене категории
//     setPage(1);
//     dispatch(
//       getProducts({
//         name: searchTerm.trim() || undefined,
//         category: category || undefined,
//         page: 1,
//         limit: 12,
//       })
//     );
//   }, [dispatch, category]); // Фильтрация по select при изменении категории

//   const handleFilterClick = () => {
//     setPage(1); // Сбрасываем страницу
//     dispatch(
//       getProducts({
//         name: searchTerm.trim() || undefined,
//         category: category || undefined,
//         page: 1,
//         limit: 12,
//       })
//     )
//       .unwrap()
//       .then((res) => {
//         if (res.length < 12) {
//           setHasMore(false);
//         } else {
//           setHasMore(true);
//         }
//       })
//       .catch(() => {
//         toast.error("There are no products with this name!");
//         setHasMore(false);
//       });
//   };

//   const handleLoadMore = () => {
//     const nextPage = page + 1;
//     setPage(nextPage);

//     dispatch(
//       getProducts({
//         name: searchTerm.trim() || undefined,
//         category: category || undefined,
//         page: nextPage,
//         limit: 12,
//       })
//     )
//       .unwrap()
//       .then((res) => {
//         if (res.length < 12) {
//           setHasMore(false);
//         }
//       })
//       .catch(() => {
//         toast.error("No more products available!");
//         setHasMore(false);
//       });
//   };

//   return (
//     <section className={css.mainSection}>
//       <h2 className={css.pageTitle}>Medicine</h2>
//       <div className={css.filterMainCont}>
//         <div className={css.filterInputs}>
//           {/* Фильтр по категории (onChange) */}
//           <select
//             className={css.filterSelect}
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="">All Categories</option>
//             <option value="Medicine">Medicine</option>
//             <option value="Heart">Heart</option>
//             <option value="Head">Head</option>
//             <option value="Hand">Hand</option>
//             <option value="Leg">Leg</option>
//           </select>

//           {/* Поиск по названию (по кнопке) */}
//           <div className={css.searchInputCont}>
//             <input
//               type="text"
//               placeholder="Search medicine"
//               className={css.searchInput}
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <img src={searchIcon} alt="" className={css.inputSearchIcon} />
//           </div>
//         </div>

//         {/* Кнопка запуска поиска по имени */}
//         <button className={css.filterBtn} onClick={handleFilterClick}>
//           <img src={filterIcon} alt="" className={css.filterBtnIcon} />
//           Filter
//         </button>
//       </div>

//       <ul className={css.productsList}>
//         {products.length > 0 ? (
//           products.map((product) => (
//             <li key={product._id} className={css.listItem}>
//               <div
//                 className={css.productImage}
//                 style={{ backgroundImage: `url(${product.photo})` }}
//               ></div>
//               <div className={css.mainInfoCont}>
//                 <div className={css.infoCont}>
//                   <div className={css.descriptionCont}>
//                     <h3>{product.name}</h3>
//                     <p>{product.suppliers}</p>
//                   </div>
//                   <p className={css.price}>৳{product.price}</p>
//                 </div>
//                 <div className={css.functionalCont}>
//                   <button className={css.addBtn}>Add to cart</button>
//                   <Link
//                     to={`/product/${product._id}`}
//                     className={css.detailsLink}
//                   >
//                     Details
//                   </Link>
//                 </div>
//               </div>
//             </li>
//           ))
//         ) : (
//           <p className={css.noResults}>No products found</p>
//         )}
//       </ul>

//       {/* Кнопка "Load More" появляется, если есть еще товары */}
//       {hasMore && (
//         <button className={css.loadMoreBtn} onClick={handleLoadMore}>
//           Load More
//         </button>
//       )}
//     </section>
//   );
// };

// export default MedicinePage;

// Тоже хороший вариант
// import css from "./MedicinePage.module.css";
// import searchIcon from "../../images/search.svg";
// import filterIcon from "../../images/filter.svg";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { getProducts } from "../../redux/products/operation";
// import { productsSelector } from "../../redux/products/selector";
// import { AppDispatch } from "../../redux/store";
// import toast from "react-hot-toast";

// const MedicinePage = () => {
//   const dispatch = useDispatch<AppDispatch>();

// Фильтрация и пагинация

//   const [searchTerm, setSearchTerm] = useState("");
//   const [category, setCategory] = useState("");
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const products = useSelector(productsSelector) || [];

//   useEffect(() => {
//     setPage(1);
//     dispatch(
//       getProducts({
//         name: searchTerm.trim() || undefined,
//         category: category || undefined,
//         page: 1,
//         limit: 12,
//       })
//     );
//   }, [dispatch, category]);

//   const handleFilterClick = () => {
//     setPage(1);
//     dispatch(
//       getProducts({
//         name: searchTerm.trim() || undefined,
//         category: category || undefined,
//         page: 1,
//         limit: 12,
//       })
//     )
//       .unwrap()
//       .then((res) => {
//         setHasMore(res.length === 12);
//       })
//       .catch(() => {
//         toast.error("There are no products with this name!");
//         setHasMore(false);
//       });
//   };

//   const handleNextPage = () => {
//     const nextPage = page + 1;
//     setPage(nextPage);

//     dispatch(
//       getProducts({
//         name: searchTerm.trim() || undefined,
//         category: category || undefined,
//         page: nextPage,
//         limit: 12,
//       })
//     )
//       .unwrap()
//       .then((res) => {
//         setHasMore(res.length === 12);
//       })
//       .catch(() => {
//         toast.error("No more products available!");
//         setHasMore(false);
//       });
//   };

//   const handlePreviousPage = () => {
//     if (page > 1) {
//       const prevPage = page - 1;
//       setPage(prevPage);

//       dispatch(
//         getProducts({
//           name: searchTerm.trim() || undefined,
//           category: category || undefined,
//           page: prevPage,
//           limit: 12,
//         })
//       )
//         .unwrap()
//         .then(() => setHasMore(true))
//         .catch(() => toast.error("Error loading previous page"));
//     }
//   };

//   return (
//     <section className={css.mainSection}>
//       <h2 className={css.pageTitle}>Medicine</h2>
//       <div className={css.filterMainCont}>
//         <div className={css.filterInputs}>
//           <select
//             className={css.filterSelect}
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="">All Categories</option>
//             <option value="Medicine">Medicine</option>
//             <option value="Heart">Heart</option>
//             <option value="Head">Head</option>
//             <option value="Hand">Hand</option>
//             <option value="Leg">Leg</option>
//           </select>

//           <div className={css.searchInputCont}>
//             <input
//               type="text"
//               placeholder="Search medicine"
//               className={css.searchInput}
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <img src={searchIcon} alt="" className={css.inputSearchIcon} />
//           </div>
//         </div>

//         <button className={css.filterBtn} onClick={handleFilterClick}>
//           <img src={filterIcon} alt="" className={css.filterBtnIcon} />
//           Filter
//         </button>
//       </div>

//       <ul className={css.productsList}>
//         {products.length > 0 ? (
//           products.map((product) => (
//             <li key={product._id} className={css.listItem}>
//               <div
//                 className={css.productImage}
//                 style={{ backgroundImage: `url(${product.photo})` }}
//               ></div>
//               <div className={css.mainInfoCont}>
//                 <div className={css.infoCont}>
//                   <div className={css.descriptionCont}>
//                     <h3>{product.name}</h3>
//                     <p>{product.suppliers}</p>
//                   </div>
//                   <p className={css.price}>৳{product.price}</p>
//                 </div>
//                 <div className={css.functionalCont}>
//                   <button className={css.addBtn}>Add to cart</button>
//                   <Link
//                     to={`/product/${product._id}`}
//                     className={css.detailsLink}
//                   >
//                     Details
//                   </Link>
//                 </div>
//               </div>
//             </li>
//           ))
//         ) : (
//           <p className={css.noResults}>No products found</p>
//         )}
//       </ul>

//       {/* Блок пагинации */}
//       <div className={css.paginationCont}>
//         <button
//           className={css.paginationBtn}
//           onClick={handlePreviousPage}
//           disabled={page === 1}
//         >
//           Previous Page
//         </button>

//         <span className={css.pageNumber}>Page {page}</span>

//         <button
//           className={css.paginationBtn}
//           onClick={handleNextPage}
//           disabled={!hasMore}
//         >
//           Next Page
//         </button>
//       </div>
//     </section>
//   );
// };

// export default MedicinePage;

// import css from "./MedicinePage.module.css";
// import searchIcon from "../../images/search.svg";
// import filterIcon from "../../images/filter.svg";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { getProducts } from "../../redux/products/operation";
// import {
//   productsSelector,
//   totalProductsSelector,
// } from "../../redux/products/selector";
// import { AppDispatch } from "../../redux/store";
// import toast from "react-hot-toast";

// const MedicinePage = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [category, setCategory] = useState("");
//   const [page, setPage] = useState(1);
//   const limit = 12; // Количество товаров на странице

//   const products = useSelector(productsSelector) || [];
//   const totalProducts = useSelector(totalProductsSelector) || 0;

//   useEffect(() => {
//     dispatch(
//       getProducts({
//         name: searchTerm.trim() || undefined,
//         category: category || undefined,
//         page,
//         limit,
//       })
//     );
//   }, [dispatch, category, page]); // Следит за изменением категории или страницы

//   const handleFilterClick = () => {
//     setPage(1); // Сбрасываем страницу на первую при новом поиске
//     dispatch(
//       getProducts({
//         name: searchTerm.trim() || undefined,
//         category: category || undefined,
//         page: 1,
//         limit,
//       })
//     )
//       .unwrap()
//       .catch(() => toast.error("There are no products with this name!"));
//   };

//   return (
//     <section className={css.mainSection}>
//       <h2 className={css.pageTitle}>Medicine</h2>
//       <div className={css.filterMainCont}>
//         <div className={css.filterInputs}>
//           <select
//             className={css.filterSelect}
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="">All Categories</option>
//             <option value="Medicine">Medicine</option>
//             <option value="Heart">Heart</option>
//             <option value="Head">Head</option>
//             <option value="Hand">Hand</option>
//             <option value="Leg">Leg</option>
//           </select>

//           <div className={css.searchInputCont}>
//             <input
//               type="text"
//               placeholder="Search medicine"
//               className={css.searchInput}
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <img src={searchIcon} alt="" className={css.inputSearchIcon} />
//           </div>
//         </div>

//         <button className={css.filterBtn} onClick={handleFilterClick}>
//           <img src={filterIcon} alt="" className={css.filterBtnIcon} />
//           Filter
//         </button>
//       </div>

//       <ul className={css.productsList}>
//         {products.length > 0 ? (
//           products.map((product) => (
//             <li key={product._id} className={css.listItem}>
//               <div
//                 className={css.productImage}
//                 style={{ backgroundImage: `url(${product.photo})` }}
//               ></div>
//               <div className={css.mainInfoCont}>
//                 <div className={css.infoCont}>
//                   <div className={css.descriptionCont}>
//                     <h3>{product.name}</h3>
//                     <p>{product.suppliers}</p>
//                   </div>
//                   <p className={css.price}>৳{product.price}</p>
//                 </div>
//                 <div className={css.functionalCont}>
//                   <button className={css.addBtn}>Add to cart</button>
//                   <Link
//                     to={`/product/${product._id}`}
//                     className={css.detailsLink}
//                   >
//                     Details
//                   </Link>
//                 </div>
//               </div>
//             </li>
//           ))
//         ) : (
//           <p className={css.noResults}>No products found</p>
//         )}
//       </ul>

//       {/* Пагинация */}
//       {totalProducts > limit && (
//         <div className={css.pagination}>
//           <button
//             className={css.paginationBtn}
//             onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//             disabled={page === 1}
//           >
//             Previous Page
//           </button>
//           <span className={css.pageNumber}>
//             Page {page} of {Math.ceil(totalProducts / limit)}
//           </span>
//           <button
//             className={css.paginationBtn}
//             onClick={() => setPage((prev) => prev + 1)}
//             disabled={page * limit >= totalProducts}
//           >
//             Next Page
//           </button>
//         </div>
//       )}
//     </section>
//   );
// };

// export default MedicinePage;

import css from "./MedicinePage.module.css";
import searchIcon from "../../images/search.svg";
import filterIcon from "../../images/filter.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProducts } from "../../redux/products/operation";
import {
  productsSelector,
  totalProductsSelector,
} from "../../redux/products/selector";
import { AppDispatch } from "../../redux/store";
import toast from "react-hot-toast";

const MedicinePage = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Состояния для фильтрации и пагинации
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const limit = 12; // Количество товаров на одной странице

  // Получаем данные из Redux
  const products = useSelector(productsSelector) || [];
  const totalProducts = useSelector(totalProductsSelector) || 0;
  const totalPages = Math.ceil(totalProducts / limit); // Общее количество страниц

  useEffect(() => {
    // Загружаем продукты при изменении категории или страницы
    dispatch(
      getProducts({
        name: searchTerm.trim() || undefined,
        category: category || undefined,
        page,
        limit,
      })
    )
      .unwrap()
      .catch(() => toast.error("Failed to load products!"));
  }, [dispatch, category, page]);

  const handleFilterClick = () => {
    setPage(1); // Сбрасываем на первую страницу при новом поиске
    dispatch(
      getProducts({
        name: searchTerm.trim() || undefined,
        category: category || undefined,
        page: 1,
        limit,
      })
    )
      .unwrap()
      .catch(() => toast.error("There are no products with this name!"));
  };

  return (
    <section className={css.mainSection}>
      <h2 className={css.pageTitle}>Medicine</h2>

      {/* Фильтры */}
      <div className={css.filterMainCont}>
        <div className={css.filterInputs}>
          {/* Фильтр по категории */}
          <select
            className={css.filterSelect}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Medicine">Medicine</option>
            <option value="Heart">Heart</option>
            <option value="Head">Head</option>
            <option value="Hand">Hand</option>
            <option value="Leg">Leg</option>
          </select>

          {/* Поиск по названию */}
          <div className={css.searchInputCont}>
            <input
              type="text"
              placeholder="Search medicine"
              className={css.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img src={searchIcon} alt="" className={css.inputSearchIcon} />
          </div>
        </div>

        {/* Кнопка запуска поиска */}
        <button className={css.filterBtn} onClick={handleFilterClick}>
          <img src={filterIcon} alt="" className={css.filterBtnIcon} />
          Filter
        </button>
      </div>

      {/* Список продуктов */}
      <ul className={css.productsList}>
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product._id} className={css.listItem}>
              <div
                className={css.productImage}
                style={{ backgroundImage: `url(${product.photo})` }}
              ></div>
              <div className={css.mainInfoCont}>
                <div className={css.infoCont}>
                  <div className={css.descriptionCont}>
                    <h3>{product.name}</h3>
                    <p>{product.suppliers}</p>
                  </div>
                  <p className={css.price}>৳{product.price}</p>
                </div>
                <div className={css.functionalCont}>
                  <button className={css.addBtn}>Add to cart</button>
                  <Link
                    to={`/product/${product._id}`}
                    className={css.detailsLink}
                  >
                    Details
                  </Link>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className={css.noResults}>No products found</p>
        )}
      </ul>

      {/* Блок пагинации */}
      {totalProducts > limit && (
        <div className={css.pagination}>
          <button
            className={css.paginationBtn}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous Page
          </button>

          <span className={css.pageNumber}>
            Page {page} of {totalPages}
          </span>

          <button
            className={css.paginationBtn}
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page >= totalPages}
          >
            Next Page
          </button>
        </div>
      )}
    </section>
  );
};

export default MedicinePage;
