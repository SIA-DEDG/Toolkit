# Processo Flow – PD&I

Sistema de fluxo de processo para Acordos de Parceria em Pesquisa, Desenvolvimento e Inovação.

## Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3**
- Fonte: Inter (Google Fonts)

## Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em desenvolvimento
npm run dev

# 3. Build para produção
npm run build
```

## Estrutura do projeto

```
processo-flow/
├── public/
│   └── assets/          ← Ilustrações das etapas (PNG)
│       ├── cuate.png
│       ├── documentos.png
│       ├── lawyer.png
│       ├── schedule.png
│       ├── ageement.png
│       ├── consent.png
│       ├── Acordo_PD_I.png
│       ├── sent-message.png
│       └── publish-article.png
├── src/
│   ├── components/
│   │   ├── ProcessFlowPage.jsx  ← Página principal
│   │   ├── ProcessCard.jsx      ← Cards flutuantes
│   │   ├── ProcessNode.jsx      ← Nós do fluxo (círculo, diamante, triângulo)
│   │   ├── SnakePath.jsx        ← SVG do caminho serpentine
│   │   └── DownloadButton.jsx   ← Botão de download
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Adicionando novas telas

Crie um novo componente em `src/components/` e adicione a rota no `App.jsx`.
