import { Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Td, Tbody, Checkbox, Text, useBreakpointValue } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

export default function UserList() {
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">
                            Usuários
                        </Heading>

                        <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="pink"
                            leftIcon={<Icon as={RiAddLine} />}
                        >
                            Criar novo
                        </Button>
                    </Flex>

                    <Table colorScheme="whiteAlpha">
                        <Thead>
                            <Tr>
                                <Th px={["4", "4", "6"]} color="gray.300" w="8">
                                    <Checkbox colorScheme="pink" />
                                </Th>
                                <Th>
                                    Usuário
                                </Th>

                                {isWideVersion && <Th> Data de Cadastro</Th>}
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td px={["4", "4", "6"]}>
                                    <Checkbox colorScheme="pink" />
                                </Td>
                                <Td>
                                    <Box>
                                        <Text fontWeight="bold">Augusto Barreira</Text>
                                        <Text fontWeight="bold">barreira266@hotmail.com</Text>
                                    </Box>
                                </Td>
                                {isWideVersion && <Td>12 de Março de 2021</Td>}
                                <Td>
                                    {isWideVersion && (
                                        <Button
                                            as="a"
                                            size="sm"
                                            fontSize="sm"
                                            colorScheme="purple"
                                            leftIcon={<Icon as={RiPencilLine} />}
                                        >
                                            Editar usuário
                                        </Button>
                                    )}
                                </Td>
                            </Tr>
                            <Tr>
                                <Td px={["4", "4", "6"]}>
                                    <Checkbox colorScheme="pink" />
                                </Td>
                                <Td>
                                    <Box>
                                        <Text fontWeight="bold">Augusto Barreira</Text>
                                        <Text fontWeight="bold">barreira266@hotmail.com</Text>
                                    </Box>
                                </Td>
                                {isWideVersion && <Td>12 de Março de 2021</Td>}
                                <Td>
                                    {isWideVersion && (
                                        <Button
                                            as="a"
                                            size="sm"
                                            fontSize="sm"
                                            colorScheme="purple"
                                            leftIcon={<Icon as={RiPencilLine} />}
                                        >
                                            Editar usuário
                                        </Button>
                                    )}
                                </Td>
                            </Tr>
                            <Tr>
                                <Td px={["4", "4", "6"]}>
                                    <Checkbox colorScheme="pink" />
                                </Td>
                                <Td>
                                    <Box>
                                        <Text fontWeight="bold">Augusto Barreira</Text>
                                        <Text fontWeight="bold">barreira266@hotmail.com</Text>
                                    </Box>
                                </Td>
                                {isWideVersion && <Td>12 de Março de 2021</Td>}
                                <Td>
                                    {isWideVersion && (
                                        <Button
                                            as="a"
                                            size="sm"
                                            fontSize="sm"
                                            colorScheme="purple"
                                            leftIcon={<Icon as={RiPencilLine} />}
                                        >
                                            Editar usuário
                                        </Button>
                                    )}
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>

                    <Pagination />
                </Box>
            </Flex>
        </Box>
    )
}