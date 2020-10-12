import { GET, POST, BLOG_COUNT } from '../constants';
import callToApi from '../utils/api';

export const FETCHING_DATA = 'FETCHING_DATA';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';
export const RECEIVED_BLOGS_DATA = 'RECEIVED_BLOGS_DATA';
export const RECEIVED_CATEGORIES_DATA = 'RECEIVED_CATEGORIES_DATA';
export const SET_ACTIVE_PAGE = 'SET_ACTIVE_PAGE';
export const SET_SELECTED_POSTS_INDEX = 'SET_SELECTED_POSTS_INDEX';
export const FETCHING_RELATED_POSTS_DATA = 'FETCHING_RELATED_POSTS_DATA';
export const RECEIVED_RELATED_POSTS_DATA = 'RECEIVED_RELATED_POSTS_DATA';
export const SET_FILTERED_RELATED_POST_DATA = 'SET_FILTERED_RELATED_POST_DATA';

export const fetchingFromApi = () => ({
  type: FETCHING_DATA
});

export const receiveErrorFromApi = (err) => ({
  type: RECEIVE_ERROR,
  payload: err
});

export const receivedBlogsData = (blogs) => ({
  type: RECEIVED_BLOGS_DATA,
  payload: {
    totalCount: blogs.found,
    posts: blogs.posts,
  }
});

export const fetchBlogsList = (pageNum) => async (
  dispatch,
  getState
) => {
  const {
    blogReducer: {
      blogs,
    } = {},
  } = getState();

  const posts = blogs[`page_${pageNum}`];
  if(!posts || posts.length === 0) {
    dispatch(fetchingFromApi());
    const offset = BLOG_COUNT * (pageNum - 1);
    try {
      const blogs  = await callToApi(`/getblogs?count=${BLOG_COUNT}&offset=${offset}`, GET);
      if(blogs && blogs.error) {
        console.log('error: ', blogs.error);
        dispatch(receiveErrorFromApi(blogs.error));
      } else {
        dispatch(receivedBlogsData(blogs));
      }
    } catch (err) {
      console.log('error: ', err);
      const errMsg = err || err.message;
      dispatch(receiveErrorFromApi(errMsg));
    } 
  }
};

export const receivedCategories = (categories) => ({
  type: RECEIVED_CATEGORIES_DATA,
  payload: categories,
});

export const setActivePage = (number) => ({
  type: SET_ACTIVE_PAGE,
  payload: number,
});

export const setSelectedPostIndex = (index) => ({
  type: SET_SELECTED_POSTS_INDEX,
  payload: index,
});

export const fetchingRelatedPosts = () => ({
  type: FETCHING_RELATED_POSTS_DATA,
});

export const receivedRelatedPosts = (posts) => ({
  type: RECEIVED_RELATED_POSTS_DATA,
  payload: posts,
});

export const fetchRelatedPosts = (postId) => async (dispatch) => {
    dispatch(fetchingRelatedPosts());
    try {
      const relatedPostData  = await callToApi(`/relatedposts?postId=${postId}`, POST);
      if(relatedPostData && relatedPostData.error) {
        console.log('error: ', relatedPostData.error);
        dispatch(receiveErrorFromApi(relatedPostData.error));
      } else {
        if(relatedPostData.hits && relatedPostData.hits.length > 0) {
          const relatedPostsId = [];
          for (let i = 0 ; i < 3; i++) {
            relatedPostsId.push(callToApi(`/post?postId=${relatedPostData.hits[i].fields.post_id}`, GET))
          }
          const relatedpostsData = await Promise.all(relatedPostsId);
          dispatch(receivedRelatedPosts(relatedpostsData));
        } else {
          dispatch(receivedRelatedPosts([]));
        }
      }
    } catch (err) {
      console.log('error: ', err);
      const errMsg = err || err.message;
      dispatch(receiveErrorFromApi(errMsg));
    } 
};

export const setRelatedFilteredPost = (post) => ({
  type: SET_FILTERED_RELATED_POST_DATA,
  payload: post,
});