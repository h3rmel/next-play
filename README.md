# Próxima Jogada

Aplicativo web progressivo (PWA) para gerar times de forma rápida e simples.

Hospedado na [Vercel](https://vercel.com), você pode acessá-lo por [este link](https://next-play-hermel.vercel.app/).

## Como executar o projeto

### Pré-requisitos
- Node.js (versão 20 ou superior)
- pnpm (ou npm/yarn)

### Passo a passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/h3rmel/next-play.git
   cd next-play
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