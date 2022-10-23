import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import XMLParser from "react-xml-parser";
import { convertProducts, convertProduct } from "../../utils/manipulationJson";

export const fetchAllProduct = createAsyncThunk("products/fetchAllProducts", async () => {
  const getAllProducts = await axios.get(`http://api.elevenia.co.id/rest/prodservices/product/listing?page=1`, {
    headers: {
      "Content-Type": "application/xml",
      openapikey: process.env.REACT_APP_API_KEY,
    },
  });
  const productsXlm = new XMLParser().parseFromString(getAllProducts.data);
  const { products } = convertProducts(productsXlm);
  const prdNoAllProducts = products.map((item) => item.prdNo);

  const detailProductPromises = prdNoAllProducts.map((prdNo) => {
    return getDetailProduct(prdNo);
  });

  const getDetailAllProducts = await Promise.all(detailProductPromises);
  const response = getDetailAllProducts.map((item) => {
    return {
      name: item.prdNm,
      sku: item.sellerPrdCd,
      image: item.prdImage01,
      price: item.selPrc,
      description: item.htmlDetail,
    };
  });

  return response;
});

const getDetailProduct = async (prdNo) => {
  const response = await axios.get(`http://api.elevenia.co.id/rest/prodservices/product/details/${prdNo}`, {
    headers: {
      "Content-Type": "application/xml",
      openapikey: process.env.REACT_APP_API_KEY,
    },
  });
  const xml = new XMLParser().parseFromString(response.data);
  const { product } = convertProduct(xml);
  return product;
};
