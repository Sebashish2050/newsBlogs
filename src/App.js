import React from 'react';
import { Container, Row } from 'reactstrap';

import Content from './pages';
import Header from './components/Header';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Container fluid={true} style={{ marginTop: "20px" }}>
        <Row>
          <Content />
        </Row>
      </Container>
    </div>
  );
}

export default App;
