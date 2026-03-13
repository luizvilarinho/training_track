# Training Track — DESIGN.md

Diretrizes de design e layout. Leia antes de qualquer tarefa visual ou de UI.

---

## Princípio Central

**Mobile-first.** O app é usado principalmente no celular durante ou após treinos.
Toda decisão de layout deve priorizar telas de 375px–430px (iPhone/Android comuns).

---

## Design System

### Paleta de Cores

```css
/* Variáveis definidas em styles/globals.css */
--primary-color: #7d60d3;             /* roxo — botões, destaques, header */
--primary-color-dark: #4c358f;        /* roxo escuro — textos sobre fundo claro */
--primary-color-light: #a894df;       /* roxo claro — labels, bordas */
--primary-color-ultra-light: #edeaf8; /* fundo de cards internos */
--bg-color-light: rgb(219, 215, 230); /* fundo geral da página */
```

### Tipografia

- **Fonte:** Montserrat (Google Fonts)
- **Pesos usados:** 400 (regular), 600 (semibold)
- **Labels de campo:** `font-size: .89em`, `font-weight: 600`, cor `--primary-color-light`
- **Textos de destaque:** `font-weight: 600`, cor `--primary-color-dark`

### Espaçamentos (classes utilitárias existentes)

```
.sm-mar--top    → margin-top: 15px
.md-mar--top    → margin-top: 30px
.l-mar--top     → margin-top: 45px
.xl-mar--top    → margin-top: 60px
.sm-mar--bottom → margin-bottom: 15px
.md-mar--bottom → margin-bottom: 30px
```

### Componentes Base

| Elemento | Estilo |
|----------|--------|
| `input` | height: 55px, padding: 15px, bg: #fcfaff, border-radius: 4px |
| `button` (primário) | bg: `--primary-color`, cor: `--primary-color-ultra-light`, padding: 20px |
| `button` (secundário) | sem bg, borda `--primary-color-light`, cor `--primary-color-light` |
| `section` | bg: #f6f2fb, padding: 15px, border-radius: 4px |
| `h3` | border-bottom: 1px solid `--bg-color-light`, cor `--primary-color-dark` |

---

## Layout Geral

### Header/Nav

- Nav fixa no **bottom** da tela (`position: fixed; bottom: 0`)
- Altura: `12vh` (variável `--header-height`)
- 3 itens na nav: Home, Calorias, Treino
- Última seção da página deve ter `margin-bottom: calc(10px + var(--header-height))` para não ficar atrás da nav

### Estrutura de Página

```
[top-alert] ← barra roxa com usuário/logo (desktop)
[conteúdo]  ← sections empilhadas, padding lateral
[nav]       ← fixa no bottom (mobile)
```

---

## Diretrizes Mobile-First

### Grids e Layouts

- **Evitar** grids complexos com muitas colunas em mobile
- Cards de grupos musculares: `width: calc(50% - 9px)` em pares, `98%` quando full-width
- Calendário: grid 8 colunas (1 label semana + 7 dias) — manter, mas garantir legibilidade
- Formulários: inputs full-width, empilhados verticalmente

### Toque e Interação

- Área mínima de toque: **44px × 44px**
- Botões de ação primária: padding generoso (`20px`)
- Ícones de incremento/decremento: `font-size: 1.6rem` (já definido)
- Estados `:active` claramente visíveis (inset shadow já implementado)

### Feedback Visual

- Transição padrão: `all .4s` (já global)
- Botão desabilitado: `opacity: .5; pointer-events: none`
- Dia atual no calendário: borda rosa (`border: 2px solid rgb(255, 71, 163)`)
- Dia com treino: `background-color: var(--primary-color)`

---

## Padrões de Componentes

### Cards de Grupo Muscular (`.grupo-musculacao`)

```css
/* Dois por linha */
width: calc(50% - 9px);
padding: 10px;
border-radius: 4px;
background: var(--primary-color-ultra-light);
text-align: center;

/* Cardio e full-width */
.cardio, .full-width → width: 98%;
```

### Botões de Ação (adicionar/remover séries)

```css
.combo-add-treino → grid 3 colunas (exercício | contador | tipo)
.combo-add-cardio → grid 2 colunas
.add-serie-container → flex, justify-content: space-around, width: 150px
```

### Alertas

- Alert global: posicionado no topo, `.alertShow` / `.alertHide` toggle
- Inline alert: para erros de campo

---

## Novas Features — Diretrizes Visuais

### Tipos de Treino (A/B/C/D/Full Body)

- Exibir o tipo do treino com destaque visual na tela de registro e no card da home
- Usar badge/chip simples com cor `--primary-color` e texto bold
- Na agenda, diferenciar visualmente dias com treino por tipo (ex: letra A/B/C/D dentro do quadrado do dia)
- Seletor de tipo de treino: botões toggle horizontais, não dropdown

### Navegação Mobile

- Manter nav bottom com 3 itens
- Se adicionar mais seções, considerar sub-navegação dentro da página (tabs)
- Não usar modais grandes — preferir expansão inline ou nova página

---

## Responsividade

```css
/* Breakpoint atual em globals.css */
@media (max-width: 600px) {
  .menu, .version { width: 100%; }
}
```

**Expandir para:**
```css
/* Recomendado adicionar */
@media (max-width: 430px) { /* iPhone 14 Pro Max */ }
@media (max-width: 390px) { /* iPhone 14 */         }
@media (max-width: 375px) { /* iPhone SE */          }
```

---

## O Que Evitar

- ❌ Tabelas com muitas colunas em mobile
- ❌ Textos menores que 14px
- ❌ Inputs com altura menor que 44px
- ❌ Modais que ocupam tela inteira sem scroll
- ❌ Hover-only interactions (não funcionam em touch)
- ❌ Mudar a paleta roxa — é a identidade do app