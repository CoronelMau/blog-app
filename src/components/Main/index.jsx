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

import {
  CommentContainer,
  CommentInfo,
  CommentInput,
  CommentText,
  Comments,
} from '../../styles/Comments';

export default function MainPage() {
  const posts = [
    {
      id: 1,
      user: 'Test Name',
      img: 'https://github.com/CoronelMau.png',
      text: 'This is a text',
    },
  ];
  const comments = [
    {
      id: 1,
      user: 'Name 1',
      text: 'Comment test',
    },
    { id: 2, user: 'Name 2', text: 'Another comment' },
  ];

  return (
    <MainSection>
      <Header />
      <PostingSection>
        <PostingInput placeholder="Write your thoughts"></PostingInput>
      </PostingSection>
      <Post>
        {posts.map((post) => {
          return (
            <PostContainer key={post.id}>
              <PostInfo>{post.user}</PostInfo>
              <PostContent>{post.text}</PostContent>
              <PostImg src={post.img} />
              <PostInteraction>
                <ButtonInteraction>Like</ButtonInteraction>
                <ButtonInteraction>Comment</ButtonInteraction>
              </PostInteraction>
              <Comments>
                {comments.map((comment) => {
                  return (
                    <CommentContainer key={comment.id}>
                      <CommentInfo>{comment.user}</CommentInfo>
                      <CommentText>{comment.text}</CommentText>
                    </CommentContainer>
                  );
                })}
              </Comments>
              <CommentInput placeholder="Comment" />
            </PostContainer>
          );
        })}
      </Post>
    </MainSection>
  );
}
