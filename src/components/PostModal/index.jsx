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
  return (
    <Modal>
      <PostArea>
        <ModalHeader>
          <Title>New Post</Title>
          <CloseModal onClick={() => closeModal(false)}>X</CloseModal>
        </ModalHeader>
        <TextArea placeholder="New Post" />
        <Button>Post</Button>
      </PostArea>
    </Modal>
  );
}
