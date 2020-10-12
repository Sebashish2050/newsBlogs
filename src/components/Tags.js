import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Row, Nav, NavItem, NavLink } from 'reactstrap';

const Tags = () => {
  const {
    activePage,
    blogs
  } = useSelector(
    ({
      blogReducer: {
        activePage,
        blogs,
      }
    }) => ({
      activePage,
      blogs
    }),
  );

  const getTags = () => {
    const currentPosts = blogs[`page_${activePage}`];
    if(currentPosts && Array.isArray(currentPosts)) {
      const tags = [];
      currentPosts.forEach(post => {
        for(const key in post.tags) {
          if(tags.indexOf(key) === -1) {
            tags.push(key);
          }
        }
      });

      return (
        tags.length > 0 ?
          tags.map((tag, index) => (
            <NavItem key={`tags_${index}`}>
              <NavLink href="#">{tag}</NavLink>
            </NavItem>
          )): 
          (
            <p className="contentText">No tags found</p>
          )
      )
    } else {
      return (<p className="contentText">Fetching tags...</p>);
    }
  }

  return (
    <Col className="navigationGrid" sm="12">
        <Row>
          <Col>
            <h6>Tags</h6>
          </Col>
        </Row>
        <Nav vertical>
          {getTags()}
        </Nav>
    </Col>    
  )
}

export default Tags;
