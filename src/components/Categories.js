import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Row, Nav, NavItem, NavLink } from 'reactstrap';

const Categories = () => {
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

  const getCategories = () => {
    const currentPosts = blogs[`page_${activePage}`];
    if(currentPosts && Array.isArray(currentPosts)) {
      const categories = [];
      currentPosts.forEach(post => {
        for(const key in post.categories) {
          if(categories.indexOf(key) === -1) {
            categories.push(key);
          }
        }
      });

      return (
        categories.length > 0 ?
          categories.map((category, index) => (
            <NavItem key={`category_${index}`}>
              <NavLink href="#">{category}</NavLink>
            </NavItem>
          )): 
          (
            <p className="contentText">No categories found...</p>
          )
      )
    } else {
      return (<p className="contentText">Fetching categories...</p>);
    }
  }

  return (
    <Col className="navigationGrid" sm="12">
        <Row>
          <Col>
            <h6>Categories</h6>
          </Col>
        </Row>
        <Nav vertical  className="navigationDetails">
          {getCategories()}
        </Nav>
    </Col>    
  )
}

export default Categories;
