
import { Box, Flex, Heading, Divider, SimpleGrid, VStack, HStack, Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { client } from "../../services/queryClient";
import { useRouter } from "next/router";


type CreateUserFormData = {
  name: string;
  email: string;
  password: string
  password_confirmation: string
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password')
  ], 'A senha e confirmação não batem'),
})

export default function UserForm() {
  const router = useRouter()
  const createUser = useMutation(async (userData: CreateUserFormData) => {
    const { data } = await api.post('users', {
      user: {
        ...userData,
        created_at: new Date().toString(),
      }
    })

    return data
  }, {
    onError: (error) => {
      console.log('error', error)
    },
    onSuccess: () => {
      client.invalidateQueries('users')
    }
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema)
  })
  const { errors } = formState

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    await createUser.mutateAsync(values)

    router.push('/users')
  }


  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
        as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          onSubmit={handleSubmit(handleCreateUser)}
          p={["6","8"]}>
          <Heading size="lg" fontWeight="normal">Criar usuário</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid
              minChildWidth="240px"
              spacing={["6", "8"]}
              w="100%"
            >
              <Input
                name="name"
                label="Nome completo" 
                error={errors.name}
            {...register('name')}  
              />
              <Input
                name="email"
                label="E-mail"
                type="email"
                error={errors.email}
            {...register('email')}
                />

            </SimpleGrid>

            <SimpleGrid
              minChildWidth="240px"
              spacing={["6", "8"]}
              w="100%"
            >
              <Input
                name="password"
                label="Senha"
                type="password"
                error={errors.password}
            {...register('password')}
                />
              <Input
                name="password_confirmation"
                label="Confirmar senha"
                type="password"
                error={errors.password_confirmation}
            {...register('password_confirmation')}
                />

            </SimpleGrid>
          </VStack>

          <Flex
            mt="8"
            justify="flex-end"
          >
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button
                  as="a"
                  colorScheme="whiteAlpha"
                >
                  Cancelar
                </Button>
              </Link>
              <Button
              type="submit"
                colorScheme="pink"
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}