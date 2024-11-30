import React, { useEffect, useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { useDispatch,  useSelector} from 'react-redux';
import { fetchProductCategories } from '../../redux/action/ProductCategoryAction';
import { createProduct } from '../../redux/action/ProductAction';

const AddProduct = () => {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.productCategory);
    const { lastCreatedProduct } = useSelector((state) => state.product);

    //Завантажуємо категорії продуктів під час монтування компонента
    useEffect(() => {
        dispatch(fetchProductCategories());
    }, [dispatch]);

    useEffect(() => {
        console.log('useEffect lastCreatedProduct lastCreatedProduct lastCreatedProduct');
    }, [lastCreatedProduct]);


    // Стан для кожного поля форми
    const [product, setProduct] = useState({
        name: '',
        fullDescription: '',
        shortDescription: '',
        price: '',
        mainImage: '',
        productCategoryId: ''
    });

    // Обробник зміни значень у полях форми
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };

    // Обробник зміни для поля зображення
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Зберігаємо зображення як base64 строку
                setProduct((prevProduct) => ({
                    ...prevProduct,
                    mainImage: reader.result
                }));
            };
            reader.readAsDataURL(file); // Конвертуємо файл в base64
        }
    };

    // Обробник відправки форми
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createProduct(product)) //відправка на сервер
    };

    return (
        <Container>
            <h1 className='mt-3 mb-4'>Додати товар</h1>
            <Form onSubmit={handleSubmit}>
                {/* Поле Назва товару */}
                <Form.Group className="mb-3" controlId="formProductName">
                    <Form.Label>Назва товару:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Введіть назву товару"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                        maxLength={50}
                    />
                </Form.Group>

                {/* Поле Повний опис товару */}
                <Form.Group className="mb-3" controlId="formFullDescription">
                    <Form.Label>Повний опис товару:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Введіть повний опис товару"
                        name="fullDescription"
                        value={product.fullDescription}
                        onChange={handleChange}
                        required
                        maxLength={2000}
                    />
                </Form.Group>

                {/* Поле Короткий опис товару */}
                <Form.Group className="mb-3" controlId="formShortDescription">
                    <Form.Label>Короткий опис товару:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Введіть короткий опис товару"
                        name="shortDescription"
                        value={product.shortDescription}
                        onChange={handleChange}
                        required
                        maxLength={250}
                    />
                </Form.Group>

                {/* Поле Ціна товару */}
                <Form.Group className="mb-3" controlId="formPrice">
                    <Form.Label>Ціна товару:</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        placeholder="Введіть ціну товару"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Поле Зображення товару */}
                <Form.Group className="mb-3" controlId="formMainImage">
                    <Form.Label>Зображення товару:</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formProductCategoryId">
                    <Form.Label>Категорія товару:</Form.Label>
                    <Form.Select
                        name="productCategoryId" // Назва для полегшення роботи з handleChange
                        value={product.productCategoryId} // Зв'язуємо з поточним станом
                        onChange={handleChange} // Додаємо обробник змін
                        required
                    >
                        <option value="">Оберіть категорію</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                {/* Кнопка відправки форми */}
                <Button variant="primary" type="submit">
                    Додати товар
                </Button>
            </Form>
        </Container>
    );
}

export default AddProduct;