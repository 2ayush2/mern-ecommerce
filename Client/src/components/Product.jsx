import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Rating from './Rating';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <Card>
      <Link to={`/product/${product._id}`} >
      <Card.Img variant="top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{product.brand}</Card.Subtitle>
        <Card.Text>
          {product.description}
        </Card.Text>
        <Card.Text>
          <strong>Price: ${product.price.toFixed(2)}</strong>
        </Card.Text>
        <Card.Text>
<Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </Card.Text>
        <Button variant="primary">Add to Cart</Button>
      </Card.Body>

      
    </Card>
  );
};

export default Product;
