## Padronização de Versionamento (Git)

- GitFlow
    - Nomes de branch: feature/nome-da-feature; bugfix/nome-do-bugfix
- Commits: [Commits convencionais](https://medium.com/linkapi-solutions/conventional-commits-pattern-3778d1a1e657) enforçado via [Commitlint](https://commitlint.js.org/#/)
    - type: subject(imperative)
    - sempre em português
    - possíveis `types` são
        - test: indica qualquer tipo de criação ou alteração de códigos de teste. 
        - feat: indica o desenvolvimento de uma nova feature ao projeto
        - refactor: usado quando houver uma refatoração de código que não tenha qualquer tipo de impacto na lógica/regras de negócio do sistema. 
        - style: empregado quando há mudanças de formatação e estilo do código que não alteram o sistema de nenhuma forma.
        - fix: utilizado quando há correção de erros que estão gerando bugs no sistema.
        - chore: indica mudanças no projeto que não afetem o sistema ou arquivos de testes. São mudanças de desenvolvimento.
        - docs: usado quando há mudanças na documentação do projeto.
        - build: utilizada para indicar mudanças que afetam o processo de build do projeto ou dependências externas.
        - perf: indica uma alteração que melhorou a performance do sistema.
        - ci: utilizada para mudanças nos arquivos de configuração de CI.
        - revert: indica a reverão de um commit anterior.

## Styleguide

Convenções de estilo são enforçados por [ESLint](.eslintrc.js) e [Prettier](.prettierrc).

- Always semicolons
- Single quotes
- Two space indentation
- Trailing commas in arrays and objects
- Module imports are ordered and separated: **built-in** -> **external** -> **internal** -> **css/assets/other**
- TypeScript: strict mode, with no implicitly any
- React: functional style with Hooks (no classes)
- `const` preferred over `let`

- Priorize `import AppBar from '@mui/material/AppBar';` sobre `import { AppBr } from '@mui/material';`. Dessa forma temos
um ganho de performance, pricipalmente ao importar icones

<!-- Falta atualizar as duas seções abaixo -->

## Latest Versions used in this project

- React Router v6
- Material UI v5
- Express + Typescript [Setup](https://blog.logrocket.com/how-to-set-up-node-typescript-express/)

## Observações

- `React.StrictMode` renderiza componentes duas vezes seguidas (apenas em dev, não em prod) para detectar possíveis problemas.
Para parar isso é só remover as tags dele no JSX em `index.tsx`. [Mais info aqui](https://stackoverflow.com/a/61897567/16855638)
- Uso de context global (MainContext) causa renderização de todos os filhos (ou seja, todos os componentes do AppRoutes) quando há mudanças no state do context. Se estiver tendo problemas de performance em prod pode ser causado por isso. Do jeito que foi feito, por exemplo, toda vez que chamar o Snackbar do context vai causar renderizações do Main.tsx e do componente que chamou o Snackbar (não está chamando todos os filhos, apenas o Main e o que chamou).
- Para customizar o layout e cores com o MUI, basta inspecionar o element com o dev tools, achar o nome e aplicar o override no theme.ts. Com o MUi v5 e Typescript fica bem mais fácil de fazer.
- Para configurar o mongo localmente: 
  - siga o link do [Stack Overflow](https://stackoverflow.com/a/37548118/16855638)
  - adaptar o CD para o seu caso (usei 5.0 em vez 3.2 no CD)
  - va no mongo compass e crie o banco local com o nome boilerplate, e crie a collections clients
