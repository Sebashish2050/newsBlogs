import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Nav, NavItem, NavLink } from 'reactstrap';
import { useParams, useHistory } from "react-router-dom";

import {
  fetchRelatedPosts,
} from '../actions';

const RelatedPosts = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const postId = params.id;

  const {
    relatedPosts,
    isFetchingRelatedPosts,
  } = useSelector(
    ({
      blogReducer: {
        relatedPosts,
        isFetchingRelatedPosts,
      }
    }) => ({
      relatedPosts,
      isFetchingRelatedPosts,
    }),
  );

  useEffect(() => {
    dispatch(fetchRelatedPosts(postId));
  }, [postId, dispatch]);

  const handleRelatedPostClick = (relatedPostId) => {
    history.push(`/relatedpost/${relatedPostId}`);
  };

  const getCategories = () => {
    if(relatedPosts && relatedPosts.length > 0) {
      return relatedPosts.map((post, index) => (
        <NavItem className="relatedPost" key={`relatedpost_${post.ID}`} onClick={() => handleRelatedPostClick(post.ID)}>
          <NavLink>{post.title}</NavLink>
        </NavItem>
      ))
    } else {
      return (<p className="contentText">No related posts found</p>);
    }
  }

  return (
    <Col className="navigationGrid" sm="12">
        <Row>
          <Col>
            <h6>Related Posts</h6>
          </Col>
        </Row>
        <Nav vertical  className="navigationDetails">
          {isFetchingRelatedPosts ? <p className="contentText">Fetching related posts...</p> : getCategories()}
        </Nav>
    </Col>    
  )
}

export default RelatedPosts;
