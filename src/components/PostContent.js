import React from 'react';
import { Row, Col } from 'reactstrap';
import formatDate from '../utils/dates';

const PostContent = ({ post }) => {
  return(
    <Row style={{ maxWidth: '100%' }}>
      <Col sm="12" md={{ size: 6, offset: 3 }}>
      <Row>
        <Col>
          <h2>{post.title}</h2>
        </Col>
      </Row>
      <Row style={{marginBottom: '10px'}}>
        <Col>
          <div className="formattedDate">
              <time>{formatDate(post.date)}</time> ago
            </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <p dangerouslySetInnerHTML={{ __html: post.content }} />
        </Col>
      </Row>
      </Col>
    </Row>
  )
};

export default PostContent;

