import { Avatar } from '@/shared/ui/avatar/Avatar';
import { BoxButton } from '@/shared/ui/button/BoxButton';
import { Flex } from '@/shared/ui/flex/Flex';
import { Text } from '@/shared/ui/text/Text';

interface Props {
  thumbnailUrl: string;
  displayName: string;
  email: string;
  isMe: boolean;
  actionButton: {
    text: string;
    onClick: () => void;
  };
}

const MemberItem = ({
  thumbnailUrl,
  displayName,
  email,
  actionButton,
  isMe,
}: Props) => {
  return (
    <Flex
      py="x1_5"
      gap="x3"
      width="100%"
      alignItems="center"
      justifyContent="between"
    >
      <Flex alignItems="center" gap="x2">
        <Avatar
          size="large"
          alt="avatar"
          fallback={displayName.at(0)}
          url={thumbnailUrl}
        />

        <Flex direction="column">
          <Flex alignItems="center" gap="x1">
            <Text typography="body1" color="gray90">
              {displayName}
            </Text>

            {isMe && (
              <Text typography="body1" color="gray40">
                (나)
              </Text>
            )}
          </Flex>

          <Text typography="description" color="gray90">
            {email}
          </Text>
        </Flex>
      </Flex>

      <BoxButton
        size="small"
        style="outline"
        variant="secondary"
        onClick={actionButton.onClick}
      >
        {actionButton.text}
      </BoxButton>
    </Flex>
  );
};

export { MemberItem };
