# Escopo inicial

Esse é um detalhamento inicial podendo sofrer alterações.

Tecnologias a serem utilizadas no projeto:

- [Nodejs](https://nodejs.org/)
- [NextJs](https://nextjs.org/)
- [React](https://pt-br.reactjs.org/)
- [Prisma](https://www.prisma.io/)
- [Mysql](https://www.mysql.com/)
- Hospedagem na [Vercel](https://vercel.com/)
- Versionamento [Github](https://github.com/)

## Usuários

Deve haver um cadastro de usuários habilitados para fazer login de operação do sistema, com campos `id`, `name`, `email`, `phone`, `actived`

- [x] Deve haver uma página para listar usuários, com possibilidade de adicionar, alterar e excluir.
  - [x] <s>_backend_ - CRUD users</s>
  - [x] Alterar Usuário
  - [x] Excluir/Desativar usuário _(Switch)_
  - [x] Listar Usuários

---

## Clientes

Lista de clientes utilizando FlatList

O cadastro do cliente deve conter no mínimo os campos `id`, `name`, `phone`, `actived`

- [x] Deve haver uma página para listar clientes, com possibilidade de adicionar, alterar e excluir.

  - [x] _backend_ - CRUD clients
  - [x] Alterar Cliente
  - [x] Cadastrar cliente
  - [x] Excluir/Desativar cliente
  - [x] Listar clientes

  _obs: fazer tal coisa depois_

---

## Tipos de bordados/posição

Deve haver uma página que permita configurações de _tipo_ e _posicionamento_ de bordados, como estrutura de _categoria_ e _subcategoria_, seguindo o **exemplo** abaixo:

- **Camisa**
  - Peito direito
  - Peito esquerdo
  - Costa
- **Manga**
  - Central
- **Bolso**
  - Central
- **Boné**
  - Frente
  - Costa
  - Direito
  - Esquerdo

### Tipo de bordado

- [x] Deve ser possível cadastrar o tipo de bordado com campos `id`, `label`, `description`, `actived` e `image`.
  - [x] _backend_ - CRUD embType
  - [x] Ativar ou Desativar **tipo de bordado** para não aparecer na inclusão do pedido.
  - [x] listar tipos de bordados
  - [x] Alterar tipo de bordado
  - [x] Incluir tipo de bordado
  - [ ] Deve ser possível determinar uma imagem ilustrativa para o tipo de bordado

### Posicionamento do bordado

- [x] Deve ser possível cadastrar a **posição do bordado** com campos `id`, `embTypeId`, `label`, `description`, `actived` e `params`.
      Para cadastrar um posicionamento é necessário informar o **tipo de bordado**, **rótulo**, não sendo obrigatório **descrição** ou **parâmetros de posição**
  - [x] _backend_ - CRUD embPosition
  - [x] Ativar ou Desativar **posição de bordado** para não aparecer na inclusão do pedido.
  - [x] listar posições do bordado
  - [x] Alterar informações de posição de bordado
  - [x] Incluir informações de posição de bordado

---

## Pedidos (O.S.)

- [ ] Tela para inclusão de pedido
  - [ ] Para incluir um pedido é preciso selecionar um **cliente**, bastando selecionar numa lista ou pesquisando seu _nome_ ou _telefone_ num campo de `autocomplete`
  - [ ] Deve haver um botão para inclusão rápida de cliente caso não esteja previamente cadastrado
  - [ ] O pedido precisa informar o **tipo** e **posicionamento** do bordado
  - [ ] Deve haver um campo numérico _não obrigatório_ para informar a quantidade de peças
  - [ ] Deve haver uma caixa de seleção checkbox para marcar se a quantidade de peças foi conferida na entrada
  - [ ] Deve haver um campo monetário _não obrigatório_ para informar o preço do serviço
  - [ ] Deve conter campos para a **data de inclusão** e **data de entrega** do pedido
- [ ] Deve ser possível alterar todas as informações do pedido
- [ ] Cancelar do pedido
- [ ] Deve haver botão para **fechamento do pedido** (FINALIZADO)
- [ ] Deve haver como marcar o pedido como **ENTREGUE**
- [ ] Marcar pedido como **PAGO**

---

## Comportamento do Sistema

- [x] A primeira tela é de login no sistema. Não há possibilidade de navegar ou ver informações sem estar logado.
- [x] Depois do login, tela que aparece é a de inclusão de **pedidos**.
- [x] Deve haver um **menu de navegação** para as funcionalidades citadas acima
- [x] No menu de navegação deve ficar visível o **nome do usuário** logado com possibilidade de **logout**

Informações

- [x] O sistema deve ser online, funcionando no domínio https://sistema.jrbordados.com.br
- [x] O sistema deve ser otimizado para utilização em dispositivos móveis (PWA).

> Não é necessário personalização de Tema, Layout, Design ou Cores, a aparência e estilização serão tratados posteriormente.

---

# Cronograma de execução

O apontamento _exato_ de horas será registrado no [Clockify](https://clockify.me/)

Deve ser aplicado ao projeto a estrutura de _Integração Contínua/Entrega Contínua_ (CI/CD), ou seja, a cada funcionalidade finalizada, a entrega deve ser realizada imediatamente, e informado ao cliente para possíveis anotações, alterações e correções na experiência do usuário e interface do usuário.

| Tarefa                                    | Previsto | Trabalhado  |
| :---------------------------------------- | :------: | :---------: |
|                                           |          |             |
| config de ambiente desenvolvimento        |   ~2h    |     --      |
| configuração de CI/CD                     |   ~1h    |     --      |
| Recursos básicos da API banco de dados    |   ~5h    |     --      |
| login/logout                              |   ~2h    |     --      |
| estrutura de paginação                    |    --    |     9h      |
| cadastro de clientes                      | ~1h 30m  |     --      |
| lista de items do cliente                 |    --    |     1h      |
| incluir/editar formulario do cliente      |    --    |     1h      |
| tipo bordados + posição                   |   ~2h    |     --      |
| inclusão de pedido                        |   ~4h    |     --      |
| listagem de pedidos                       |   ~2h    |     --      |
| listagem e exclusão de usuários           |   ~2h    |     2h      |
| edição de usuários                        |   ~1h    |     1h      |
| listagem de tipos de bordados             |   ~2h    |    1h46m    |
| incluir formulário de tipos de bordados   |   ~2h    |    1h40m    |
| edição do formulário de tipos de bordados |   ~2h    |    1h20m    |
| listagem das posições de bordados         |   ~2h    |     40m     |
| incluir/editar posições dos bordados      |   ~2h    |    1h40m    |
| -                                         |    -     |      -      |
| **Total**                                 | **~21h** | **~21h06m** |

---
