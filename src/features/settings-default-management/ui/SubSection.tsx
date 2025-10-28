import type { vars } from '@/shared/lib/vanilla-extract';
import { Flex } from '@/shared/ui/flex/Flex';
import { Text } from '@/shared/ui/text/Text';

interface Props {
  title: string;
  children: React.ReactNode;
  gap: keyof typeof vars.gap;
}

const SubSection = ({ title, children, gap }: Props) => {
  return (
    <Flex direction="column" gap={gap}>
      <Text typography="body1" color="gray80">
        {title}
      </Text>

      {children}
    </Flex>
  );
};

export { SubSection };
