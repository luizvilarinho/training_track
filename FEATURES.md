# Training Track — FEATURES.md

Roadmap e especificações das novas funcionalidades. Consulte antes de implementar qualquer feature nova.

---

## Status Atual (v1.0.6)

### Funcionando

- [x] Autenticação (login, logout, recuperar senha)
- [x] Dashboard com resumo de calorias, calendário e último treino
- [x] Contador de calorias por refeição (café, almoço, lanche, jantar)
- [x] Busca de alimentos via tabela TACO (serviço Django)
- [x] Registro de treino (musculação + cardio)
- [x] Visualização do último treino
- [x] Resumo dos últimos 7 dias de treino
- [x] Metas de calorias e macronutrientes
- [x] Dados pessoais (altura, peso)

---

## Novas Features Planejadas

---

### 1. Tipos de Treino (A/B/C/D/Full Body)

**Prioridade:** Alta

#### Descrição

Permitir que o usuário categorize cada sessão de treino em um tipo:
- **Treino A** — ex: Peito + Tríceps
- **Treino B** — ex: Costas + Bíceps
- **Treino C** — ex: Pernas
- **Treino D** — ex: Ombros + Core
- **Full Body** — treino completo

#### Mudanças no Banco de Dados

Adicionar campo `workoutType` em `tb_workout`:

```prisma
model tb_workout {
  id           Int        @id @default(autoincrement())
  userId       Int
  date         DateTime
  lastTraining Boolean
  workoutType  String?    // "A" | "B" | "C" | "D" | "FB"
  user         tb_user    @relation(fields: [userId], references: [id], onDelete: Cascade)
  training     tb_group[]
}
```

#### Mudanças no Type

```typescript
// pages/api/treino/types.ts
type Workout = {
  id?: number
  date: string
  training?: Array<Training>
  lastTraining: boolean
  userId?: number
  workoutType?: 'A' | 'B' | 'C' | 'D' | 'FB'  // NOVO
}
```

#### UI — Seletor de Tipo

- Localização: tela de AdicionarTreino, acima dos grupos musculares
- Componente: botões toggle horizontais (não dropdown)
- Visual: 5 botões — A, B, C, D, FB — com estilo pill/chip
- Estado ativo: `background: var(--primary-color)`, `color: white`
- Estado inativo: borda `--primary-color-light`, fundo transparente

```
[ A ] [ B ] [ C ] [ D ] [ FB ]
```

#### UI — Exibição

- **Card UltimoTreino (home):** badge com a letra do tipo ao lado da data
- **Agenda/Calendário:** exibir a letra do tipo dentro do quadrado do dia (quando há treino)
- **VisualizarTreino:** título da página com o tipo (ex: "Treino A — 13/03/2026")
- **UltimaSemana:** incluir coluna/info do tipo em cada linha

---

### 2. Melhorias de Layout Mobile

**Prioridade:** Alta

#### Objetivo

Redesign focado em usabilidade no celular durante e após treinos.

#### Mudanças na Home (index.tsx)

- Reorganizar cards para exibição mais compacta
- Card de calorias: barra de progresso visual (consumido vs meta)
- Calendário: manter estrutura atual, mas aumentar área de toque dos dias
- Card último treino: exibir tipo de treino com badge

#### Mudanças na Tela de Treino

- Seletor de tipo de treino no topo (feature #1)
- Botões de adicionar série maiores e mais acessíveis
- Feedback visual mais claro ao adicionar grupo muscular

#### Mudanças Gerais

- Aumentar padding lateral nas sections para respiração visual
- Revisar tamanhos de fonte para legibilidade mobile
- Adicionar breakpoints específicos para 375px, 390px, 430px

---

### 3. Histórico de Treinos por Tipo

**Prioridade:** Média

#### Descrição

Na tela de treino ou em uma nova aba, mostrar o histórico agrupado por tipo:
- "Última vez que fiz Treino A: 10/03/2026"
- "Últimas cargas de Treino B"

#### Implementação Sugerida

- Nova API route: `GET /api/treino/por-tipo?type=A`
- Componente `HistoricoTipo` na tela de treino
- Exibição: accordion ou tabs por tipo

---

## Convenções para Novas Features

1. **Banco:** sempre criar migration Prisma, nunca alterar schema sem migration
2. **API:** seguir padrão existente — `index.ts` como handler, funções separadas para lógica
3. **Tipos:** atualizar `types.ts` do domínio correspondente
4. **UI:** CSS Modules para estilos novos, reutilizar classes de `globals.css` quando possível
5. **Mobile:** testar mentalmente em 375px antes de implementar qualquer layout
6. **Idioma:** toda UI em português brasileiro

---

## Ordem de Implementação Recomendada

1. Migration + schema: adicionar `workoutType` em `tb_workout`
2. Atualizar types e API routes de treino
3. Implementar seletor de tipo na tela AdicionarTreino
4. Atualizar VisualizarTreino para exibir o tipo
5. Atualizar UltimoTreino e Agenda na home
6. Ajustes gerais de layout mobile