/* eslint-disable */

import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({cat, filters, sort}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
     const getProducts = async () => {
       try {
        const res = await axios.get(cat ? `http://localhost:5004/api/products?category=${cat}` : 'http://localhost:5004/api/products?category=woman');
         setProducts(res.data);
       } catch (error) {
         console.log(error);
       }
     };
      getProducts();
  }, [cat]);

  useEffect(() => {
    cat && setFilteredProducts(
      products.filter(item=> Object.entries(filters).every(([key, value]) => item[key].includes(value)))
    );

  }, [ products, cat, filters]);

  useEffect(() => {
    if((sort === 'newest')) {
      setFilteredProducts([...filteredProducts].sort((a, b) => b.createdAt - a.createdAt));
    } else if(sort === 'asc') {
      setFilteredProducts([...filteredProducts].sort((a, b) => a.price - b.price));
    } else{
      setFilteredProducts([...filteredProducts].sort((a, b) => b.price - a.price));
    }
  }, [ sort]);

  return (
    <Container>
      {cat ? filteredProducts.map((item) => (
        <Product item={item} key={item.id} />
      )): products.slice(0,8).map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;