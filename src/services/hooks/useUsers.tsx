import { useQuery } from "react-query";
import { api } from "../axios";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

//separar a função de pegar os dados dos usuário para poder aproveitar a funcionalidade sem estar
//diretamente atrelada ao useQuery
export async function getUsers(): Promise<User[]> {
  const response = await api.get("/users");
  //formatação dos dados
  //o useQuery sempre retorna os dados dentro de um array
  /* response {
      users: [
        user {
        name:jhon doe,
        email: jhonDoe@hotmail.com,
        createdAt: 2022-05-22T01:04:29.420Z
        }
      ]
  }
    */
  const users = response.data.users.map(user => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  return users;
}

export function useUsers() {
  //useQuery é o método que irá fazer a requisição para o backend e armazenar os dados em cache
  //useQuery recebe como primeiro parâmetro uma chave que servirá para identificar e acessar os dados em cache
  //como segundo parâmetro ele recebe uma função que retorna os dados
  //o retorno "data" é o equeivalente ao retorno users
  return useQuery("usersCache", getUsers, {
    staleTime: 1000 * 5,
  });
}
