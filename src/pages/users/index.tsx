import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine } from "react-icons/ri";
import { Header } from "../../Components/Header";
import { Pagination } from "../../Components/Pagination/Pagination";
import { SideBar } from "../../Components/Sidebar";

export default function UsersList() {
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
            <Heading size="lg" fontWeight="normal"></Heading>
            <Box>
              <Link href="/users/create" passHref >
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
              </Link>
            </Box>
          </Flex>
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
              <Tr>
                <Td px={["4", "4", "6"]}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Elisio Wander</Text>

                    <Text fontSize="sm" color="gray.300">
                      Elisio741@hotmail.com
                    </Text>
                  </Box>
                </Td>
                { isWideVersion && <Td>22/040/2022</Td> }
              </Tr>
            </Tbody>
            <Tbody>
              <Tr>
                <Td px={["4", "4", "6"]}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Elisio Wander</Text>

                    <Text fontSize="sm" color="gray.300">
                      Elisio741@hotmail.com
                    </Text>
                  </Box>
                </Td>
                { isWideVersion && <Td>22/040/2022</Td> }
              </Tr>
            </Tbody>
          </Table>

          <Pagination />
        </Box>
      </Flex>
    </Box>
  );
}
