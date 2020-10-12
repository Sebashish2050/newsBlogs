import React from 'react';
import { Col, Row } from 'reactstrap';
import RelatedPosts from './RelatedPosts';
import Categories from './Categories';
import Tags from './Tags';

const AsideDetails = ({ isDetailedPage }) => {
  
  return (
    <Col  className="navigation" sm="4">
      <aside>
        {isDetailedPage && (
          <Row >
          <Col>
            <RelatedPosts />
          </Col>
        </Row>
        )}
        <Row>
          <Col>
            <Categories />
          </Col>
        </Row>
        <Row >
          <Col>
            <Tags />
          </Col>
        </Row>
      </aside>
    </Col>  
  );
}

export default AsideDetails;
