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
        <Col xs={6} md={3}>
        <div className='d-flex flex-column border-end mt-2'>
        <div className='mt-5'>
        <TodoList/>
        </div>
        <div>
        <p className='p-4'>+ Criar nova categoria</p>
        </div>
        </div>
        
        </Col>
      </Row>
    </Container>
    </>
  );
}