import styled from 'styled-components';

export const Comments = styled.div`
  max-height: 20rem;
  width: 100%;
  overflow-y: scroll;
`;

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #9c9bb41f;
  border-radius: 0.5rem;
  gap: 5px;
  padding: 0.5rem;
  margin: 0.5rem;
`;

export const CommentInfo = styled.div``;

export const CommentText = styled.div`
  font-size: 1.2rem;
`;

export const CommentInput = styled.input`
  font-size: 1.2rem;
  padding: 0.5rem;
  margin: 1rem 0;
  border-radius: 1rem;
`;
