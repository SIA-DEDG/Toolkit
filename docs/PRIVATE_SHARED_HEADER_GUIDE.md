# Guia completo do header privado SIA-DEDG

Este guia descreve como instalar, configurar, implementar, publicar e atualizar o pacote privado `@sia-dedg/shared-ui` em projetos React. Os exemplos usam npm, Vite, React e Vercel, mas a autenticação do GitHub Packages é a mesma para outros consumidores npm.

## 1. O que vem da biblioteca

A biblioteca centraliza:

- cabeçalho institucional responsivo;
- catálogo e links dos projetos SIA;
- controles de tamanho da interface;
- navegação azul sticky;
- menu mobile;
- busca acessível baseada em um adaptador fornecido pelo projeto;
- botão de retorno ao topo;
- tipos TypeScript e estilos Tailwind compilados.

O projeto consumidor continua responsável por sua logo, página inicial, seções, conteúdo pesquisável e ações de navegação.

## 2. Pré-requisitos

- Node.js 20 ou 22;
- npm;
- acesso à organização GitHub `SIA-DEDG`;
- acesso de leitura ao pacote privado `@sia-dedg/shared-ui`;
- Personal Access Token clássico do GitHub com `read:packages`;
- autorização SSO do token, quando a organização exigir.

O token de leitura é usado somente para baixar o pacote. Não conceda `write:packages` aos projetos consumidores.

## 3. Configurar o registro privado

Crie `.npmrc` na raiz do projeto:

```ini
@sia-dedg:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

Esse arquivo deve ser versionado exatamente dessa forma. Nunca substitua `${NPM_TOKEN}` pelo token real.

## 4. Instalar localmente

No PowerShell, defina o token apenas na sessão atual:

```powershell
$env:NPM_TOKEN = 'SEU_TOKEN_GITHUB'
npm install @sia-dedg/shared-ui@0.1.13 --save-exact
```

O token deixa de existir quando essa janela do terminal é fechada. Se `node_modules` já estiver atualizado, executar a aplicação não exige o token:

```powershell
npm run dev
```

O token volta a ser necessário para `npm install`, `npm ci` ou atualização da biblioteca.

## 5. Importar os estilos

Importe os estilos uma única vez no arquivo de entrada, depois dos estilos globais do projeto:

```jsx
import './index.css'
import '@sia-dedg/shared-ui/styles.css'
```

Não copie o CSS da biblioteca para o projeto consumidor. O pacote já entrega o Tailwind compilado com prefixo `sia-` para evitar colisões.

## 6. Implementar o componente

Exemplo básico:

```jsx
import { SiaHeader } from '@sia-dedg/shared-ui'

const navigationItems = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'servicos', label: 'Serviços' },
]

export function ProjectHeader() {
  return (
    <SiaHeader
      activeNavigationId="sobre"
      currentProject="toolkit"
      desktopLogoHeight={76}
      desktopLogoWidth={146}
      homeHref="/"
      logoAlt="Nome acessível do projeto"
      logoSrc="/assets/shared/logo.svg"
      navigationItems={navigationItems}
      onNavigation={(id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
      searchLabel="Buscar conteúdo"
      searchPlaceholder="Buscar no projeto"
    />
  )
}
```

Parâmetros principais:

- `currentProject`: identifica o item ativo no catálogo central;
- `logoSrc` e `logoAlt`: imagem e descrição acessível obrigatórias;
- `desktopLogoWidth` e `desktopLogoHeight`: dimensões da marca no desktop;
- `homeHref`: rota interna aberta ao clicar na logo;
- `navigationItems`: botões específicos da faixa azul;
- `activeNavigationId`: seção selecionada;
- `onNavigation`: ação ao clicar em uma seção;
- `fontScale` e `onFontScaleChange`: integração opcional com a escala da página;
- `utilityHref`: transforma “Site SIA” em link quando a URL oficial estiver disponível;
- `utilityTarget`: `_self` ou `_blank`;
- `search`: adaptador de busca do consumidor;
- `backToTopThreshold`: altura de rolagem para exibir o retorno ao topo.

## 7. Integrar uma busca própria

A biblioteca não conhece os dados de cada projeto. O consumidor entrega um adaptador:

```jsx
const searchAdapter = {
  resolve(query, signal) {
    return itens.filter((item) => item.titulo.toLowerCase().includes(query.toLowerCase()))
  },
  getId: (item) => item.id,
  getLabel: (item) => item.titulo,
  getDescription: (item) => item.descricao,
  apply(item) {
    abrirItem(item.id)
  },
}

<SiaHeader search={searchAdapter} />
```

`resolve` pode ser síncrono ou assíncrono. Em buscas assíncronas, respeite o `AbortSignal` para cancelar respostas antigas.

No Toolkit, `useSiteSearchAdapter` em `src/components/SiteSearch.jsx` preserva o índice, a navegação, a abertura de instrumentos e os downloads existentes.

## 8. Cadastrar um novo projeto no menu

O catálogo não é alterado no consumidor. Na biblioteca `shared-ui`:

1. adicione o identificador em `HeaderProjectId`;
2. inclua o projeto em `SIA_PROJECTS`, dentro de `src/config/projects.ts`;
3. use URL HTTPS real e `status: 'available'`;
4. enquanto não houver URL real, use `status: 'pending'`;
5. valide, publique uma nova versão e atualize todos os consumidores.

Exemplo:

```ts
{
  id: 'novo-projeto',
  label: 'Novo Projeto',
  url: 'https://projeto.exemplo.gov.br/',
  status: 'available',
}
```

## 9. Configurar na Vercel

Em **Project → Settings → Environment Variables**, cadastre:

```text
NPM_TOKEN=SEU_TOKEN_GITHUB
```

Marque Production, Preview e Development conforme a necessidade. `NPM_TOKEN` não começa com `VITE_` e, portanto, não é incorporado ao JavaScript do navegador.

Para o Toolkit, também configure:

```text
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=SUA_CHAVE_PUBLICAVEL
VITE_SUPABASE_BUCKET=sia-arquivos
```

Configuração de build:

```text
Framework Preset: Vite
Install Command: npm install
Build Command: npm run build
Output Directory: dist
Node.js: 20 ou 22
```

Depois de adicionar ou alterar variáveis, faça um novo deploy. Quando o deploy anterior falhou no `npm install`, faça o redeploy sem reutilizar o Build Cache.

## 10. Atualizar a biblioteca

Os projetos consomem uma versão publicada, nunca a branch `main` ou uma pasta local. Depois que uma nova tag estiver publicada no GitHub Packages:

```powershell
$env:NPM_TOKEN = 'SEU_TOKEN_GITHUB'
npm install @sia-dedg/shared-ui@NOVA_VERSAO --save-exact
npm run build
npm ls @sia-dedg/shared-ui
git add package.json package-lock.json
git commit -m "chore: atualiza shared-ui para NOVA_VERSAO"
git push origin main
```

O push do consumidor inicia o novo deploy da Vercel quando o repositório está conectado.

## 11. Validação mínima

Confira no desktop e mobile:

- logo abre a página inicial;
- “Projetos” lista os destinos e identifica o projeto atual;
- links entre projetos abrem as URLs publicadas;
- busca encontra e aplica resultados;
- navegação azul permanece sticky;
- escala A-/A+ afeta a página conforme esperado;
- menu mobile abre, fecha e restaura o foco;
- build termina sem erro.

Comandos úteis:

```powershell
npm ls @sia-dedg/shared-ui
npm run build
```

## 12. Erros comuns

### `401 Unauthorized`

O token não foi informado, expirou ou não pode autenticar. Confirme `NPM_TOKEN`, `read:packages` e SSO.

### `403 Forbidden`

O usuário do token não possui acesso ao pacote/organização ou o token tem escopos inadequados.

### `Failed to resolve import "@sia-dedg/shared-ui"`

O pacote não foi instalado. Defina `NPM_TOKEN`, execute `npm install` e confirme com `npm ls`.

### Header sem estilo

Confirme a importação:

```jsx
import '@sia-dedg/shared-ui/styles.css'
```

### Nova versão não aparece

Confirme que o workflow da tag publicou o pacote antes de executar o `npm install`. Uma tag no GitHub não significa necessariamente que o pacote já chegou ao GitHub Packages.

## 13. Regras de segurança

- nunca versione tokens ou arquivos `.env`;
- use apenas `read:packages` nos consumidores;
- revogue imediatamente tokens expostos;
- não use prefixo `VITE_` em tokens privados;
- mantenha a dependência com versão explícita durante a fase inicial;
- revise URLs do catálogo antes de publicar;
- mantenha `.env.example` somente com nomes e valores fictícios.
