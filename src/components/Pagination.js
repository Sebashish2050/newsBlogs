import React from 'react';
import { Button } from 'reactstrap';

const Pagination = ({
  siteCount,
  totalPosts,
  activePage,
  handlePreviousClick,
  handleNextClick,
  isDetailedPage,
  selectedPostIndex,
}) => {
  let isLastPage = activePage === Math.floor(totalPosts / siteCount);
  let isFirstPage = activePage === 1;
  if(isDetailedPage) {
    isFirstPage = selectedPostIndex === 0;
    isLastPage = selectedPostIndex === (siteCount - 1);
  }

  return (
    <>
      <Button size="sm" color="primary" outline onClick={handlePreviousClick} disabled={isFirstPage}>Newer</Button>&nbsp;&nbsp;<Button size="sm" onClick={handleNextClick} color="primary" outline disabled={isLastPage}>Older</Button>
    </>
  )
}

export default Pagination;
