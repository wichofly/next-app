import {
  Body,
  Container,
  Html,
  Link,
  Preview,
  Text,
  Tailwind,
} from '@react-email/components';

const WelcomeTemplate = ({ name }: { name: string }) => {
  return (
    <Html>
      <Preview>Welcome to our service!</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans p-6">
          <Container>
            <Text className="text-lg text-semibold text-gray-800">
              Hello {name}
            </Text>
            <Link href="https://www.youtube.com">Youtube</Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeTemplate;
