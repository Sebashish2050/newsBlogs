import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Spinner } from 'reactstrap';
import { useHistory } from "react-router-dom";
import Pagination from './Pagination';
import {
  fetchBlogsList,
  setActivePage,
  setSelectedPostIndex,
} from '../actions';
import formatDate from '../utils/dates';
import {BLOG_COUNT} from '../constants';

const BlogsList = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    isFetching,
    activePage,
    totalPosts,
    blogs
  } = useSelector(
    ({
      blogReducer: {
        isFetching,
        activePage,
        totalPosts,
        blogs,
      }
    }) => ({
      isFetching,
      activePage,
      totalPosts,
      blogs
    }),
  );

  useEffect(() => {
    dispatch(fetchBlogsList(activePage));
  }, [activePage, dispatch]);

  const getPostDetails = (postId, index) => {
    history.push(`/blog/details/${postId}`);
    dispatch(setSelectedPostIndex(index));
  };

  const getBlogsList = () => {
    const currentPosts = blogs[`page_${activePage}`];
    if(currentPosts && Array.isArray(currentPosts)) {
      return currentPosts.map((post, idx) => {
        return (
          <Row className='paragraph' key={post.ID}>
            <article sm="12" >
              <Col className="thumbnail" sm="2">
                <img onClick={() => getPostDetails(post.ID, idx)} src={post.post_thumbnail.URL} alt="blog" />
              </Col>
              <Col className="content" sm="10">
                <h6 onClick={() => getPostDetails(post.ID, idx)} className="postTitle">
                  {post.title}
                </h6>
                <p dangerouslySetInnerHTML={{ __html: post.excerpt }} className="contentText excerpt" />
                <div className="formattedDate">
                  <time>{formatDate(post.date)}</time> ago
                </div>
              </Col>
            </article>
          </Row>
        )
      });
    } else {
      return null;
    }
  }

  const handlePreviousClick = () => {
    if(parseInt(activePage) !== 1) {
      dispatch(setActivePage(activePage - 1));
    }
  };
  const handleNextClick = () => {
    dispatch(setActivePage(activePage + 1));
  };

  return (
    <Col sm="8">
      { isFetching ? <Spinner color="secondary" /> : (
        <>
        {getBlogsList()}
        {totalPosts >  BLOG_COUNT && (
          <Row style={{float: 'right', margin: '2%'}}>
            <Pagination
              siteCount={BLOG_COUNT}
              totalPosts={totalPosts}
              activePage={activePage}
              handlePreviousClick={handlePreviousClick}
              handleNextClick={handleNextClick}
            />
          </Row>
        )}
        </>
      )}
    </Col>
  )
}

export default BlogsList;
