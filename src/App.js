import './App.css';
import Header from './Components/Header/Header.jsx';
import Container from 'react-bootstrap/Container';
import SimpleExample from './SimpleExample.jsx';
import ProductCategories from './Components/ProductCategories/ProductCategories.jsx';
import Products from './Components/Products/Products.jsx';
import AddProduct from './Components/AddProduct/AddProduct.jsx';
import { Routes, Route } from "react-router";
import ProductPage from './Components/Products/ProductPage.jsx';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route index element={
          <>
            <ProductCategories/>
            <Products/>
            <Container>
              <SimpleExample/>
            </Container>
          </>
        }/>
        <Route path="/AddProduct" element={<AddProduct />}/>
        <Route path="/Product/:id" element={<ProductPage/>}/>
      </Routes>
    </>
  );
}

export default App;
