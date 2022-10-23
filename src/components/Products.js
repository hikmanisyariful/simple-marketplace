import React from "react";
import { useSelector } from "react-redux";
import Product from "./Product";

import Grid from "@mui/material/Unstable_Grid2";

export default function Products() {
  const products = useSelector((state) => state.products);

  return (
    <Grid xs={12} spacing={2} style={{ display: "flex", justifyContent: "center" }}>
      {products.dataSearch ? (
        <Grid
          container
          spacing={4}
          style={{ margin: "30px", width: "100%", display: "flex", justifyContent: "center" }}
        >
          {products.dataSearch.length > 0 ? (
            <>
              {products.dataSearch.map((item, index) => {
                return (
                  <Grid xs={12} sm={6} md={4} lg={3} key={index}>
                    <Product item={item} />
                  </Grid>
                );
              })}
            </>
          ) : (
            <h3>Not Found</h3>
          )}
        </Grid>
      ) : (
        <Grid container spacing={4} style={{ margin: "30px" }}>
          {products.data &&
            products.data.map((item, index) => {
              return (
                <Grid xs={12} sm={6} md={4} lg={3} key={index}>
                  <Product item={item} />
                </Grid>
              );
            })}
        </Grid>
      )}
    </Grid>
  );
}
