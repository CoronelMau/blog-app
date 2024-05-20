import { useState, useEffect } from 'react';

import Header from '../Header';
import Posts from '../Post';
import { MainSection, PostingSection, PostingInput } from '../../styles/Main';
import PostModal from '../PostModal';

export default function MainPage() {
  const [modal, setModal] = useState(false);
  const [posts, setPosts] = useState([]);

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
      .then((res) => {
        setPosts(res.finalPosts);
        console.log(res);
      })
      .catch((err) => console.error(err));
  }, []);

  const toggleModal = (state) => {
    setModal(state);
  };

  const updatePosts = (newPost) => {
    const updatedPosts = [...posts];
    updatedPosts.unshift(newPost);
    setPosts(updatedPosts);
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
      <Posts sendData={posts} />
      {modal && (
        <PostModal closeModal={toggleModal} updatePosts={updatePosts} />
      )}
    </MainSection>
  );
}
