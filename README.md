# Portfólio — Luiz Henrique Ferreira

Portfólio pessoal construído com **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS 4** e **Framer Motion**. O projeto usa separação em camadas (`domain`, `application`, `infrastructure`, `presentation`) para organizar regras, dados e interface com baixo acoplamento.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Framer Motion
- pnpm

## Visão geral

O site possui as seções:

- Hero
- Sobre
- Skills
- Projetos
- Contato

Os dados principais da home são carregados no **server** em `src/app/page.tsx` e repassados para os componentes de interface por props. O formulário de contato utiliza uma **API Route** (`src/app/api/contact/route.ts`) com validação de payload e seleção de gateway em `src/infrastructure/factories/createContactMessageGateway.ts`.

Também existem duas versões públicas do currículo:

- `public/curriculo.html`
- `public/curriculo.pdf`

## Estrutura do projeto

```text
src/
├── app/             # App Router, metadata e rota /api/contact
├── domain/          # Entidades, gateways e contratos de use cases
├── application/     # Implementações dos use cases
├── infrastructure/  # Repositórios estáticos, gateways e factories
└── presentation/    # Componentes visuais, layout e UI interativa
```

### Pontos importantes

- Leitura de dados da home: `src/app/page.tsx`
- Composição de use cases para leitura: `src/infrastructure/di/container.ts`
- Dados pessoais estáticos: `src/infrastructure/repositories/StaticPersonalInfoRepository.ts`
- Projetos: `src/infrastructure/repositories/StaticProjectRepository.ts`
- Skills: `src/infrastructure/repositories/StaticSkillRepository.ts`
- Timeline/Sobre: `src/infrastructure/repositories/StaticTimelineRepository.ts`
- Contato: `src/app/api/contact/route.ts`

## Contato

O envio de mensagem funciona por **gateway configurável**:

1. `CONTACT_WEBHOOK_URL`
2. ou `RESEND_API_KEY` + `CONTACT_FROM_EMAIL` + `CONTACT_TO_EMAIL`

Se nenhuma dessas variáveis estiver configurada, a API responde que o serviço está indisponível e o usuário deve usar os links diretos de contato.

## Variáveis de ambiente

Crie um `.env.local` com o que fizer sentido para o seu deploy:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Opção 1: webhook
CONTACT_WEBHOOK_URL=

# Opção 2: Resend
RESEND_API_KEY=
CONTACT_FROM_EMAIL=
CONTACT_TO_EMAIL=
```

## Rodando localmente

Pré-requisitos:

- Node.js 18+
- pnpm

```bash
pnpm install
pnpm dev
```

Acesse:

```text
http://localhost:3000
```

## Scripts

```bash
pnpm dev
pnpm lint
pnpm build
pnpm start
```

## Build de produção

```bash
pnpm build
pnpm start
```

## Deploy

Compatível com plataformas que suportam Next.js, como:

- Vercel
- Netlify
- outras infraestruturas Node compatíveis

Para produção, configure obrigatoriamente:

- `NEXT_PUBLIC_SITE_URL`
- e uma estratégia de contato (`CONTACT_WEBHOOK_URL` ou credenciais do Resend)

## Princípios adotados

- Separação por camadas para isolar domínio, aplicação, infraestrutura e UI
- Use cases explícitos para leitura de dados e envio de contato
- Renderização server-side para os dados principais da home
- Componentes client apenas onde há animação ou interação

## Licença

Este repositório inclui o arquivo `LICENSE`.
