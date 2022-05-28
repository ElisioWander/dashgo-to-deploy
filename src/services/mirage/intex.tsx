import { createServer, Factory, Model, Response } from "miragejs";
import { faker } from "@faker-js/faker";

type User = {
  email: string;
  password: string;
  created_at: string;
};

//Models no mirage são equivalentes a tabelas em um banco de dados
//nesse caso tabela user

//A tipagem "Partial" é utilizada para definir que você pode não precisar sempre
//de todos os dados, apenas alguns
export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },

    //as factories posibilita a criação de dados em massa no mirage
    factories: {
      user: Factory.extend({
        //toda prorpiedade dentro das factories pode receber como parâmetro um index
        name(i: number) {
          return `User ${i + 1}`;
        },
        //faker é uma lib que gera dados aleatórios como: email, data, name, etc...
        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        },
      }),
    },

    //posibilita a criação de dados ficticios
    seeds(server) {
      // criar uma lista de 200 usuários baseados nos dados que irão vir de dentro
      // da tabela user
      server.createList("user", 10);
    },

    //quando a rota /users for chamada os dados serão inseridos ou capturados
    //de dentro da tabela users
    routes() {
      //caminho padrão da rota
      this.namespace = "/api";

      //tempo de delay para testar os spinners
      this.timing = 750;

      //schema = banco de dados request = dados que vem da requisição
      this.get("/users", function(schema, request) {
        //pegar os dados que vem da requisição
        const { page = 1, per_page = 10 } = request.queryParams

        //pegar o total de usuários dentro do banco de dados
        const totalUsers = schema.all('user').length

        //lógica de paginação
        //cada página vai ter um total de 10 registros
        //para que a página comece sempre do registro inicial, é necessário pegar a página - 1, ou seja, pegar sempre 
        //a página anterior
        //se a página inicial for 1 e os registros por página for 10, quer dizer que a pagina vai começar do registro 10
        //e isso é um problema. Então, para resolver este problema, é só voltar uma página. Se a página for 1, ela tem que 
        //passar a ser 1 - 1, ou seja, 0.
        const pageStart = Number((page) - 1) * Number(per_page)
        //imagine que a página é a 3, então, vai ficar 3 - 1 = 2 * 10 = 20(página começa no registro 20)
        //exemplo: pageStart = 20 + per_page = 10 = 30, ou seja, registro vai de 20 a 30
        const pageEnd = pageStart + Number(per_page)

        //pegar da tabela user, apenas a quantidade de usuários definido por página
        const users = this.serialize(schema.all('user'))
          .users.slice(pageStart, pageEnd)

        //forma de retornar dados e metadados de dentro do mirage
        return new Response(
          200, //número total de total de registros
          {'x-total-count': String(totalUsers)}, //número total de registros pegos no banco de dados
          { users } //número total de registros por página
        )
      });
      this.post("/users");

      //resetar o namespace para não confundir com a pasta "api" do Next caso esteja usando as api's routes
      this.namespace = "";

      //todas as chamadas que forem enviadas para a rota "api" passem pelo mirage, e caso não forem detectadas
      //pelas rotas do mirage, elas irão passar adiante e retornar para sua origem

      //geralmente esse método é utilizado quando se está utilizando Next devido as api routes
      this.passthrough();
    },
  });

  return server;
}
