# Training Track — CLAUDE.md

Documento de contexto para o Claude Code. Leia este arquivo antes de qualquer tarefa.

---

## Visão Geral

Aplicação web de tracking de treinos e calorias. Dois repositórios separados:

| Repo | Stack | Responsabilidade |
|------|-------|-----------------|
| `training_track` | Next.js + Prisma + PostgreSQL | App principal (UI + API) |
| `calories_counter` | Django + SQLite | Serviço de busca de alimentos (tabela TACO) |

---

## Stack — Next.js (repo principal)

- **Framework:** Next.js com Pages Router (`pages/`)
- **Linguagem:** TypeScript
- **ORM:** Prisma com PostgreSQL
- **Estilo:** CSS Modules + `styles/globals.css` com variáveis CSS customizadas
- **Fonte:** Montserrat (Google Fonts)
- **Deploy:** Docker (`Dockerfile`, `docker-compose.yml`)

---

## Estrutura de Pastas

```
training_track/
├── components/          # Componentes reutilizáveis
│   ├── hooks/           # Hooks customizados (useGet, usePost, usePut, useDelete)
│   ├── AgendaContent/   # Calendário da home
│   ├── HomeCardCalorias/
│   ├── Refeicao/        # Card de refeição (café, almoço, lanche, jantar)
│   ├── UltimoTreino/    # Card do último treino na home
│   └── UltimaSemana/    # Resumo dos últimos 7 dias
├── pages/
│   ├── api/             # API Routes do Next.js
│   │   ├── treino/      # CRUD de treinos
│   │   ├── refeicao/    # CRUD de refeições/alimentos
│   │   ├── health-data/ # Dados pessoais e metas
│   │   └── login/       # Autenticação
│   ├── index.tsx        # Dashboard/Home
│   ├── calorias/        # Contador de calorias
│   ├── treino/          # Registro e visualização de treino
│   └── metas/           # Metas e dados pessoais
├── prisma/
│   └── schema.prisma    # Modelos do banco
├── services/            # Serviços auxiliares (login, senha, semana)
├── styles/
│   └── globals.css      # Design system global (variáveis CSS, base)
└── utils/
    └── parseDate.ts
```

---

## Modelo de Dados (Prisma)

### `tb_workout` — Sessão de treino
```
id, userId, date, lastTraining (boolean)
→ tem muitos tb_group
```

### `tb_group` — Exercício dentro de um treino
```
id, description, sets, type (1=musculação | 2=cardio), tb_workoutId
```

### `tb_alimento` — Alimento registrado na refeição
```
id, tipoId (tipo de refeição), nome, cal, p, c, g, f, date, userId, qnt
```

### `tb_health_data` — Dados pessoais do usuário
```
id, userId, weight, height, meta_calorias
→ tem tb_meta_macros (p, c, g em gramas)
```

---

## Types de Treino

```typescript
// pages/api/treino/types.ts
type Workout = {
  id?: number
  date: string
  training?: Array<Training>
  lastTraining: boolean
  userId?: number
}

type Training = {
  id?: number
  type: number  // 1 = musculação | 2 = cardio
  description: string
  sets: number
  workoutId?: number
}
```

---

## API Routes — Treino

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/treino` | Lista treinos do usuário |
| POST | `/api/treino` | Cria novo treino |
| GET | `/api/treino/[id]` | Busca treino por ID |
| PUT | `/api/treino/[id]` | Atualiza treino |
| DELETE | `/api/treino/[id]` | Remove treino |
| GET | `/api/ultima-semana` | Resumo dos últimos 7 dias |

---

## Design System — Variáveis CSS

```css
--primary-color: #7d60d3;          /* roxo principal */
--primary-color-dark: #4c358f;     /* roxo escuro */
--primary-color-light: #a894df;    /* roxo claro */
--primary-color-ultra-light: #edeaf8; /* fundo de cards */
--bg-color-light: rgb(219, 215, 230); /* fundo da página */
```

- Fonte: `Montserrat`
- Border-radius padrão: `4px`
- Transições: `all .4s`
- Header fixo no **bottom** (nav mobile): `height: 12vh`

---

## Padrões de Código

- Componentes funcionais com `React.FC`
- CSS Modules para estilos por componente (`*.module.css`)
- Hooks customizados em `components/hooks/` para chamadas HTTP
- API Routes seguem o padrão: `handler` → chama service/função separada
- Autenticação via middleware em `pages/api/middleware/auth`

---

## Serviço de Calorias (Django — repo separado)

- Roda como serviço independente (Docker)
- Acessa a tabela TACO de alimentos brasileiros
- Comunicação via HTTP da API Next.js
- Endpoints usados pelo Next.js: busca de alimento por nome e cálculo de macros por quantidade (g)

---

## Contexto de Uso

- Usuário principal: Luiz Vilarinho (`luizvilarinho@zohomail.com`)
- Versão atual: v1.0.6
- Prioridade: **mobile-first** — app usado principalmente no celular
- Idioma da UI: **Português brasileiro**