import React, { useEffect, useState } from "react";
import { Container, Card, ListGroup, Row, Col, Alert, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders, updateOrderStatus } from "../../redux/action/OrderAction";

// Функция для получения текста статуса
const getStatusText = (status) => {
    switch (status) {
        case 0:
            return "Виконано";
        case 1:
            return "В роботі";
        case 2:
            return "Скасовано";
        default:
            return "Невідомий статус";
    }
};

const ManageOrderPage = () => {
    const dispatch = useDispatch();
    const { orders = [], error } = useSelector((state) => state.order);
    const [selectedStatus, setSelectedStatus] = useState({}); // Для хранения выбранного статуса

    useEffect(() => {
        // Получаем все заказы при монтировании компонента
        dispatch(getAllOrders());
    }, [dispatch]);

    // Функция для обновления статуса
    const handleStatusChange = async (orderId, newStatus) => {
        // Убедимся, что newStatus всегда будет числом
        const statusValue = parseInt(newStatus, 10); // Преобразуем значение в число

        // Обновляем локальное состояние для выбранного статуса
        setSelectedStatus((prevState) => ({
            ...prevState,
            [orderId]: statusValue,
        }));

        // Отправляем новый статус на сервер
        try {
            console.log("statusValue", statusValue); // Добавим вывод значения
            await dispatch(updateOrderStatus(orderId, statusValue)); // Отправляем обновленный статус на сервер
        } catch (error) {
            console.error("Error updating order status:", error);
            // При ошибке можно вернуть статус назад (или показать ошибку)
            setSelectedStatus((prevState) => ({
                ...prevState,
                [orderId]: prevState[orderId] !== undefined ? prevState[orderId] : 0, // Восстановить предыдущий статус, если нужно
            }));
        }
    };

    return (
        <Container className="my-5">
            <h2 className="mb-4">Керування замовленнями</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {orders.length === 0 ? (
                <Alert variant="info">Немає замовлень</Alert>
            ) : (
                orders.map((order) => (
                    <Card key={order.id} className="mb-4">
                        <Card.Header>
                            <h5>Замовлення № {order.id}</h5>
                            <small>Користувач: {order.user.login} (ID: {order.user.id})</small>
                        </Card.Header>
                        <Card.Body>
                            <Row className="mb-3">
                                <Col>
                                    <strong>Статус:</strong> {getStatusText(order.status)}
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        as="select"
                                        value={selectedStatus[order.id] !== undefined ? selectedStatus[order.id] : order.status}
                                        onChange={(e) =>
                                            setSelectedStatus({
                                                ...selectedStatus,
                                                [order.id]: parseInt(e.target.value, 10), // Преобразуем значение в число
                                            })
                                        }
                                    >
                                        <option value={0}>Виконано</option>
                                        <option value={1}>В роботі</option>
                                        <option value={2}>Відмінено</option>
                                    </Form.Control>
                                </Col>
                                <Col md={2} className="text-end">
                                    <Button
                                        variant="primary"
                                        onClick={() =>
                                            handleStatusChange(order.id, selectedStatus[order.id]) // Используем именно выбранный статус
                                        }
                                    >
                                        Змінити статус
                                    </Button>
                                </Col>
                            </Row>
                            <ListGroup variant="flush">
                                {order.orderItems.map((item) => (
                                    <ListGroup.Item key={item.id}>
                                        <Row>
                                            <Col md={8}>
                                                <h6>{item.product.name}</h6>
                                                <small>Product ID: {item.product.id}</small>
                                            </Col>
                                            <Col md={2} className="text-center">
                                                Кількість: {item.productCount}
                                            </Col>
                                            <Col md={2} className="text-end">
                                                Ціна: {item.product.price.toLocaleString()} UAH
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                        <Card.Footer className="text-end">
                            <strong>
                                Загальна ціна:{" "}
                                {order.orderItems
                                    .reduce(
                                        (sum, item) =>
                                            sum + item.product.price * item.productCount,
                                        0
                                    )
                                    .toLocaleString()}{" "}
                                ГРН
                            </strong>
                        </Card.Footer>
                    </Card>
                ))
            )}
        </Container>
    );
};

export default ManageOrderPage;
