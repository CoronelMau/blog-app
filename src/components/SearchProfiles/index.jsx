import { useState } from 'react';
import Header from '../Header';
import {
  FollowButton,
  ImgProfile,
  Profile,
  ProfilesSection,
  SearchPage,
  UserName,
} from '../../styles/Search';

export default function SearchProfiles() {
  const [profiles, setProfiles] = useState([]);

  const searchInfo = (info) => {
    setProfiles(info.userInfo);
  };

  const handleFollow = (following_id) => {
    const jwt = JSON.parse(localStorage.getItem('token'));

    console.log(following_id);

    const data = {
      following_id,
    };

    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
    };

    fetch('http://localhost:8000/user/follow', config)
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  return (
    <SearchPage>
      <Header handleInfo={searchInfo} />
      <ProfilesSection>
        {profiles.map((profile) => {
          return (
            <Profile key={profile.id}>
              <ImgProfile
                src={profile.url ? profile.url : '../../../user.png'}
              />
              <UserName>{profile.user}</UserName>
              <FollowButton onClick={() => handleFollow(profile.id)}>
                Follow
              </FollowButton>
            </Profile>
          );
        })}
      </ProfilesSection>
    </SearchPage>
  );
}
