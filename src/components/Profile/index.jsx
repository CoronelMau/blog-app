import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import {
  FollowButton,
  FollowSection,
  FollowText,
  MainContent,
  ProfilePage,
  ProfileSection,
  UserData,
  UserImg,
  UserName,
} from '../../styles/Profile';
import Header from '../Header';
import {
  ButtonInteraction,
  Post,
  PostContainer,
  PostContent,
  PostImg,
  PostInfo,
  PostInteraction,
} from '../../styles/Post';
import {
  CommentContainer,
  CommentInfo,
  CommentInput,
  CommentText,
  Comments,
} from '../../styles/Comments';

export default function Profile() {
  const [user, setUser] = useState('');
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [socket, setSocket] = useState([]);

  useEffect(() => {
    const newSocket = io('http://localhost:8000', { forceNew: true });
    setSocket(newSocket);

    newSocket.on('likesCount', (dataRecived) => {
      console.log(dataRecived);
    });

    fetch(`http://localhost:8000/user/profile/${1}`)
      .then((res) => res.json())
      .then((res) => setUser(res))
      .catch((err) => console.error(err));

    fetch(`http://localhost:8000/user/posts/${1}`)
      .then((res) => res.json())
      .then((res) => setPosts(res.userPosts))
      .catch((err) => console.error(err));
  }, []);

  const handleLike = (post_id) => {
    const jwt = JSON.parse(localStorage.getItem('token'));
    const data = { jwt, post_id };
    socket.emit('like', data);
  };

  return (
    <ProfilePage>
      <Header />
      <ProfileSection>
        <UserData>
          <UserImg src={user.url ? user.url : '../../../user.png'} />
          <UserName>{user.username}</UserName>
          <FollowButton>Follow</FollowButton>
        </UserData>
        <MainContent>
          <FollowSection>
            <FollowText>Count follows</FollowText>
            <FollowText>Count followings</FollowText>
          </FollowSection>
          <Post>
            {posts.map((post) => {
              return (
                <PostContainer key={post.postId}>
                  <PostInfo>{post.user}</PostInfo>
                  <PostContent>{post.text}</PostContent>
                  <PostImg src={post.img} />
                  <PostInteraction>
                    <ButtonInteraction onClick={() => handleLike(post.postId)}>
                      Like
                    </ButtonInteraction>
                    <ButtonInteraction>Comment</ButtonInteraction>
                  </PostInteraction>
                  <Comments>
                    {comments.map((comment) => {
                      return (
                        <CommentContainer key={comment.id}>
                          <CommentInfo>{comment.user}</CommentInfo>
                          <CommentText>{comment.text}</CommentText>
                        </CommentContainer>
                      );
                    })}
                  </Comments>
                  <CommentInput placeholder="Comment" />
                </PostContainer>
              );
            })}
          </Post>
        </MainContent>
      </ProfileSection>
    </ProfilePage>
  );
}
