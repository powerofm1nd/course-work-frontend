import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container className='p-0'>
                <Navbar.Brand href="/">BlackoutStore</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link 
                        href="/" 
                        className={isActive('/') ? 'active' : ''}
                    >
                        Головна сторінка
                    </Nav.Link>
                    <Nav.Link 
                        href="/MyOrders" 
                        className={isActive('/MyOrders') ? 'active' : ''}
                    >
                        Мої замовлення
                    </Nav.Link>
                    <Nav.Link 
                        href="/AboutUs" 
                        className={isActive('/AboutUs') ? 'active' : ''}
                    >
                        Про нас
                    </Nav.Link>
                    <Nav.Link 
                        href="/AddProduct" 
                        className={isActive('/AddProduct') ? 'active' : ''}
                    >
                        Додати товар
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Button variant="light" className='m-1'>Login</Button>
                    <Button variant="danger" className='m-1'>Logout</Button>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;