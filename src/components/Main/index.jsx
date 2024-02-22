import Header from '../Header';
import {
  MainSection,
  PostsSection,
  Post,
  PostInfo,
  PostContent,
  PostInteraction,
  PostWrite,
  PostInput,
} from '../../styles/Main';

export default function MainPage() {
  const posts = [
    {
      id: 1,
      user: 'Test',
      img: 'https://github.com/CoronelMau.png',
      text: 'This is a text',
    },
  ];

  return (
    <MainSection>
      <Header />
      <PostsSection>
        <PostWrite>
          <PostInput></PostInput>
        </PostWrite>
        {posts.map((post) => {
          return (
            <Post key={post.id}>
              <PostInfo>{post.user}</PostInfo>
              <PostContent></PostContent>
              <PostInteraction></PostInteraction>
            </Post>
          );
        })}
      </PostsSection>
    </MainSection>
  );
}
