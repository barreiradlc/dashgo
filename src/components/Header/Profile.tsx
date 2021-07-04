import { Flex, Text, Input, Icon, HStack, Box, Avatar } from "@chakra-ui/react"

interface PropsOProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: PropsOProps) {
  return (
    <Flex
      align="center"
    >
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Augusto Barreira</Text>
          <Text color="gray.300" fontSize="small">barreira266@hotmail.com</Text>
        </Box>
      )}

      <Avatar size="md" name="Augusto Barreira" src="https://xesque.rocketseat.dev/users/avatar/profile-76203521-bf03-4232-8f76-68d269a40daf-1611257705713.jpg" />
    </Flex>
  )
}