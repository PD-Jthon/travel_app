import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { SearchQuery } from "../Atom/SeachQuery";

export default function BasicPagination({ pagination, setPagination }) {
  const [page, setPage] = useState({});
  const [query, setQuery] = useRecoilState(SearchQuery);

  // let count = 0;
  // let current = 0;
  // if (pagination ? pagination.count : null) {
  //   count = pagination.count;
  //   current = pagination.current;
  // } else {
  //   count = 0;
  // }

  useEffect(() => {
    if (pagination) {
      console.log("pagination", pagination);
      setPage({
        // current: pagination.current,
        count: pagination.final,
        next: pagination.next,
        prev: pagination.previous,
      });
    }
  }, [pagination]);

  const handlePageChange = (e, page) => {
    console.log("handlePageChange", page);
    // console.log(page);
    // console.log(e.target.textContent);
    const newPage = page;
    setPage((prev) => ({ ...prev, current: newPage }));
    const tempWord = sessionStorage.getItem("searchWord");
    const price = sessionStorage.getItem("price");
    let searchWord = "";
    if (tempWord === "undefined") {
      searchWord = undefined;
    } else {
      searchWord = JSON.parse(sessionStorage.getItem("searchWord"));
    }

    if (price) {
      // const newUrl = `http://localhost:8000/top/search-price/${price}`;
      const newUrl = `${process.env.REACT_APP_BASE_URL}/top/search-price/${price}`;
      axios({
        url: newUrl,
        method: "GET",
      })
        .then((res) => {
          console.log(res);
          setQuery(res.data.results);
          setPagination(res.data.page_status);
          const page_status = res.data.page_status;
          console.log("page_status", page_status);
          setPage((prev) => ({
            ...prev,
            count: page_status.final,
            next: page_status.next,
            prev: page_status.previous,
          }));
        })
        .catch((error) => console.log(error));
    } else if (searchWord || searchWord === undefined) {
      // const newUrl = `http://localhost:8000/top/search-word/${searchWord}?page=${newPage}`;
      const newUrl = `${process.env.REACT_APP_BASE_URL}/top/search-word/${searchWord}?page=${newPage}`;
      axios({
        url: newUrl,
        method: "GET",
      })
        .then((res) => {
          console.log(res);
          setQuery(res.data.results);
          setPagination(res.data.page_status);
          const page_status = res.data.page_status;
          console.log("page_status", page_status);
          setPage((prev) => ({
            ...prev,
            count: page_status.final,
            next: page_status.next,
            prev: page_status.previous,
          }));
        })
        .catch((error) => console.log(error));
    }
  };

  console.log(page);

  return (
    <>
      <Stack spacing={2}>
        <Pagination
          onChange={(e, page) => handlePageChange(e, page)}
          page={page.current}
          count={page.count}
          color="primary"
        />
      </Stack>
    </>
  );
}
