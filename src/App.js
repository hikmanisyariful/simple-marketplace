import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProduct } from "./store/actions/products";

// Material UI
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

// Components
import Product from "./components/Product";

export default function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    if (!products.data) {
      dispatch(fetchAllProduct());
    }
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Header>Evenelia</Header>
      </Grid>
      <Grid xs={12} style={{ display: "flex", justifyContent: "center", marginRight: "50px", marginTop: "50px" }}>
        <TextField id="outlined-basic" label="Search" variant="outlined" size="small" style={{ marginRight: "5px" }} />
        <Button variant="contained" size="medium" disabled={products.data ? false : true}>
          Search
        </Button>
      </Grid>
      <Grid xs={12} spacing={2} style={{ display: "flex", justifyContent: "center" }}>
        {products.data ? (
          <Grid container spacing={4} style={{ margin: "30px" }}>
            {products.data.map((item, index) => {
              return (
                <Grid xs={12} sm={6} md={4} lg={3} key={index}>
                  <Product key={index} item={item} />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <div style={{ paddingTop: "120px" }}>
            <CircularProgress />
          </div>
        )}
      </Grid>
    </Grid>
  );
}

const Header = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "37px",
  fontSize: "24px",
}));
