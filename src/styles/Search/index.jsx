import styled from 'styled-components';

export const SearchPage = styled.div`
  background-color: #f0ece5;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfilesSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  margin-top: 10vh;
  gap: 1rem;
`;

export const Profile = styled.div`
  background-color: #31304d;
  color: white;
  width: 100%;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  cursor: pointer;
`;

export const ImgProfile = styled.img`
  height: 4rem;
`;

export const UserName = styled.h3`
  font-size: 1.75rem;
  flex: 1;
  padding-left: 1rem;
`;

export const FollowButton = styled.button`
  font-size: 1rem;
  height: 2rem;
  width: 8rem;
  border-radius: 0.5rem;
  border: none;
  background-color: #f0ece5;
  cursor: pointer;
`;
