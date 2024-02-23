import {
  HeaderContainer,
  HeaderSection,
  Input,
  ProfileImg,
  Title,
} from '../../styles/Header';

export default function Header() {
  return (
    <HeaderSection>
      <HeaderContainer>
        <Title>Hello</Title>
        <Input placeholder="Search" />
        <ProfileImg src="../../../user.png" />
      </HeaderContainer>
    </HeaderSection>
  );
}
