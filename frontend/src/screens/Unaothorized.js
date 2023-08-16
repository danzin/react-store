import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import Message from '../components/Message';

const Unauthorized = () => {
  return (
    <div>
      <Helmet>
        <title>Unauthorized</title>
      </Helmet>
      <Row>
        <Col md={12}>
          <Message variant="danger">
            You have no permission to view this page.
          </Message>
        </Col>
      </Row>
    </div>
  );
};

export default Unauthorized;
