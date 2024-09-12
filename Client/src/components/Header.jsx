import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { UserContext } from '../context/userContext';
import { useContext } from 'react';
import axios from 'axios';

function BasicExample() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      setUser(null);
      navigate('/'); // Redirect to home or login page after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Navbar bg="dark" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user ? (
              <>
               <span
                onClick={handleLogout}
                className="px-lg-4 py-2 cursor-pointer"
              >
                Logout
              </span>
              <span
                
                className="px-lg-4 py-2 cursor-pointer"
              >
                {user.role}
              </span></>
             
            ) : (
              <Link to='/login' className="px-lg-4 py-2 ">
                Login
              </Link>
            )}

            <Link to="/register" className="px-lg-4 py-2 text-white">
              Register
            </Link>

            <NavDropdown title="Dropdown" id="basic-nav-dropdown" className="px-lg-4 py-2 text-white">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
