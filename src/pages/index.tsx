import { Button, Flex, Stack } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "../Components/Form/Input";
import { yupResolver } from '@hookform/resolvers/yup'

import * as Yup from 'yup'

type UserSignInData = {
  email: string;
  password: string;
}


const schema = Yup.object({
  email: Yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  password: Yup.string().required('Senha obrigatória')
})

export default function Home() {
  const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm({
    resolver: yupResolver(schema)
  })

  const handleSignIn: SubmitHandler<UserSignInData> = async (value) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log(value)
  }

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
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            name="email"
            type="email"
            label="E-mail"
            error={errors.email}
            {...register('email')}
          />
          <Input
            name="password"
            type="password"
            label="Senha"
            error={errors.password}
            {...register('password')}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
