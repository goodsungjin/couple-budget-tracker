import { Divider } from '@/shared/ui/divider/Divider';
import { Flex } from '@/shared/ui/flex/Flex';
import { Text } from '@/shared/ui/text/Text';

interface Props {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Section = ({ title, children, className }: Props) => {
  return (
    <Flex direction="column" gap="x5" className={className} flex={1}>
      <Flex direction="column" gap="x3">
        <Text typography="body1Bold" color="gray100">
          {title}
        </Text>

        <Divider />
      </Flex>

      {children}
    </Flex>
  );
};

export { Section };
