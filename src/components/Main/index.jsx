import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../Header';
import Posts from '../Post';
import { MainSection, PostingSection, PostingInput } from '../../styles/Main';
import PostModal from '../PostModal';

import { changeModal } from '../../redux/modalSlice';
import { setPosts } from '../../redux/postsSlice';

export default function MainPage() {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem('token'));

    const config = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };

    fetch('http://localhost:8000/user/follow-posts', config)
      .then((res) => res.json())
      .then((res) => dispatch(setPosts(res.finalPosts)))
      .catch((err) => console.error('Failed to fetch: ', err));
  }, []);

  const toggleModal = (state) => {
    dispatch(changeModal(state));
  };

  const updatePosts = (newPost) => {
    const finalNewPost = {
      id: newPost.id,
      url: newPost.url,
      content: newPost.text,
      comments: [],
      likes: null,
    };
    console.log(posts);
    const updatedPosts = [...posts.posts];
    updatedPosts.unshift(finalNewPost);
    dispatch(setPosts(updatedPosts));
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
      <Posts sendData={posts.posts} />
      {modal.openModal && <PostModal updatePosts={updatePosts} />}
    </MainSection>
  );
}
