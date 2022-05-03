import { Button, Flex, Stack } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { Input } from "../Components/Form/Input";

export default function Home() {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        w="100%"
        maxW={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        direction="column"
      >
        <Stack spacing="4">
          <Input name="email" type="email" label="E-mail" />
          <Input name="password" type="password" label="Senha" />
        </Stack>

        <Button type="submit" mt="6" colorScheme="pink" >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
