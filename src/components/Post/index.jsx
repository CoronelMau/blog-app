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

  useEffect(() => {
    setPosts(sendData);
    console.log(sendData);

    const newSocket = io('http://localhost:8000', { forceNew: true });
    setSocket(newSocket);

    newSocket.on('likesCount', (dataRecived) => {
      console.log(dataRecived);
    });
  }, [sendData]);

  const handleLike = (post_id) => {
    const jwt = JSON.parse(localStorage.getItem('token'));
    const data = { jwt, post_id };
    socket.emit('like', data);
  };

  return (
    <Post>
      {posts.map((post) => {
        return (
          <PostContainer key={post.id}>
            <PostInfo>{post.user}</PostInfo>
            <PostContent>{post.content}</PostContent>
            <PostImg src={post.img} />
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
                    <CommentInfo>{comment.user}</CommentInfo>
                    <CommentText>{comment.content}</CommentText>
                  </CommentContainer>
                );
              })}
            </Comments>
            <CommentInput placeholder="Comment" />
          </PostContainer>
        );
      })}
    </Post>
  );
}
