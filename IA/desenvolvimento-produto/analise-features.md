# Relatório de Análise de Features — Training Track
**Data:** Março de 2026
**Versão:** 1.0 — Relatório Preliminar
**Status:** Rascunho para revisão

---

## Resumo Executivo

O Training Track é um app de fitness com base sólida: autenticação, contador de calorias com macros, registro de treinos por grupo muscular, histórico semanal e metas pessoais. A stack (Next.js + Prisma + PostgreSQL) é moderna e performática.

Com base na pesquisa de mercado e análise do estado atual do app, identificamos **7 lacunas prioritárias** e traduzimos nas features mais impactantes para as próximas iterações.

---

## Pesquisa de Mercado

### Concorrentes Analisados

| App | Ponto Forte | Fraqueza Principal |
|-----|-------------|-------------------|
| MyFitnessPal | Maior banco de alimentos do mundo (14M+ itens) | Barcode scanner movido para paywall em 2024-25 — fuga massiva de usuários (89% reviews 1-estrela no Trustpilot) |
| Hevy | UI moderna, feed social, tier gratuito generoso | Sem progressive overload inteligente, dados apenas na nuvem |
| Strong | Confiabilidade, velocidade de registro | Zero social, sem IA, sem inovação recente |
| Strava | Gamificação poderosa (150M usuários, 14B kudos em 2025) | Fraco para musculação, paywall agressivo gerando ressentimento |
| Fitbod | IA adaptativa que seleciona cargas e exercícios | Caixa preta — não explica o porquê das sugestões; caro |
| Garmin Connect | Ecossistema wearable best-in-class | Bloqueado ao hardware Garmin; UX complexa |
| WHOOP | Recovery-first com HRV e dados biométricos | Hardware obrigatório; não é tracker de treino |

### Tendências Identificadas (2025–2026)

1. **IA Adaptativa** — Apps que só registram estão se tornando obsoletos. A expectativa é recomendação inteligente. Fitbod reportou que usuários com planos de IA melhoraram 1RM **28% mais rápido**. Retenção melhora **50%** com personalização.
2. **Gamificação** — Modelo do Strava: segmentos, KOMs, challenges mensais, kudos. Sticky e comprovado.
3. **Progressive Overload Transparente** — Feature mais pedida no Reddit. Apps rastreiam mas não prescrevem a carga da próxima sessão.
4. **Integração com Wearables** — Apple Watch, Garmin, WHOOP virou expectativa mínima. Garmin registrou treinos de força **+29% em 2025**.
5. **Atleta Híbrido** — Crescimento rápido de Hyrox, CrossFit e treino combinado. Usuários usam 2-3 apps porque nenhum une musculação + cardio bem.
6. **Free Tier Honesto** — Vácuo de confiança criado pelo MyFitnessPal. Usuários ativamente migrando para apps com tier gratuito robusto.

### Dores dos Usuários (App Stores + Reddit)

- App não diz o que fazer hoje — só registra o passado
- Anos de dados presos em formato proprietário (medo de migrar)
- Barreira de preço desproporcionada para features básicas
- UI destruída em redesigns sem aviso
- Falta de timer de descanso durante o treino
- Sem visualização de PR (personal record) por exercício

---

## Features Sugeridas

---

## Sugestão de Feature: #1 — Rastreamento de Progressive Overload com Sugestão de Carga

### Descrição
Ao iniciar um treino, o app sugere automaticamente a carga, séries e reps para cada exercício com base no histórico anterior. A lógica é transparente: o usuário vê o porquê da sugestão ("Na última sessão você fez 60kg × 4 × 10 com RPE estimado 7. Hoje sugerimos 62,5kg").

### Problema que Resolve
O app atualmente registra treinos passados mas não usa esses dados de forma ativa. O usuário precisa lembrar manualmente o que fez e o que deve progredir — responsabilidade cognitiva que treinos consistentes não deveriam ter.

### Solução Proposta
1. Ao abrir "Adicionar Treino", o app busca o último treino com o mesmo grupo muscular
2. Para cada exercício, exibe a sugestão de carga (+2,5kg ou +1 rep baseado em regras de progressive overload)
3. O usuário pode aceitar, ajustar ou ignorar
4. Ao finalizar, o app registra os dados e atualiza a progressão para a próxima sessão

### Grau de necessidade
**Alta**
**Legenda:** O app não pode ficar sem. Resolveria um problema frequente e impactante. Seria um diferencial importante.

### Estimativa de Complexidade
- Backend: **Média** — Lógica de cálculo de progressão, algoritmo de recuperação de último treino por grupo muscular/exercício
- Frontend: **Média** — Novo componente de sugestão no fluxo de adicionar exercício
- Integração: **Baixa** — Usa dados já existentes no `tb_group` e `tb_workout`

### Riscos
- Sugestão inadequada para iniciantes (cargas ainda não estabilizadas) — mitigar com threshold mínimo de sessões antes de sugerir
- Necessidade de normalizar nome de exercícios (atualmente `description` é texto livre no `tb_group`)

---

## Sugestão de Feature: #2 — Visualização de PRs por Exercício

### Descrição
Dashboard de Personal Records que exibe o maior peso, maior volume (séries × reps × peso) e maior número de repetições já registrado para cada exercício. Celebra novos PRs em tempo real durante o treino com feedback visual.

### Problema que Resolve
Usuários perdem a motivação por não visualizarem sua evolução concreta ao longo do tempo. "Quanto eu levantei de agachamento 6 meses atrás?" é uma pergunta que o app atual não responde facilmente.

### Solução Proposta
1. Tela de "Meu Progresso" com lista de exercícios e seus PRs históricos
2. Gráfico de linha simples mostrando progressão de peso por exercício ao longo do tempo
3. Ao salvar um treino com novo PR, notificação/badge celebratório ("Novo PR! 🏆 Supino: 80kg")

### Grau de necessidade
**Alta**
**Legenda:** O app não pode ficar sem. Resolveria um problema frequente e impactante. Seria um diferencial importante.

### Estimativa de Complexidade
- Backend: **Baixa** — Query nos dados existentes do `tb_group` agrupando por `description`
- Frontend: **Média** — Nova tela de progresso + componente de gráfico (ex: recharts)
- Integração: **Baixa** — Dados já existem no banco

### Riscos
- Nome de exercícios inconsistentes no banco (texto livre) dificulta agrupamento correto — criar biblioteca de exercícios padronizada é pré-requisito
- Gráficos podem ficar vazios para usuários novos (pouca história)

---

## Sugestão de Feature: #3 — Timer de Descanso Entre Séries

### Descrição
Timer automático que inicia ao final de cada série registrada. O usuário define o tempo de descanso padrão (30s–5min) nas configurações ou por grupo muscular. Notificação sonora/vibração ao fim do descanso.

### Problema que Resolve
Descanso inadequado é um dos fatores mais subestimados no treino. Sem timer, o usuário descansa "no feeling", geralmente mais ou menos do que o ideal para o objetivo dele. É o recurso mais pedido em reviews do Strong e do Hevy.

### Solução Proposta
1. Ao salvar uma série ("Adicionar série"), o timer inicia automaticamente
2. Exibição em tela cheia minimalista: tempo restante em destaque, botão de pular
3. Configurações: tempo padrão por tipo de treino (força: 3-5min, hipertrofia: 60-90s, cardio: 30s)
4. Vibração e som ao término

### Grau de necessidade
**Alta**
**Legenda:** O app não pode ficar sem. Resolveria um problema frequente e impactante. Seria um diferencial importante.

### Estimativa de Complexidade
- Backend: **Baixa** — Apenas salvar preferência de tempo de descanso por usuário
- Frontend: **Média** — Lógica de timer com estado, tela modal, integração com Web Audio API para som
- Integração: **Baixa** — Não depende de dados externos

### Riscos
- App precisa manter estado em background no mobile (Web Notifications API ou PWA)
- Timer pode ser interrompido se usuário sair da tela — PWA service worker mitiga parcialmente

---

## Sugestão de Feature: #4 — Medidas Corporais e Fotos de Progresso

### Descrição
Módulo para registrar medidas corporais periódicas (peso, circunferências, % de gordura estimado) e comparar fotos de progresso ao longo do tempo. Complementa o tracker de calorias com acompanhamento visual de composição corporal.

### Problema que Resolve
O usuário atual define metas (peso, calorias) mas não tem como verificar se sua composição corporal está mudando. O peso na balança é enganoso — perder gordura e ganhar músculo simultaneamente não move o ponteiro.

### Solução Proposta
1. Nova seção "Medidas" no menu de Metas (`/metas`)
2. Registro periódico: peso, cintura, quadril, braço, coxa, peitoral (campos opcionais)
3. Upload de foto de frente/costas/lateral (armazenadas localmente ou em bucket)
4. Gráfico de linha para cada medida ao longo do tempo
5. Comparação de fotos lado a lado (antes/depois)

### Grau de necessidade
**Média**
**Legenda:** Resolveria um problema comum, mas não crítico.

### Estimativa de Complexidade
- Backend: **Média** — Nova tabela `tb_measurements`, upload e storage de imagens
- Frontend: **Média** — Formulário de medidas, componente de upload de foto, gráficos, comparação
- Integração: **Baixa** — Independente das features atuais

### Riscos
- Storage de imagens tem custo e complexidade (S3, Cloudinary ou local)
- Privacidade é crítica — imagens corporais são dados sensíveis, requerer HTTPS e auth forte
- Usuários podem não aderir à feature de fotos por timidez/privacidade

---

## Sugestão de Feature: #5 — Biblioteca de Exercícios Padronizada

### Descrição
Substituir o campo de texto livre `description` nos exercícios por uma biblioteca estruturada de exercícios com nome padronizado, grupo muscular, instrução de execução e imagem/GIF demonstrativo.

### Problema que Resolve
Atualmente, o mesmo exercício pode estar registrado como "Supino", "Supino Reto", "Bench Press" ou "supino reto barra" — impossibilitando agrupamento correto para PRs, progressive overload e analytics. Esse é o pré-requisito técnico para as features #1 e #2.

### Solução Proposta
1. Criar tabela `tb_exercise_library` com: `name`, `muscle_group`, `equipment`, `description`, `gif_url`
2. Migrar campo `description` em `tb_group` para FK em `tb_exercise_library`
3. Interface de busca/autocomplete ao adicionar exercício ao treino
4. Permitir que usuário adicione exercício customizado (entra em modo "custom" sem gif)
5. Seed inicial com ~200 exercícios mais comuns

### Grau de necessidade
**Alta** (pré-requisito técnico)
**Legenda:** O app não pode ficar sem. Resolveria um problema frequente e impactante. Seria um diferencial importante.

### Estimativa de Complexidade
- Backend: **Alta** — Migração de schema, seed de dados, nova tabela, ajuste em todos os endpoints de treino
- Frontend: **Média** — Componente de busca com autocomplete substituindo input de texto
- Integração: **Alta** — Afeta múltiplas partes do app (criação, visualização, analytics)

### Riscos
- Migração de dados existentes: exercícios com nomes inconsistentes precisam de mapeamento manual ou lógica de matching
- Risco de regressão em endpoints existentes durante migração
- GIFs de exercícios têm peso considerável — CDN ou lazy load obrigatório

---

## Sugestão de Feature: #6 — Gamificação: Streaks e Conquistas

### Descrição
Sistema de streaks (sequências de dias treinando) e conquistas desbloqueáveis por marcos de performance. Motivação extrínseca que complementa o tracking puro e aumenta retenção a longo prazo.

### Problema que Resolve
45% dos usuários desinstalaram apps de fitness em 90 dias. Gamificação é o mecanismo comprovado de retenção do Strava (150M usuários, 14B kudos em 2025). O Training Track não tem nenhum elemento de celebração ou recompensa simbólica.

### Solução Proposta
1. **Streak diário:** contador de dias consecutivos com treino registrado. Quebrou o streak → volta ao zero
2. **Conquistas desbloqueáveis** (exemplos):
   - "Primeiro Treino" — completar o 1º treino
   - "Semana Perfeita" — 5 treinos em 7 dias
   - "Progressive Loader" — aumentar carga em 5 exercícios diferentes
   - "Mês de Ferro" — 20 treinos em um mês
   - "100 Treinos" — atingir 100 sessões registradas
3. Tela de perfil exibindo streak atual e conquistas desbloqueadas
4. Notificação push: "Você está a 1 treino de completar a Semana Perfeita 💪"

### Grau de necessidade
**Média**
**Legenda:** Resolveria um problema comum, mas não crítico.

### Estimativa de Complexidade
- Backend: **Média** — Tabela de conquistas, lógica de verificação de triggers, cálculo de streak
- Frontend: **Média** — Tela de perfil/conquistas, componente de badge
- Integração: **Média** — Precisa verificar conquistas ao salvar treino/alimento

### Riscos
- Conquistas mal calibradas desmotivam (muito fáceis = sem valor; muito difíceis = frustração)
- Notificações push requerem integração com Web Push API — complexidade adicional

---

## Sugestão de Feature: #7 — Integração com Wearables (HealthKit / Health Connect)

### Descrição
Sincronização bidirecional com Apple Health (iOS) e Google Health Connect (Android), permitindo importar dados de passos, frequência cardíaca, calorias queimadas e atividades de dispositivos Garmin, Apple Watch e outros.

### Problema que Resolve
Usuários com smartwatches ou anéis fitness precisam registrar dados manualmente no Training Track, duplicando o trabalho. A integração elimina o atrito e enriquece os dados com métricas que o app não consegue capturar sozinho (FC, HRV, sono).

### Solução Proposta
1. Integração via HealthKit (iOS/React Native ou PWA com limitações)
2. Integração via Health Connect API (Android)
3. Importar automaticamente: calorias gastas, passos, frequência cardíaca, sono
4. Exibir no dashboard: "Você queimou 420 kcal além do basal hoje — seu saldo calórico real é -380 kcal"
5. Exportar treinos do Training Track para os health hubs

### Grau de necessidade
**Média**
**Legenda:** Resolveria um problema comum, mas não crítico.

### Estimativa de Complexidade
- Backend: **Alta** — OAuth com plataformas de saúde, webhooks, normalização de dados
- Frontend: **Alta** — Fluxo de autorização, UI de configuração de sincronização
- Integração: **Alta** — Afeta cálculo de calorias, dashboard, relatórios

### Riscos
- HealthKit só funciona nativamente em apps iOS (não disponível em web PWA)
- Requer publicação em App Store/Play Store para acesso completo às APIs
- Dados de saúde sensíveis exigem compliance adicional (LGPD, HIPAA parcial)
- Alto custo de desenvolvimento e manutenção

---

## Priorização Sugerida

| # | Feature | Valor ao Usuário | Complexidade | Prioridade |
|---|---------|-----------------|--------------|-----------|
| 5 | Biblioteca de Exercícios Padronizada | Alto | Alta | **P0 — Fundação** |
| 3 | Timer de Descanso | Alto | Baixa | **P1 — Quick Win** |
| 2 | Visualização de PRs | Alto | Baixa | **P1 — Quick Win** |
| 1 | Progressive Overload com Sugestão | Alto | Média | **P2 — Core Feature** |
| 6 | Streaks e Conquistas | Médio | Média | **P2 — Engajamento** |
| 4 | Medidas Corporais e Fotos | Médio | Média | **P3 — Diferenciação** |
| 7 | Integração Wearables | Alto | Alta | **P4 — Plataforma** |

### Racional de Priorização

- **P0:** A biblioteca de exercícios é pré-requisito técnico para PRs e progressive overload. Deve ser feita primeiro para não acumular débito técnico.
- **P1:** Timer de descanso e PRs são quick wins de alto impacto — baixa complexidade, alta percepção de valor. Usuários notam imediatamente.
- **P2:** Progressive overload e gamificação são as features que transformam um tracker em um coach. Diferenciam no mercado.
- **P3/P4:** Features de alto valor mas com custo e risco maiores. Ficam para quando a base estiver sólida.

---

## Referências

- [Strong vs Hevy Comparison (2026)](https://gymgod.app/blog/strong-vs-hevy)
- [Fitbod, Strong, Hevy: A 2025 Feature Showdown](https://www.sensai.fit/blog/fitness-app-comparison)
- [Best Workout Tracker App Reddit — What Lifters Actually Recommend](https://setgraph.app/ai-blog/best-workout-tracker-app-reddit)
- [7 Things People Hate in Fitness Apps](https://www.ready4s.com/blog/7-things-people-hate-in-fitness-apps)
- [Why Users Are Switching from MyFitnessPal](https://www.hootfitness.com/blog/why-users-are-switching-from-myfitnesspal-and-what-they-re-choosing-instead)
- [MyFitnessPal Reviews — Trustpilot](https://www.trustpilot.com/review/www.myfitnesspal.com)
- [How Strava Uses Gamification to Improve Retention](https://trophy.so/blog/strava-gamification-case-study)
- [Adaptive AI Coaches: The Future of Fitness in 2025-2026](https://www.appstory.org/blog/adaptive-ai-fitness-coaches/)
- [Garmin and Strava End-of-Year Report 2025](https://www.t3.com/active/garmin-strava-end-of-year-report-2025)
- [Fitness App Market Size & Growth Report 2033](https://straitsresearch.com/report/fitness-app-market)
- [Garmin Connect+ Expansion: Impact on Strength Apps](https://the5krunner.com/2026/03/24/garmin-connect-plus-strength-apps/)
