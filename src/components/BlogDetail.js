import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { Row, Col } from 'reactstrap';
import Pagination from './Pagination';
import {
  setSelectedPostIndex,
} from '../actions';
import PostContent from './PostContent';
import {BLOG_COUNT} from '../constants';

const BlogDetail = () => {
  const history = useHistory();
  const dispatch = useDispatch();  
  const params = useParams();
  const currentPostId = params.id;
  console.log('currentPostId::: ', currentPostId);
  const {
    selectedPostIndex,
    blogs,
    activePage,
    totalPosts,
  } = useSelector(
    ({
      blogReducer: {
        selectedPostIndex,
        blogs,
        activePage,
        totalPosts,
      }
    }) => ({
      selectedPostIndex,
      blogs,
      activePage,
      totalPosts,
    }),
  );

  useEffect(() => {
    if(!blogs || Object.keys(blogs).length === 0) {
      history.push(`/`);
    }
    if(!blogs[`page_${activePage}`] || !Array.isArray(blogs[`page_${activePage}`]) || blogs[`page_${activePage}`].length === 0) {
      history.push(`/`);
    }
  }, []);

  const getBlogsList = () => {
    if(blogs && Object.keys(blogs).length !== 0) {
      const post = blogs[`page_${activePage}`][selectedPostIndex];
      return (
        <Row style={{padding: '0 20px'}}>
          <Row>
            <Col className="thumbnail" sm="12" md={{ size: 6, offset: 3 }}>
              <img src={post.post_thumbnail.URL} alt="blog"  />
            </Col>
          </Row>
          <PostContent post={post} />
        </Row>
      )
    }
  }
  
  const handlePreviousClick = () => {
    if(selectedPostIndex !== 0) {
      const post = blogs[`page_${activePage}`][selectedPostIndex - 1];
      dispatch(setSelectedPostIndex(selectedPostIndex - 1));
      history.push(`/blog/details/${post.ID}`);
    }
  }

  const handleNextClick = () => {
    const post = blogs[`page_${activePage}`][selectedPostIndex + 1];
    dispatch(setSelectedPostIndex(selectedPostIndex + 1));
    history.push(`/blog/details/${post.ID}`);
  }

  return (
    <Col sm="8">
      {getBlogsList()}
      {totalPosts >  BLOG_COUNT && (
          <Row style={{float: 'right', margin: '2%'}}>
            <Pagination
              siteCount={BLOG_COUNT}
              totalPosts={totalPosts}
              activePage={activePage}
              handlePreviousClick={handlePreviousClick}
              handleNextClick={handleNextClick}
              isDetailedPage={true}
              selectedPostIndex={selectedPostIndex}
            />
          </Row>
        )}
    </Col>
  )
}

export default BlogDetail;
