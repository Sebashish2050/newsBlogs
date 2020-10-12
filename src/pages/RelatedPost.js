import React from 'react';
import RelatedPostDetails from '../components/RelatedPostDetails';
import AsideDetails from '../components/AsideDetails';

const RelatedPost = () => {
  return(
   <>
    <RelatedPostDetails />
    <AsideDetails isDetailedPage/>
   </>
  )
}

export default RelatedPost;
