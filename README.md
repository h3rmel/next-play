# Volleyball Sorter

## Descrição

O Volleyball Sorter é um aplicativo web progressivo (PWA) projetado para auxiliar na organização de partidas de voleibol. Este aplicativo facilita o sorteio aleatório de jogadores em times equilibrados e oferece um sistema de placar intuitivo para acompanhar a pontuação durante o jogo.

### Funcionalidades principais:

- **Cadastro de Jogadores**: Interface simples para adicionar o nome de todos os participantes.
- **Sorteio Automático**: Distribui os jogadores aleatoriamente em dois times balanceados.
- **Placar Interativo**: Sistema de pontuação fácil de usar com controles para adicionar ou remover pontos.
- **Modo Offline**: Por ser um PWA, o aplicativo pode ser instalado e usado mesmo sem conexão com a internet.
- **Interface Responsiva**: Experiência otimizada em dispositivos móveis e desktops.

## Como executar o projeto

### Pré-requisitos
- Node.js (versão 20 ou superior)
- pnpm (ou npm/yarn)

### Passo a passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/volleyball-sorter.git
   cd volleyball-sorter
   ```

2. **Instale as dependências**
   ```bash
   pnpm install
   ```

3. **Execute o ambiente de desenvolvimento**
   ```bash
   pnpm dev
   ```
   O aplicativo estará disponível em `http://localhost:5173`

4. **Para build de produção**
   ```bash
   pnpm build
   ```
   Os arquivos otimizados serão gerados na pasta `dist/`

5. **Para visualizar a versão de produção localmente**
   ```bash
   pnpm preview
   ```

## Licença

Este projeto está licenciado sob a Licença [MIT](LICENSE).