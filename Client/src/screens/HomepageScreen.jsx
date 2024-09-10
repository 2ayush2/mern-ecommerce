import { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to import axios
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product'; // Ensure this path is correct

const HomepageScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products'); // Ensure this endpoint matches the backend route
        console.log(data)
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-home">
      <Container>
        <Row>
          {products.map((product) => (
            <Col key={product._id} md={4}>
              <Product product={product} /> {/* Ensure Product component is correctly set up */}
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default HomepageScreen;
