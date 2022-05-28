import { createServer, Model } from 'miragejs'

type User = {
    email: string;
    password: string;
    created_at: string;
}

//Models no mirage são equivalentes a tabelas em um banco de dados
//nesse caso tabela user

//A tipagem "Partial" é utilizada para definir que você pode não precisar sempre
//de todos os dados, apenas alguns
export function makeServer() {
    const server = createServer({
        models: {
            user: Model.extend<Partial<User>>({})
        },


        //quando a rota /users for chamada os dados serão inseridos ou capturados
        //de dentro da tabela users
        routes() {
            //caminho padrão da rota
            this.namespace = '/api'

            //tempo de delay para testar os spinners
            this.timing = 750

            this.get('/users')
            this.post('/users')

            //resetar o namespace para não confundir com a pasta "api" do Next caso esteja usando as api's routes
            this.namespace = ''

            //todas as chamadas que forem enviadas para a rota "api" passem pelo mirage, e caso não forem detectadas
            //pelas rotas do mirage, elas irão passar adiante e retornar para sua origem

            //geralmente esse método é utilizado quando se está utilizando Next devido as api routes
            this.passthrough()
        }
    })

    return server
}