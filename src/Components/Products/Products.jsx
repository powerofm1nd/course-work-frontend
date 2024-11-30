import { useSelector } from "react-redux";
import Container from 'react-bootstrap/Container';

const Products = () => 
{
    const {currentCategory} = useSelector((state) => state.productCategory)

    return (
        <Container >
            <h1 id="productsHeadline" className="mt-4 mb-4">{currentCategory?.name}</h1>
        </Container>
    );
};

export default Products;