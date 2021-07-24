// example grid layout component
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import Products from './Products';
import Loading from './Loading';

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

const ShopContainerStyles = styled.div`
  display: flex;
  flex-direction: row;
  /* height: 100%; */
  margin: 0 auto;
`;

function Shop() {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);
  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {/* <TopStyles /> */}
      <ShopContainerStyles>
        <Sidebar />
        <Products products={data.products} />
      </ShopContainerStyles>
    </>
  );
}

export default Shop;
