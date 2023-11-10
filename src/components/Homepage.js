import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useInfiniteQuery } from "react-query";
import { CustomTable } from "./CustomUIComponents/CustomTable";

// Infinte query to load more items on button click

export const Homepage = () => {
  const totalRecords = 6;
  const totalPages = totalRecords / 2;
  const [pageNumber, setPageNumber] = useState(1);
  const [columns , setColumns] = useState();
  const headers = ["Item", "Cost"];

  const fetchItems = ({ pageParam = 1 }) => {
    setPageNumber(pageParam);
    return axios.get(`http://localhost:4000/items?_limit=2&_page=${pageParam}`);
  };

  const {
    data: items,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(["items"], fetchItems, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < totalPages) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  console.log("pageNo", pageNumber)

  const getItemList = (group) => {
    const columns = group?.data.map((item) => {
      return (
        <tr key={item.id}>
          <th>{item.itemName}</th>
          <th>{item.cost}</th>
        </tr>
      );
    });
    return <CustomTable headers={headers} columns={columns} />;
  };

  return (
    <div>
      <h1>Items</h1>
      {isFetching && !isFetchingNextPage ? "Fetching..." : null}
      {console.log("items", items)}
      {items?.pages.map((group, i) => {
        return getItemList(group);
      })}
      <Button size="sm" disabled={!hasNextPage} onClick={fetchNextPage}>
        Load More
      </Button>
    </div>
  );
};
