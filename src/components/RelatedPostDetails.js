import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { Row, Col } from 'reactstrap';
import {
  setRelatedFilteredPost,
} from '../actions';

import PostContent from './PostContent';

const RelatedPostDetails = () => {
  const dispatch = useDispatch();  
  const params = useParams();
  const postId = params.id;

  const {
    relatedPosts,
    relatedFilteredPost,
  } = useSelector(
    ({
      blogReducer: {
        relatedPosts,
        relatedFilteredPost,
      }
    }) => ({
      relatedPosts,
      relatedFilteredPost,
    }),
  );

  useEffect(() => {
    const filterPost = relatedPosts.filter((post) => {
      return parseInt(post.ID) === parseInt(postId);
    });
    dispatch(setRelatedFilteredPost(filterPost));
  }, [postId, dispatch])
  
  const getrelatedPostDetails = () => {
    return relatedFilteredPost.map(post => {
      return (
            <Row style={{padding: '0 20px'}} key={`relatedpost_${post.ID}`}>  
              <Row style={{margin: "auto"}}>
                <Col className="thumbnail" sm="12" md={{ size: 6, offset: 3 }}>
                  <img src={post.post_thumbnail.URL} alt="blog"  />
                </Col>
              </Row>
              <PostContent post={post} />
            </Row>
          )
    })
  }
  return (
    <Col sm="8">
      {getrelatedPostDetails()}
    </Col>
  )
}

export default RelatedPostDetails;
