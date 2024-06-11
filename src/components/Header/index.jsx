import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Menu from '../Menu';
import { addUser } from '../../redux/userSlice';
import { changeMenu } from '../../redux/menuSlice';

import {
  HeaderContainer,
  HeaderSection,
  Input,
  ProfileImg,
  Title,
} from '../../styles/Header';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const menu = useSelector((state) => state.menu);

  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem('token'));

    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    };

    fetch('http://localhost:8000/user/user-data', config)
      .then((res) => res.json())
      .then((res) => {
        dispatch(addUser(res));
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = (e) => {
    if (e.keyCode === 13 && e.target.value.trim() !== '') {
      const searchQuery = e.target.value.trim();
      navigate(`/search/${searchQuery}`);
    }
  };

  return (
    <HeaderSection>
      <HeaderContainer>
        <Title onClick={() => navigate('/main')}>Hello</Title>
        <Input placeholder="Search" onKeyUp={handleSearch} />
        <ProfileImg
          src={user.url ? user.url : '../../../user.png'}
          onClick={() => dispatch(changeMenu(!menu.openMenu))}
        />
      </HeaderContainer>
      {menu.openMenu && <Menu userId={user.id} />}
    </HeaderSection>
  );
}
