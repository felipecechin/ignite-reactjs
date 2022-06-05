import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Felipe Cechin</Text>
        <Text color="gray.300" fontSize="small">ficechin@gmail.com</Text>
      </Box>

      <Avatar size="md" name="Felipe Cechin" />
    </Flex>
  );
}