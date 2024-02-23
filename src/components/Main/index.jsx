import Header from '../Header';
import { MainSection, PostingSection, PostingInput } from '../../styles/Main';

import {
  Post,
  PostContainer,
  PostInfo,
  PostContent,
  PostInteraction,
  PostImg,
  ButtonInteraction,
} from '../../styles/Post';

export default function MainPage() {
  const posts = [
    {
      id: 1,
      user: 'Test Name',
      img: 'https://github.com/CoronelMau.png',
      text: 'This is a text',
    },
  ];

  return (
    <MainSection>
      <Header />
      <PostingSection>
        <PostingInput placeholder="Write your thoughts"></PostingInput>
      </PostingSection>
      {posts.map((post) => {
        return (
          <Post key={post.id}>
            <PostContainer>
              <PostInfo>{post.user}</PostInfo>
              <PostContent>{post.text}</PostContent>
              <PostImg></PostImg>
              <PostInteraction>
                <ButtonInteraction>Like</ButtonInteraction>
                <ButtonInteraction>Comment</ButtonInteraction>
              </PostInteraction>
            </PostContainer>
          </Post>
        );
      })}
    </MainSection>
  );
}
