// import { useEffect, useState } from "react";
// import "./App.css";

// function App() {
//   const [products, setProducts] = useState([]);
//   const [page, setPage] = useState(1);

//   const fetchData = () => {
//     fetch("https://dummyjson.com/products")
//       .then((res) => res.json())
//       .then((data) => {
//         if (data && data.products) {
//           setProducts(data.products);
//           console.log(products);
//         }
//       });
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleClick = (selectedPage) => {
//     if(selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== page)
//     setPage(selectedPage);
//   };

//   return (
//     <div>
//       {products.length > 0 && (
//         <div className="main">
//           {products.slice(page * 10 - 10, page * 10).map((product) => {
//             return (
//               <div className="single__product" key={product.id}>
//                 <img src={product.thumbnail} alt={product.title} />
//                 <div>
//                   <strong>{product.title}</strong>
//                 </div>
//                 <li>{product.brand}</li>
//               </div>
//             );
//           })}
//         </div>
//       )}
//       {products.length > 0 && (
//         <div className="pagination">
//           <span onClick={() => handleClick(page - 1)}
//           className={page > 1 ? "" : "disabled"}
//           >⬅️</span>
//           {[...Array(totalPages)].map((_, i) => {
//             return (
//               <span
//                 onClick={() => handleClick(i + 1)}
//                 key={i}
//                 className={page === i + 1 ? "selected" : ""}
//               >
//                 {i + 1}
//               </span>
//             );
//           })}
//           <span onClick={() => handleClick(page + 1)}
//                     className={page < totalPages ? "" : "disabled"}

//           >➡️</span>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

// ---------------------------------------------Backend Driven ---------------------------------------------------------

//this is to improve performance for load only current page data

import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = () => {
    fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.products) {
          setProducts(data.products);
          setTotalPages(data.total / 10);
          console.log(data);
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleClick = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

  return (
    <div>
      {products.length > 0 && (
        <div className="main">
          {products.map((product) => {
            return (
              <div className="single__product" key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <div>
                  <strong>{product.title}</strong>
                </div>
                <li>{product.brand}</li>
              </div>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => handleClick(page - 1)}
            className={page > 1 ? "" : "disabled"}
          >
            ⬅️
          </span>
          {[...Array(totalPages)].map((_, i) => {
            return (
              <span
                onClick={() => handleClick(i + 1)}
                key={i}
                className={page === i + 1 ? "selected" : ""}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            onClick={() => handleClick(page + 1)}
            className={page < totalPages ? "" : "disabled"}
          >
            ➡️
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
