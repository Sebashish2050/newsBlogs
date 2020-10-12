import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

const Blogs = lazy(() => import('./Blogs'));
const BlogDetails = lazy(() => import('./BlogDetails'));
const RelatedPost = lazy(() => import('./RelatedPost'));
const Content = () => {
  return (
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Blogs}/>
            <Route path="/blog/details/:id" component={BlogDetails}/>
            <Route path="/relatedpost/:id" component={RelatedPost}/>
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Router>
  )
}

export default Content;
