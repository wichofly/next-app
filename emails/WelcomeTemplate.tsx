import {
  Body,
  Container,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components';

const WelcomeTemplate = ({ name }: { name: string }) => {
  return (
    <Html>
      <Preview>Welcome to our service!</Preview>
      <Body>
        <Container>
          <Text>Hello {name}</Text>
          <Link href="https://www.youtube.com">Youtube</Link>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeTemplate;
