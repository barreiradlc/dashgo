import { Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Td, Tbody, Checkbox, Text, useBreakpointValue, Spinner, Link as ChakraLink } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { useQuery } from "react-query";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { client } from "../../services/queryClient";



export default function UserList({ users }) {
    const [ currentPage, setCurrentPage ] = useState(1)
    const { data, isLoading, error, isFetching } = useUsers(currentPage)

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    async function handlePrefetchUser(userId: string){
        await client.prefetchQuery(['user', userId], async () => {
            const { data } = await api.get(`/users/${userId}`)

            return data
        }, {
            staleTime: 1000* 60 * 10
        })
    }

    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">
                            Usuários

                            {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" /> }
                        </Heading>

                        <Link href="users/create" passHref >
                            <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="pink"
                                leftIcon={<Icon as={RiAddLine} />}
                            >
                                Criar novo
                            </Button>
                        </Link>
                    </Flex>

                    {isLoading ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Falha ao obter dados de usuários</Text>
                        </Flex>
                    ) : (
                        <>
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
                                    {data.users.map(user => (
                                    <Tr key={user.id}>
                                        <Td px={["4", "4", "6"]}>
                                            <Checkbox colorScheme="pink" />
                                        </Td>
                                        <Td>
                                            <Box>
                                                <ChakraLink color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                                                    <Text fontWeight="bold">{user.name}</Text>
                                                </ChakraLink>
                                                <Text fontWeight="bold">{user.email}</Text>
                                            </Box>
                                        </Td>
                                        {isWideVersion && <Td>{user.createdAt}</Td>}
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
                                    ))}

                                </Tbody>
                            </Table>
                            <Pagination 
                                totalCountOfRegisters={data.totalCount}
                                currentPage={currentPage}
                                onPageChange={setCurrentPage}
                            />
                        </>
                    )}

                </Box>
            </Flex>
        </Box >
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const { users } = await getUsers(1)

    return {
        props: {
            users,
        }
    }
}