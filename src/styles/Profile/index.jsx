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
  align-items: center;
  justify-content: space-between;
  width: 60%;
`;

export const UserData = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 50vh;
  padding-bottom: 5rem;
`;

export const UserImg = styled.img`
  height: 15rem;
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
  justify-content: center;
  align-items: center;
`;

export const FollowSection = styled.div`
  display: flex;
  height: 5rem;
  padding-top: 3rem;
  width: 100%;
  justify-content: space-evenly;
`;

export const FollowText = styled.p`
  font-size: 1.25rem;
`;
