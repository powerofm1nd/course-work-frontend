import { useParams } from "react-router-dom";
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../redux/action/ProductAction';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { Form, InputGroup } from "react-bootstrap";
import { fetchProductCategories } from '../../redux/action/ProductCategoryAction';


const ProductPage = () => {

    const { id } = useParams();
    const { currentProduct } = useSelector((state) => state.product);
    const { categories } = useSelector((state) => state.productCategory);
    const [ productCategoryName, setProductCategoryName] = useState(null);
    const dispatch = useDispatch();

    //Завантажуємо поточний продукт за id та перелік категорій
    useEffect(() => {
        dispatch(getProduct(id));
        dispatch(fetchProductCategories());
    }, [dispatch]);

    useEffect(() => {
        if (categories && currentProduct) {
            const category = categories.find(x => x.id === currentProduct.productCategoryId);
            setProductCategoryName(category?.name || "Unknown Category");
            document.title = currentProduct?.name + " | " + currentProduct?.price + "грн";
        }
    }, [categories, currentProduct]);
    

    return (
        <Container>
            {<h1>{currentProduct?.name}</h1>}
            <Row>
                <Col md={4}>
                    <Image src={currentProduct?.mainImage} className="w-100" rounded />
                    <Container className="p-0 mt-1">
                        <Row>
                            <Form className="w-100">
                                <InputGroup>
                                    <Button variant="outline-secondary">-</Button>
                                    <Form.Control
                                        type="number"
                                        value={0}
                                        style={{ textAlign: "center" }}
                                    />
                                    <Button variant="outline-secondary">+</Button>
                                </InputGroup>
                            </Form>
                        </Row>
                    </Container>
                    <Button className="w-100 mt-1">Замовити</Button>
                    <Button className="w-100 mt-1" variant="warning">Редагувати</Button>
                    <Button className="w-100 mt-1" variant="danger">Видалити</Button>
                </Col>
                <Col md={8}>
                    <p style={{ textAlign: 'justify' }}>{currentProduct?.fullDescription}</p>
                    <p>Категорія: {productCategoryName} | Ціна: {currentProduct?.price} грн.</p>
                </Col>
            </Row>
        </Container>
    );
}

export default ProductPage;