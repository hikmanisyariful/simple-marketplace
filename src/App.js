import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProduct } from "./store/actions/products";

export default function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    if (!products.data) {
      dispatch(fetchAllProduct());
      console.log("i fire once");
    }
  }, []);

  return <div>{JSON.stringify(products)}</div>;
}
