import { useParams } from "react-router-dom";
import { Container } from 'react-bootstrap';
import { useDispatch,  useSelector} from 'react-redux';
import { getProduct } from '../../redux/action/ProductAction';
import React, { useEffect } from 'react';

import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

const ProductPage = () => {
    const { id } = useParams();
    const { currentProduct } = useSelector((state) => state.product);

    const dispatch = useDispatch();
    
    //Завантажуємо поточний продукт за id
    useEffect(() => {
        dispatch(getProduct(id));
    }, [dispatch]);

    //Оновлюємо currentProduct
    useEffect(() => {
        console.log("Current product: ", currentProduct)
    }, [currentProduct]);

    return (
        <Container>
            {<h1>{ currentProduct.name }</h1>}
            <Row>
                <Col md={4}>
                    <Image src={currentProduct.mainImage} style={{ maxWidth: '300px'}} rounded />
                </Col>
                <Col  md={8}>
                    
                </Col>
            </Row>
        </Container>
    );
}

export default ProductPage;