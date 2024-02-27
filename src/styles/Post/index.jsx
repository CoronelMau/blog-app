import styled from 'styled-components';

export const Post = styled.div`
  width: 40vw;
  gap: 2rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PostContainer = styled.div`
  min-height: 10vw;
  background-color: #31304d;
  width: 90%;
  width: 90%;
  padding: 1% 5%;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
`;

export const PostInfo = styled.div`
  padding-top: 1rem;
`;

export const PostContent = styled.div`
  font-size: 1.5rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;
export const PostImg = styled.img`
  max-height: 100%;
  max-width: 100%;
  padding-bottom: 1rem;
`;

export const PostInteraction = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  height: 2rem;
  border-top: 1px solid #f0ece5;
  border-bottom: 1px solid #f0ece5;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const ButtonInteraction = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
