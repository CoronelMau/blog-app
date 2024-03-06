import { useState } from 'react';

import {
  Button,
  CloseModal,
  Modal,
  ModalHeader,
  PostArea,
  TextArea,
  Title,
} from '../../styles/PostModal';

export default function PostModal({ closeModal }) {
  const [post, setPost] = useState();

  const handlePost = (e) => {
    e.preventDefault;

    const jwt = JSON.parse(localStorage.getItem('token'));

    const data = {
      text: post,
    };

    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
    };

    fetch('http://localhost:8000/user/post', config)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        closeModal(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Modal>
      <PostArea>
        <ModalHeader>
          <Title>New Post</Title>
          <CloseModal onClick={() => closeModal(false)}>X</CloseModal>
        </ModalHeader>
        <TextArea
          placeholder="New Post"
          onChange={(e) => {
            setPost(e.target.value);
          }}
        />
        <Button onClick={handlePost}>Post</Button>
      </PostArea>
    </Modal>
  );
}
