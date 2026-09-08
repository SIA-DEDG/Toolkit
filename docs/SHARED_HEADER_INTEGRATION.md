# Header compartilhado no Toolkit

O Toolkit consome o pacote privado `@sia-dedg/shared-ui`. O header institucional, o catálogo de projetos, os controles de acessibilidade, a navegação sticky, o menu mobile e o botão de retorno ao topo vêm da biblioteca.

## Instalação local

Defina um token clássico do GitHub com `read:packages` na sessão do PowerShell e instale:

```powershell
$env:NPM_TOKEN = 'seu-token'
npm install
```

O token real não deve ser salvo no projeto. A `.npmrc` contém somente `${NPM_TOKEN}`.

## Configuração do Toolkit

O componente é usado em `src/page/HomePage.jsx` com:

```jsx
<SiaHeader
  currentProject="toolkit"
  desktopLogoHeight={76}
  desktopLogoWidth={146}
  logoAlt="Toolkit de Compras Públicas de Inovação"
  logoSrc="/assets/shared/logo.svg"
  navigationItems={navigationItems}
  search={searchAdapter}
/>
```

A busca continua usando o índice e as ações do Toolkit. `useSiteSearchAdapter`, em `src/components/SiteSearch.jsx`, adapta os resultados para o contrato da biblioteca.

## Atualização

Depois de publicar uma nova tag da biblioteca:

```powershell
$env:NPM_TOKEN = 'seu-token'
npm install @sia-dedg/shared-ui@NOVA_VERSAO --save-exact
npm run build
```

Versione `package.json` e `package-lock.json`. Nunca aponte para uma pasta local ou para a branch `main`.

## Deploy

Na Vercel, cadastre `NPM_TOKEN` em **Settings → Environment Variables**. As variáveis públicas já usadas pelo Toolkit (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` e, quando necessário, `VITE_SUPABASE_BUCKET`) continuam sendo configuradas normalmente.
