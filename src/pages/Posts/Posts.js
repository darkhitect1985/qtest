import React, { useContext, useEffect, useState } from "react";
import classes from "./Posts.module.scss";
import Context from "../../store/context";
import Loader from "../../components/Loader/Loader";
import PostsList from "../../components/PostsList/PostsList";
import NameExtractorHOC from "../../components/NameExtractorHOC/NameExtractorHOC";
import { requiredLogPropTypes } from "../../utils/utils";

/**
 * Posts page or Homepage
 * @property {string} greetingsMessage forwarded as prop through parent as an assignment requirement
 * that is why it is not collected through context
 * @property {string} componentName forwarded as prop through parent as an assignment requirement
 * @returns {JSX.Element} component itself
 * @component
 * @example
 * return (
 *     <Posts greetingsMessage={ctx.greetingsMessage} componentName={componentName}/>
 * )
 */
const Posts = ({ greetingsMessage, componentName }) => {
  console.log(`${greetingsMessage} ${componentName}`);

  const ctx = useContext(Context); //target the store to extract greetingsMessage which will be defined only once there
  const posts = ctx.posts;
  const filteredPosts = ctx.filteredPosts;
  const beingFiltered = ctx.beingFiltered;
  const [postsToDisplay, setPostsToDisplay] = useState([]);

  useEffect(() => {
    beingFiltered ? setPostsToDisplay(filteredPosts) : setPostsToDisplay(posts);
  }, [beingFiltered, posts, filteredPosts]);

  return posts.length === 0 && beingFiltered ? (
    <div className={classes.loaderWrapper}>
      <Loader />
    </div>
  ) : (
    <>
      <NameExtractorHOC>
        <PostsList posts={postsToDisplay} greetingsMessage={greetingsMessage} />
      </NameExtractorHOC>
      {posts.length === 100 && !beingFiltered && (
        <span className={classes.fullyLoaded}>Nothing to load!</span>
      )}
      {filteredPosts.length === 0 && beingFiltered && (
        <span className={classes.fullyLoaded}>No match found!</span>
      )}
    </>
  );
};

Posts.propTypes = {
  ...requiredLogPropTypes,
};

export default Posts;
