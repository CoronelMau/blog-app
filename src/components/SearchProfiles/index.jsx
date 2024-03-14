import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
  const user = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const config = {
      method: 'SEARCH',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch(`http://localhost:8000/user/search-profile/${user.query}`, config)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setProfiles(res.userInfo);
      })
      .catch((err) => console.error(err));
  });

  const searchInfo = (info) => {
    setProfiles(info.userInfo);
  };

  const handleFollow = (e, following_id) => {
    e.stopPropagation();
    const jwt = JSON.parse(localStorage.getItem('token'));

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
            <Profile
              key={profile.id}
              onClick={() => navigate(`/profile/${profile.id}`)}
            >
              <ImgProfile
                src={profile.url ? profile.url : '../../../user.png'}
              />
              <UserName>{profile.user}</UserName>
              <FollowButton onClick={(e) => handleFollow(e, profile.id)}>
                Follow
              </FollowButton>
            </Profile>
          );
        })}
      </ProfilesSection>
    </SearchPage>
  );
}
