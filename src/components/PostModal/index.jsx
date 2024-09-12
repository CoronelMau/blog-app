import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { changeModal } from '../../redux/modalSlice';

import {
  Button,
  CloseModal,
  ImageArea,
  ImageInput,
  ImageTitle,
  Modal,
  ModalHeader,
  PostArea,
  TextArea,
  Title,
} from '../../styles/PostModal';

export default function PostModal({ updatePosts }) {
  const dispatch = useDispatch();
  const [post, setPost] = useState('');
  const [image, setImage] = useState(null);

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = null;

      if (image) {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'upload_preset');
        formData.append('api_key', 'api_key');

        const cloudinaryRes = await fetch(
          'https://api.cloudinary.com/v1_1/{root}/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        );

        const cloudinaryData = await cloudinaryRes.json();
        if (!cloudinaryRes.ok) {
          throw new Error(cloudinaryData.error.message);
        }

        imageUrl = cloudinaryData.secure_url;
      }

      const jwt = JSON.parse(localStorage.getItem('token'));

      const data = {
        text: post,
        url: imageUrl,
      };

      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(data),
      };

      const postRes = await fetch('http://localhost:8000/user/post', config);
      const postData = await postRes.json();

      if (!postRes.ok) {
        throw new Error(postData.error);
      }

      updatePosts(postData.postData);
      dispatch(changeModal(false));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal>
      <PostArea>
        <ModalHeader>
          <Title>New Post</Title>
          <CloseModal onClick={() => dispatch(changeModal(false))}>
            X
          </CloseModal>
        </ModalHeader>
        <TextArea
          placeholder="New Post"
          onChange={(e) => {
            setPost(e.target.value);
          }}
          autoFocus
        />
        <ImageArea>
          <ImageTitle>Image: </ImageTitle>
          <ImageInput
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </ImageArea>
        <Button onClick={handlePost}>Add Post</Button>
      </PostArea>
    </Modal>
  );
}
