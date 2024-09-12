import { useContext } from 'react';
import { ProductContext } from '../context/productContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product'; // Ensure this path is correct

const HomepageScreen = () => {

  const {products}=useContext(ProductContext);
  console.log("Home products",products)


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
