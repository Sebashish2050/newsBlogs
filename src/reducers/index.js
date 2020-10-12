import { combineReducers } from 'redux'
import {
  FETCHING_DATA,
  RECEIVE_ERROR,
  RECEIVED_BLOGS_DATA,
  RECEIVED_CATEGORIES_DATA,
  SET_ACTIVE_PAGE,
  SET_SELECTED_POSTS_INDEX,
  FETCHING_RELATED_POSTS_DATA,
  RECEIVED_RELATED_POSTS_DATA,
  SET_FILTERED_RELATED_POST_DATA,
} from '../actions';
import { BLOG_COUNT } from '../constants';

const initialState = {
  isFetching: false,
  blogs: {},
  blogDetails: {},
  activePage: 1,
  count: BLOG_COUNT,
  totalPosts: 0,
  categories: [],
  selectedPostIndex: 0,
  isFetchingRelatedPosts: false,
  relatedPosts: [],
  relatedFilteredPost: [],
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        isFetching: true,
      }
    case RECEIVE_ERROR:
      return {
        ...state,
        isFetching: false,
        isFetchingRelatedPosts: false,
        errorMsg: action.payload
      }
    case RECEIVED_BLOGS_DATA:
      return {
        ...state,
        isFetching: false,
        totalPosts: action.payload.totalCount,
        blogs: {
          ...state.blogs,
          [`page_${state.activePage}`]: action.payload.posts,
        },
      }
    case RECEIVED_CATEGORIES_DATA: 
      return {
        ...state,
        categories: action.payload,
      }
    case SET_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.payload,
      }
    case SET_SELECTED_POSTS_INDEX: {
      return {
        ...state,
        selectedPostIndex: action.payload
      }
    }
    case FETCHING_RELATED_POSTS_DATA: {
      return {
        ...state,
        isFetchingRelatedPosts: true,
      }
    }
    case RECEIVED_RELATED_POSTS_DATA: {
      return {
        ...state,
        relatedPosts: action.payload,
        isFetchingRelatedPosts: false,
      }
    }
    case SET_FILTERED_RELATED_POST_DATA: {
      return {
        ...state,
        relatedFilteredPost: action.payload,
      }
    }
    
    default:
      return state
  }
}

export default combineReducers({
  blogReducer,
});
