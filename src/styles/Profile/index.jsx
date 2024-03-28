import styled from 'styled-components';

export const ProfilePage = styled.div`
  background-color: #f0ece5;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
  min-height: 100%;
`;

export const UserData = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 60vh;
`;

export const UserImg = styled.img`
  height: 15rem;
  width: 15rem;
  border-radius: 8rem;
`;

export const UserName = styled.h1`
  color: #31304d;
  font-size: 2rem;
`;

export const FollowButton = styled.button`
  font-size: 1rem;
  height: 2rem;
  width: 8rem;
  border-radius: 0.5rem;
  border: none;
  background-color: #31304d;
  color: #fff;
  cursor: pointer;
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 10%;
`;

export const FollowSection = styled.div`
  display: flex;
  height: 3rem;
  padding-top: 3rem;
  width: 100%;
  justify-content: space-evenly;
  border-bottom: 1px solid #31304d;
  margin-bottom: 2rem;
`;

export const FollowText = styled.p`
  font-size: 1.25rem;
`;

export const PostSection = styled.div`
  flex: 1;
`;
