import { useState, useEffect } from 'react';
import io from 'socket.io-client';

import Header from '../Header';
import { MainSection, PostingSection, PostingInput } from '../../styles/Main';

import {
  Post,
  PostContainer,
  PostInfo,
  PostContent,
  PostInteraction,
  PostImg,
  ButtonInteraction,
} from '../../styles/Post';

import {
  CommentContainer,
  CommentInfo,
  CommentInput,
  CommentText,
  Comments,
} from '../../styles/Comments';
import PostModal from '../PostModal';

export default function MainPage() {
  const [modal, setModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:8000', { forceNew: true });
    setSocket(newSocket);

    newSocket.on('likesCount', (dataRecived) => {
      console.log(dataRecived);
    });

    const jwt = JSON.parse(localStorage.getItem('token'));

    const config = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };

    fetch('http://localhost:8000/user/follow-posts', config)
      .then((res) => res.json())
      .then((res) => setPosts(res))
      .catch((err) => console.error(err));
  }, []);

  const toggleModal = (state) => {
    setModal(state);
  };

  const handleLike = (post_id) => {
    const jwt = JSON.parse(localStorage.getItem('token'));
    const data = { jwt, post_id };
    socket.emit('like', data);
  };

  return (
    <MainSection>
      <Header />
      <PostingSection>
        <PostingInput
          placeholder="Write your thoughts"
          onClick={() => toggleModal(true)}
        ></PostingInput>
      </PostingSection>
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

      {modal && <PostModal closeModal={toggleModal} />}
    </MainSection>
  );
}
