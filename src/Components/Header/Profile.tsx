import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Elisio Wander</Text>
        <Text color="gray.300" fontSize="small">
          elisio741@hotmail.com
        </Text>
      </Box>

      <Avatar
        size="md"
        name="Elisio Wander"
        src="https://github.com/elisioWander.png"
      />
    </Flex>
  )
}