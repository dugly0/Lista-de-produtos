import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from './navbar'
import '../index.css'
import TodoList from './AddCat';

export default function Categorias() {
  return (
    <>
    <Navbar/>
    <Container fluid>
      <Row >
        <Col xs={4} md={2} className='border-end'>
        <div className='d-flex'>
        <div className='mt-5'>
        <h4>Categorias</h4>
        <TodoList />
        </div>
        </div>
        
        </Col>
      </Row>
    </Container>
    </>
  );
}