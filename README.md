# rewellidev

Portfólio pessoal em Next.js (App Router), TypeScript, Tailwind CSS e shadcn/ui. Idiomas: PT (`/`), EN (`/en`) e ES (`/es`).

## Como rodar

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção
npm run lint
```

## Onde editar

- **Conteúdo** (textos nos três idiomas): `src/data/`
  - `profile.ts`: nome, frase de apresentação, e-mail, GitHub e LinkedIn
  - `projects.ts`: projetos, em ordem de relevância
  - `stacks.ts`: stacks e ícones (`react-icons/si`)
  - `experience.ts`: experiência
- **Imagens dos projetos**: `public/projects/` (proporção 16:10)
- **Textos da interface**: `messages/pt.json`, `en.json`, `es.json`
- **Cores, fontes e arredondamento**: `src/app/globals.css` e `src/app/[locale]/layout.tsx`
