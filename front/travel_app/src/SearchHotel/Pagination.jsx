// import React, { useEffect, useState } from "react";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
// import axios from "axios";
// import { useRecoilState } from "recoil";
// import { SearchQuery } from "../Atom/SeachQuery";

// export default function BasicPagination({ pagination, setPagination }) {
//   const [page, setPage] = useState({});
//   const [query, setQuery] = useRecoilState(SearchQuery);

//   useEffect(() => {
//     if (pagination) {
//       setPage({
//         count: pagination.final,
//         next: pagination.next,
//         prev: pagination.previous,
//       });
//     }
//   }, [pagination]);

//   const handlePageChange = (e, page) => {
//     const newPage = page;
//     setPage((prev) => ({ ...prev, current: newPage }));
//     const tempWord = sessionStorage.getItem("searchWord");
//     const price = sessionStorage.getItem("price");
//     let searchWord = "";
//     if (tempWord === "undefined") {
//       searchWord = undefined;
//     } else {
//       searchWord = JSON.parse(sessionStorage.getItem("searchWord"));
//     }

//     if (price) {
//       const newUrl = `${process.env.REACT_APP_BASE_URL}/top/search-price/${price}`;
//       axios({
//         url: newUrl,
//         method: "GET",
//       })
//         .then((res) => {
//           console.log(res.data.results)
//           setQuery(res.data.results);
//           sessionStorage.setItem(
//             "searchResult",
//             JSON.stringify(res.data.results)
//           );
//           setPagination(res.data.page_status);
//           const page_status = res.data.page_status;
//           setPage((prev) => ({
//             ...prev,
//             count: page_status.final,
//             next: page_status.next,
//             prev: page_status.previous,
//           }));
//         })
//         .catch((error) => console.log(error));
//     } else if (searchWord || searchWord === undefined) {
//       const newUrl = `${process.env.REACT_APP_BASE_URL}/top/search-word/${searchWord}?page=${newPage}`;
//       axios({
//         url: newUrl,
//         method: "GET",
//       })
//         .then((res) => {
//           setQuery(res.data.results);
//           sessionStorage.setItem(
//             "searchResult",
//             JSON.stringify(res.data.results)
//           );
//           setPagination(res.data.page_status);
//           const page_status = res.data.page_status;
//           setPage((prev) => ({
//             ...prev,
//             count: page_status.final,
//             next: page_status.next,
//             prev: page_status.previous,
//           }));
//         })
//         .catch((error) => console.log(error));
//     }
//   };

//   return (
//     <>
//       <Stack spacing={2}>
//         <Pagination
//           onChange={(e, page) => handlePageChange(e, page)}
//           page={page.current}
//           count={page.count}
//           color="primary"
//         />
//       </Stack>
//     </>
//   );
// }
