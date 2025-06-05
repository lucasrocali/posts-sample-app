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
   - [ ] Testes tela Posts
   - [ ] Testes tela Post Detail

## Limitações

> a. Implementar barra de pesquisa para filtrar posts por título ou conteúdo

A api parece ter filtragem apenas se o texto for exato `title` ou `body` for exato, (por exemplo https://jsonplaceholder.typicode.com/posts?title=qui%20est%20esse). Por esse motivo a busca foi feita filtrando no conteudo local já carregado.

https://jsonplaceholder.typicode.com/guide/

https://github.com/typicode/json-server
