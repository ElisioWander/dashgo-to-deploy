import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "../../Components/Form/Input";
import { Header } from "../../Components/Header";
import { SideBar } from "../../Components/Sidebar";

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler } from "react-hook-form";

interface CreateUserFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const createUserSchema = Yup.object({
  name: Yup.string().required("Nome obrigatório"),
  email: Yup.string().email("E-mail inválido").required("E-mail obrigatório"),
  password: Yup
    .string()
    .required("Senha obrigatória")
    .min(6, "No mínimo 6 caracteres"),
  password_confirmation: Yup
    .string()
    .oneOf([null, Yup.ref("password")], "As senhas precisam ser iguais"),
});

export default function CreateUser() {
  const { handleSubmit, formState: { errors, isSubmitting }, register } = useForm({
    resolver: yupResolver(createUserSchema)
  })

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (value) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log(value)
  }

  return (
    <Box>
      <Header />

      <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />

        <Box
          as="form"
          flex="1"
          borderRadius="8"
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading fontSize="lg" fontWeight="normal">
            Criar Usuário
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
              <Input
                name="name"
                label="Nome Completo"
                {...register('name')}
                error={errors.name}
              />
              <Input
                name="email"
                type="email"
                label="elisio741@hotmail.com"
                {...register('email')}
                error={errors.email}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
              <Input
                name="password"
                type="password"
                label="Senha"
                {...register('password')}
                error={errors.password}
              />
              <Input
                name="password_confirmation"
                type="password"
                label="Confirme a senha"
                {...register('password_confirmation')}
                error={errors.password_confirmation}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button 
                type="submit"
                colorScheme="pink"
                isLoading={isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
