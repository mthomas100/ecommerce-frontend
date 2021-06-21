// example grid layout component
import { Box, Heading } from 'rebass/styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { withSize } from 'react-sizeme';
import styled from 'styled-components';
import Product from './Product';
import { useSize } from '../lib/sizeState';
import Categories from './Categories';

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    products {
      id
      title
      description
      image {
        url
      }
      price
      slug
    }
  }
`;

const ProductsStyles = styled.div`
  display: grid;
  grid-gap: 3; // theme.space[3]
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  margin: 0 auto;
`;

function Products({ size }) {
  const { setProductSize, windowSize } = useSize();

  useEffect(() => {
    setProductSize(size);
    return () => {};
  }, [windowSize]);

  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Categories />
      <ProductsStyles>
        {data.products.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </ProductsStyles>
    </>
  );
}

export default withSize()(Products);
