import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { searchProducts, setValueSearch } from "../store/reducers/products";

export default function Search() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const handleOnChange = (e) => {
    dispatch(setValueSearch(e.target.value));
  };

  const handleOnClick = () => {
    console.log(products.valueSearch);
    dispatch(searchProducts(products.valueSearch));
  };

  return (
    <>
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        size="small"
        style={{ marginRight: "5px" }}
        value={products.valueSearch}
        onChange={handleOnChange}
      />
      <Button variant="contained" size="medium" disabled={products.data ? false : true} onClick={handleOnClick}>
        Search
      </Button>
    </>
  );
}
