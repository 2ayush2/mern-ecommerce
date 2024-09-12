import { useContext } from 'react';
import { ProductContext } from '../context/productContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";
import Rating from '../components/Rating';



function InnerPage() {
    const {products}=useContext(ProductContext);
    console.log('Products:', products);


    
    
    const { id: productId } = useParams();
    console.log('Product ID from Params:', productId);
    const product = products.find((p) => p._id === productId);

    return (  
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={product.image} alt={product.name} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    {product.description}
                </Card.Text>
                <Card.Text>
                    <strong>Brand:</strong> {product.brand}
                </Card.Text>
                <Card.Text>
                    <strong>Category:</strong> {product.category}
                </Card.Text>
                <Card.Text>
                    <strong>Price:</strong> ${product.price.toFixed(2)}
                </Card.Text>
                <Card.Text>
<Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </Card.Text>
                <Card.Text>
                    <p> {product.countInStock>0?'In Stock':'No Stock'} </p>
                </Card.Text>
                <Button className={product.countInStock===0?'btn btn-primary disabled':'btn btn-primary'} variant="primary">Add to Cart</Button>
            </Card.Body>
        </Card>
    );
}

export default InnerPage;
