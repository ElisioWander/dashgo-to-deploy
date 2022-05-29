import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Link,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import { RiAddLine } from "react-icons/ri";
import { Header } from "../../Components/Header";
import { Pagination } from "../../Components/Pagination/Pagination";
import { SideBar } from "../../Components/Sidebar";
import { api } from "../../services/axios";
import { useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function UsersList() {
  const [page, setPage] = useState(1)

  //useQuery é o método que irá fazer a requisição para o backend e armazenar os dados em cache
  //useQuery recebe como primeiro parâmetro uma chave que servirá para identificar e acessar os dados em cache
  //como segundo parâmetro ele recebe uma função que retorna os dados
  //o retorno "data" é o equeivalente ao retorno users
  const { data, isLoading, error, isFetching } = useUsers(page)
  //useUsers é um hook que nós criamos para cuidar da parte de pegar e tratar os dados

  //fazer um carregamento prévio dos dados
  //no momento em que passar o mouse por cima do nome do usuário, o seu ID
  //será enviado para a função handlePrefetchUser, em seguido enviado para o queryCLient.prefetchQuery
  //para ser armazenado na chave de cache "user", e sempre que for auterado o "userId", um novo prefetch
  //será realizado
  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(["user", userId], async () => {
      const response = await api.get(`/users/${userId}`)

      return response.data
    }, {
      staleTime: 1000 * 60 * 10 // 10 minutos
    })
  }

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true
  })

  return (
    <Box>
      <Header />

      <Flex display={["block", "flex"]} width="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />

        <Box flex="1" borderRadius="8" bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
            <Flex align="center" >
              Usuários
              { !isLoading && isFetching && <Spinner fontSize="sm" color="gray.500" ml="4" /> }
            </Flex>
            </Heading>
            <Box>
              <NextLink href="/users/create" passHref >
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="pink"
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                  marginRight="auto"
                >
                  Criar Novo
                </Button>
              </NextLink>
            </Box>
          </Flex>
          
          { isLoading ? (
            <Flex justify="center" >
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center" >
              <Text>Falha ao obter os dados dos usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
              <Thead>
                <Tr>
                  <Th px={["4", "4", "6"]} color="gray.300" width="8">
                    <Checkbox colorScheme="pink" />
                  </Th>
                  <Th>Usuários</Th>
                  { isWideVersion && <Th>Data de cadastro</Th> }
                  <Th width="8"></Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.users.map(user => (
                  <Tr key={user.id} >
                  <Td px={["4", "4", "6"]}>
                    <Checkbox colorScheme="pink" />
                  </Td>
                  <Td>
                    <Box>
                      <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)} >
                        <Text fontWeight="bold">{user.name}</Text>
                      </Link>

                      <Text fontSize="sm" color="gray.300">
                        {user.email}
                      </Text>
                    </Box>
                  </Td>
                  { isWideVersion && <Td>{user.createdAt}</Td> }
                </Tr>
                ))}
              </Tbody>
              </Table>

              <Pagination 
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          ) }

        </Box>
      </Flex>
    </Box>
  );
}
