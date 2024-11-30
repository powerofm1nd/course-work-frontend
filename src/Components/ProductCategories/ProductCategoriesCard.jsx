import { useDispatch } from "react-redux";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { setCurrentProductCategory } from '../../redux/action/ProductCategoryAction';

const ProductCategoriesCard = ({ category }) => {
  const dispatch = useDispatch();

  const scrollToHeadline = () => {
    const headlineElement = document.getElementById('productsHeadline');
    console.log("headlineElement - " + headlineElement)
    if (headlineElement) {
      headlineElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Card style={{ width: '17rem', margin: '5px', minWidth: '305px' }}>
      <Card.Img variant="top" src={"data:image/png;base64," + category.image} />
      <Card.Body>
        <Card.Title>{category.name}</Card.Title>
        <Card.Text style={{ textAlign: 'justify' }}>{category.description}</Card.Text>
        <Button
          variant="primary w-100"
          onClick={() => {
            dispatch(setCurrentProductCategory(category.id));
            scrollToHeadline();
          }}
        >
          Показати
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCategoriesCard;
