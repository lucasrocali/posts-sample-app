# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   yarn install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Requisitos

1. Listagem de Posts:
   - [x] a. Exibir lista de posts com título e resumo do conteúdo
   - [x] b. Paginação ou scroll infinito
2. Visualizar detalhes de um post:
   - [x] a. Visualizar conteúdo do post
   - [x] b. Visualizar comentários de cada post
   - [x] c. Exibir nome do autor e corpo do comentário
3. Busca:
   - [x] a. Implementar barra de pesquisa para filtrar posts por título ou conteúdo
4. Tratamento de Erros:
   - [x] a. Feedback visual para o usuário
   - [x] b. Indicadores de carregamento
5. Testes
   - [x] Testes tela Posts
   - [x] Testes tela Post Detail

## Arquitetura

[react-query](https://tanstack.com/query/latest) é uma biblioteca que facilita o gerenciamento de dados remotos no React. Ela oferece cache automático das queries, centraliza os gerenciamento de dados por hooks, simplifica a paginação, e estados claros de status, erro e sucesso.

[expo-router](https://docs.expo.dev/versions/latest/sdk/router/) utiliza o sistema de arquivos como estrutura de navegação. É uma abstração sobre a biblioteca [react-navigation](https://reactnavigation.org/), oferecendo uma forma mais simples e performática de implementar navegação em aplicativos React Native, com suporte nativo a deep linking, stacks e layouts dinâmicos.

[@testing-library/react-native](https://callstack.github.io/react-native-testing-library/) é uma biblioteca de testes para componentes React Native, baseada nos princípios da Testing Library. Ela promove testes que simulam o comportamento real do usuário, ao invés de testar detalhes de implementação. Oferece utilitários como `render`, `getByText`, `fireEvent.press` que facilitam na validação de requisitos.

Por exemplo:

```
  test("1.a - should show posts and navigate to /posts/[id]", async () => {
    mockedFetchPosts.mockResolvedValueOnce([POST_1, POST_2]); //<== faz o mock do retorno da api pela função 'fetchPosts'

    const { findByTestId, getByTestId, findByText } = renderWithQueryClient(
      <PostsScreen />
    );

    await waitForElementToBeRemoved(() =>
      getByTestId("loading-activity-indicator")
    ); //<== valida que o component de carregamento é mostrado enquanto carrega e então removido

    await findByText(POST_1.title); //<== valida que o conteudo do post foi mostrado

    await findByText(POST_2.title);

    fireEvent.press(getByTestId(`post-${POST_1.id}`)); //<== simula um evento 'onPress' no componente PostCell

    expect(router.navigate).toHaveBeenCalledWith(`/posts/${POST_1.id}`); //<== valida que após clicar no botão foi redirecionado para a tela correta
  });
```

## Limitações

> a. Implementar barra de pesquisa para filtrar posts por título ou conteúdo

A api parece ter filtragem apenas se o texto for exato `title` ou `body` for exato, (por exemplo https://jsonplaceholder.typicode.com/posts?title=qui%20est%20esse). Por esse motivo a busca foi feita filtrando no conteudo local já carregado.

https://jsonplaceholder.typicode.com/guide/

https://github.com/typicode/json-server
