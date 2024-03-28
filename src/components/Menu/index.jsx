import { useNavigate } from 'react-router-dom';
import { MenuContainer, MenuOption } from '../../styles/Menu';

export default function Menu({ userId }) {
  const navigate = useNavigate();

  const closeSession = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <MenuContainer>
      <MenuOption onClick={() => navigate(`/profile/${userId}`)}>
        Profile
      </MenuOption>
      <MenuOption onClick={() => navigate('/settings')}>Settings</MenuOption>
      <MenuOption onClick={closeSession}>Close Session</MenuOption>
    </MenuContainer>
  );
}
