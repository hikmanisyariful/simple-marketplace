import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProduct } from "./store/actions/products";
import { resetDataSearch } from "./store/reducers/products";

// Material UI
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import CircularProgress from "@mui/material/CircularProgress";

// Components
import Products from "./components/Products";
import Search from "./components/Search";

export default function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    if (!products.data) {
      dispatch(fetchAllProduct());
    }
  }, []);

  useEffect(() => {
    if (!products.valueSearch) {
      dispatch(resetDataSearch());
    }
  }, [products.valueSearch, dispatch]);

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Header>Evenelia</Header>
      </Grid>
      <Grid xs={12} style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <Search />
      </Grid>
      {products.loading ? (
        <Grid xs={12} spacing={2} style={{ display: "flex", justifyContent: "center", paddingTop: "120px" }}>
          <CircularProgress />
        </Grid>
      ) : (
        <Products />
      )}
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
