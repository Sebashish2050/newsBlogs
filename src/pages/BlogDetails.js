import React from 'react';
import BlogDetail from '../components/BlogDetail';
import AsideDetails from '../components/AsideDetails';

const BlogDetails = () => {
  return(
   <>
    <BlogDetail />
    <AsideDetails isDetailedPage/>
   </>
  )
}

export default BlogDetails;
