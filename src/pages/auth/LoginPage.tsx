import { signInWithGoogle } from '@/shared/apis/auth';
import { Flex } from '@/shared/ui/flex/Flex';
import { Text } from '@/shared/ui/text/Text';

const LoginPage = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100vw"
      gap="x6"
    >
      <Text typography="h1Bold" color="gray90">
        커플 가계부에 오신 것을 환영합니다
      </Text>
      <Text typography="body1" color="gray60">
        Google 계정으로 로그인하여 시작하세요
      </Text>
      <button
        type="button"
        onClick={signInWithGoogle}
        style={{
          padding: '12px 24px',
          backgroundColor: '#4285f4',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer',
          fontWeight: '500',
        }}
      >
        Google로 로그인
      </button>
    </Flex>
  );
};

export default LoginPage;
