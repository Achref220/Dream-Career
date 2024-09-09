import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, setPosts } from "../../state";
import { v4 as uuidv4 } from "uuid";

import SinglePostWidget from "./SinglePostWidget";

import SinglePostSkeleton from "../../components/Skeletons/SinglePostSkeleton";
import { SERVER_URL } from "../../service/config";
import { Box } from "@mui/material";

const PostsWidget = ({ username, isProfile = false }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getPosts = async () => {
    if (page > 1 && hasMore) {
      setIsLoadingMore(true);
    }

    try {
      const response = await fetch(`${SERVER_URL}p?page=${page}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      setHasMore(data.hasMore);

      if (page === 1) {
        dispatch(setPosts({ posts: data.posts }));
      } else {
        dispatch(addPost({ posts: [...data.posts] }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const getUserPosts = async () => {
    if (page > 1 && hasMore) {
      setIsLoadingMore(true);
    }
    if (!hasMore) {
      setIsLoadingMore(false);
      return;
    }
    try {
      const response = await fetch(
        SERVER_URL + `u/${username}/posts?page=${page}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setHasMore(data.hasMore);

      if (page === 1) {
        dispatch(setPosts({ posts: data.posts }));
      } else {
        dispatch(addPost({ posts: [...data.posts] }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  /**===========Handle Scroll============ */
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const currentHeight = window.innerHeight + window.pageYOffset;

      if (currentHeight + 1 >= scrollHeight && hasMore) {
        setPage(page + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, hasMore]);

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  if (isLoading) {
    return Array.from(new Array(2)).map((el, index) => (
      <SinglePostSkeleton key={index} />
    ));
  }

  return (
    <Box
      sx={{
        minWidth: "260px",
        
      }}
    >
      {posts.map(
        ({
          _id,
          userId,
          username,
          location,
          caption,
          postImageUrls,
          userProfilePhoto,
          likes,
          commentCount,
          createdAt,
        }) => (
          <SinglePostWidget
            key={uuidv4()}
            postId={_id}
            postUserId={userId}
            postAuthorUsername={username}
            location={location}
            caption={caption}
            postImageUrls={postImageUrls}
            userProfilePhoto={userProfilePhoto[0]?.url ? userProfilePhoto[0].url : 'https://i.stack.imgur.com/l60Hf.png'}
            likes={likes}
            commentCount={commentCount}
            createdAt={createdAt}
          />
        )
      )}
      {isLoadingMore
        ? Array.from(new Array(1)).map((el, index) => (
            <SinglePostSkeleton key={uuidv4()} />
          ))
        : null}
    </Box>
  );
};

export default PostsWidget;
