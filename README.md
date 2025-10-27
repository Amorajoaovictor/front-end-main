# DistriSchool - Mock Frontend (React)

Aplicação frontend mock para o repositório unifor-online/distrischool.

Tecnologias:
- React (create-react-app style)
- Simulação de REST via src/services/api.js
- Simulação de WebSocket via src/services/websocket.js

Funcionalidades:
- Dashboard de gestão
- Cadastro de alunos e professores
- Registro de presenças e notas
- Relatórios e análises (simples)
- Portal para pais
- Notificações em tempo real (mock)

Como rodar:
1. Crie a pasta do projeto e coloque os arquivos a seguir.
2. Rode `npm install`
3. Rode `npm start`

Próximos passos e integração com backend real:
- Substituir src/services/api.js por chamadas reais para o backend Spring (REST).
- Substituir src/services/websocket.js por uma implementação WebSocket real (p.ex. usando WebSocket API ou socket.io).
- Adicionar autenticação, proteção de rotas, e melhorias de UI/UX.

Observação: Este é um protótipo simples para demonstração e integração inicial.