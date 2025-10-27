# DistriSchool - Frontend (Next.js)

Aplicação frontend para o repositório unifor-online/distrischool.

## Tecnologias

- **Next.js 14** - Framework React moderno com renderização otimizada
- **React 18** - Biblioteca para construção de interfaces
- Simulação de REST via `lib/api.js`
- Simulação de WebSocket via `lib/websocket.js`

## Funcionalidades

- Dashboard de gestão com estatísticas
- Cadastro de alunos e professores **com paginação**
- Registro de presenças e notas
- Relatórios e análises (simples)
- Portal para pais
- Notificações em tempo real (mock)

## Estrutura do Projeto

```
├── app/                    # Next.js App Directory
│   ├── layout.js          # Layout raiz
│   ├── page.js            # Página principal
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── ui/               # Componentes reutilizáveis (Pagination)
│   ├── Dashboard.js
│   ├── Students.js       # Com paginação
│   ├── Teachers.js       # Com paginação
│   └── ...
├── lib/                   # Utilitários e serviços
│   ├── api.js            # API mock com suporte a paginação
│   └── websocket.js      # WebSocket mock
└── next.config.js         # Configuração Next.js
```

## Como rodar

1. Clone o repositório
2. Rode `npm install` para instalar as dependências
3. Rode `npm run dev` para iniciar o servidor de desenvolvimento
4. Acesse http://localhost:3000

## Scripts disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm start` - Inicia servidor de produção
- `npm run lint` - Executa linter

## Paginação

As listas de alunos e professores agora possuem paginação implementada:
- 5 itens por página (configurável)
- Navegação entre páginas
- Exibição do total de registros
- Controles de página anterior/próxima

## Próximos passos e integração com backend real

- Substituir `lib/api.js` por chamadas reais para o backend Spring (REST)
- Substituir `lib/websocket.js` por uma implementação WebSocket real
- Adicionar autenticação e proteção de rotas
- Implementar validação de formulários
- Adicionar testes automatizados
- Melhorias de UI/UX

## Observação

Este é um protótipo para demonstração e integração inicial com mock de dados.