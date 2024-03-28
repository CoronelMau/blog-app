import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import {
  CommentContainer,
  CommentInfo,
  CommentInput,
  CommentText,
  Comments,
} from '../../styles/Comments';
import {
  ButtonInteraction,
  Post,
  PostContainer,
  PostContent,
  PostImg,
  PostInfo,
  PostInteraction,
} from '../../styles/Post';

export default function Posts({ sendData }) {
  const [socket, setSocket] = useState('');
  const [posts, setPosts] = useState([]);
  const [likesFlag, setLikesFlag] = useState(true);

  useEffect(() => {
    const postsWithCommentsArray = sendData.map((post) => ({
      ...post,
      comments: post.comments || [],
    }));
    setPosts(postsWithCommentsArray);

    const newSocket = io('http://localhost:8000', { forceNew: true });
    setSocket(newSocket);

    newSocket.on('likesCount', (dataReceived) => {
      console.log(dataReceived);
    });

    newSocket.on('newComment', (newComment) => {
      updateComments(newComment.postId, newComment.comment);
    });
  }, [sendData]);

  const handleLike = (post_id) => {
    const jwt = JSON.parse(localStorage.getItem('token'));
    const data = { jwt, post_id };
    socket.emit('like', data);
    updateLike(post_id);
    setLikesFlag(!likesFlag);
  };

  const handleComment = (post_id, content) => {
    const jwt = JSON.parse(localStorage.getItem('token'));
    const data = { jwt, content, post_id };
    socket.emit('comment', data);
    updateComments(post_id, { user: 'You', content });
  };

  const updateLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: likesFlag ? post.likes + 1 : post.likes - 1,
            }
          : post
      )
    );
  };

  const updateComments = (postId, newComment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [...post.comments, newComment],
            }
          : post
      )
    );
  };

  return (
    <Post>
      {posts.map((post) => {
        return (
          <PostContainer key={post.id}>
            <PostInfo>{post.user || 'You'}</PostInfo>
            <PostContent>{post.content}</PostContent>
            <PostImg src={post.url} />
            <PostInteraction>
              <ButtonInteraction onClick={() => handleLike(post.id)}>
                {post.likes} likes
              </ButtonInteraction>
              <ButtonInteraction>Comment</ButtonInteraction>
            </PostInteraction>
            <Comments>
              {post.comments.map((comment) => {
                return (
                  <CommentContainer key={comment.id}>
                    <CommentInfo>{comment.user || 'You'}</CommentInfo>
                    <CommentText>{comment.content}</CommentText>
                  </CommentContainer>
                );
              })}
            </Comments>
            <CommentInput
              placeholder="Comment"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleComment(post.id, e.target.value);
                  e.target.value = '';
                }
              }}
            />
          </PostContainer>
        );
      })}
    </Post>
  );
}
