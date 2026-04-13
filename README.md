# Portfólio — Luiz Henrique

Site pessoal construído com Next.js, TypeScript, Tailwind CSS e Framer Motion. Aplica Clean Architecture e princípios SOLID para manter camadas desacopladas e facilitar manutenção.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Framer Motion
- pnpm (recomendado)

## Visão rápida

Este repositório é um portfólio pessoal com seções: Hero, Sobre, Skills, Projetos e Contato. A camada de apresentação consome use cases através de hooks, garantindo separação clara entre UI e regras de negócio.

## Estrutura do projeto

```
src/
├── domain/          # Entidades, interfaces de repositórios e contratos de use cases
├── application/     # Implementações dos use cases (regras de aplicação)
├── infrastructure/  # Implementações concretas (repositorios, DI)
└── presentation/    # UI (components, hooks, providers)
```

- DI: `src/infrastructure/di/container.ts` e `src/presentation/providers/ContainerProvider.tsx`.
- Personalização de dados: `src/infrastructure/repositories/StaticPersonalInfoRepository.ts`.
- Formulário de contato: `src/application/usecases/SendContactMessage.ts` + `LocalContactRepository` (stub em `src/infrastructure/repositories/LocalContactRepository.ts`). Substituir por implementação HTTP se necessário.

## Princípios adotados

- Clean Architecture: dependências apontam para dentro; presentation → application → domain → infrastructure via abstrações.
- SOLID: separação de responsabilidades, interfaces pequenas, inversão de dependência via container.
- SSR/Hydration: componentes usam skeletons e `suppressHydrationWarning` quando necessário para evitar mismatch.

## Rodando localmente

Pré-requisitos: Node.js 18+ e pnpm (recomendado).

```bash
pnpm install
pnpm dev
```

Acesse: http://localhost:3000

Build:

```bash
pnpm build
pnpm start
```

## Deploy

Compatível com Vercel, Netlify ou qualquer plataforma que suporte Next.js.

## Contribuição

Sugestões e PRs são bem-vindos. Mantenha mudanças alinhadas com a arquitetura (preferência por alterar/estender interfaces e criar implementações, evitando acoplamento direto entre camadas).

## Licença

Arquivo LICENSE incluído no repositório.
