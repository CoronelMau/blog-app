import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  FollowButton,
  FollowSection,
  FollowText,
  MainContent,
  ProfilePage,
  ProfileSection,
  UserData,
  UserImg,
  UserName,
  PostSection,
} from '../../styles/Profile';
import Header from '../Header';
import Posts from '../Post';

export default function Profile() {
  const userId = useParams();

  const [user, setUser] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/user/profile/${userId.id}`)
      .then((res) => res.json())
      .then((res) => setUser(res))
      .catch((err) => console.error(err));

    fetch(`http://localhost:8000/user/posts/${userId.id}`)
      .then((res) => res.json())
      .then((res) => setPosts(res.posts))
      .catch((err) => console.error(err));
  }, [userId]);

  return (
    <ProfilePage>
      <Header />
      <ProfileSection>
        <UserData>
          <UserImg src={user.url ? user.url : '../../../user.png'} />
          <UserName>{user.username}</UserName>
          <FollowButton>Follow</FollowButton>
        </UserData>

        <MainContent>
          <FollowSection>
            <FollowText>Count follows</FollowText>
            <FollowText>Count followings</FollowText>
          </FollowSection>
          <PostSection>
            <Posts sendData={posts} />
          </PostSection>
        </MainContent>
      </ProfileSection>
    </ProfilePage>
  );
}
