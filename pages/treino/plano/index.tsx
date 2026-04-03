import Head from 'next/head'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faDumbbell, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { EXERCICIOS } from './exercicios'

type Exercicio = { id: number; nome: string; series: number; obs: string; tecnicas: string[] }

const TECNICAS = ['Bi-set', 'Tri-set', 'Drop-set', 'Rest-pause', 'Série gigante', 'Excêntrico', 'Isometria']

type TreinoCard = {
  tipo: string
  musculosAlvo: string[]
  exercicios: Exercicio[]
}

const TIPOS = ['A', 'B', 'C', 'D', 'E']
const GRUPOS = [...EXERCICIOS.map(g => g.grupo), 'Full Body']

let nextId = 1
function newExercicio(): Exercicio {
  return { id: nextId++, nome: '', series: 3, obs: '', tecnicas: [] }
}

function newCard(tipo: string): TreinoCard {
  return { tipo, musculosAlvo: [], exercicios: [newExercicio()] }
}

const PlanoTreino = () => {
  const [cards, setCards] = useState<TreinoCard[]>([newCard('A')])

  function addCard() {
    if (cards.length >= TIPOS.length) return
    setCards(prev => [...prev, newCard(TIPOS[prev.length])])
  }

  function removeCard(cardIdx: number) {
    setCards(prev => {
      const updated = prev.filter((_, i) => i !== cardIdx)
      return updated.map((c, i) => ({ ...c, tipo: TIPOS[i] }))
    })
  }

  function toggleMusculo(cardIdx: number, grupo: string) {
    setCards(prev =>
      prev.map((c, i) => {
        if (i !== cardIdx) return c
        const already = c.musculosAlvo.includes(grupo)
        return {
          ...c,
          musculosAlvo: already
            ? c.musculosAlvo.filter(m => m !== grupo)
            : [...c.musculosAlvo, grupo],
        }
      })
    )
  }

  function addExercicio(cardIdx: number) {
    setCards(prev =>
      prev.map((c, i) =>
        i === cardIdx ? { ...c, exercicios: [...c.exercicios, newExercicio()] } : c
      )
    )
  }

  function removeExercicio(cardIdx: number, exId: number) {
    setCards(prev =>
      prev.map((c, i) =>
        i === cardIdx
          ? { ...c, exercicios: c.exercicios.filter(e => e.id !== exId) }
          : c
      )
    )
  }

  function updateExercicioNome(cardIdx: number, exId: number, nome: string) {
    setCards(prev =>
      prev.map((c, i) =>
        i === cardIdx
          ? { ...c, exercicios: c.exercicios.map(e => (e.id === exId ? { ...e, nome } : e)) }
          : c
      )
    )
  }

  function toggleTecnica(cardIdx: number, exId: number, tecnica: string) {
    setCards(prev =>
      prev.map((c, i) =>
        i === cardIdx
          ? {
              ...c,
              exercicios: c.exercicios.map(e =>
                e.id === exId
                  ? {
                      ...e,
                      tecnicas: e.tecnicas.includes(tecnica)
                        ? e.tecnicas.filter(t => t !== tecnica)
                        : [...e.tecnicas, tecnica],
                    }
                  : e
              ),
            }
          : c
      )
    )
  }

  function moveExercicio(cardIdx: number, exIdx: number, dir: 'up' | 'down') {
    setCards(prev =>
      prev.map((c, i) => {
        if (i !== cardIdx) return c
        const list = [...c.exercicios]
        const target = dir === 'up' ? exIdx - 1 : exIdx + 1
        if (target < 0 || target >= list.length) return c;
        [list[exIdx], list[target]] = [list[target], list[exIdx]]
        return { ...c, exercicios: list }
      })
    )
  }

  function updateExercicioObs(cardIdx: number, exId: number, obs: string) {
    setCards(prev =>
      prev.map((c, i) =>
        i === cardIdx
          ? { ...c, exercicios: c.exercicios.map(e => (e.id === exId ? { ...e, obs } : e)) }
          : c
      )
    )
  }

  function updateExercicioSeries(cardIdx: number, exId: number, series: number) {
    setCards(prev =>
      prev.map((c, i) =>
        i === cardIdx
          ? { ...c, exercicios: c.exercicios.map(e => (e.id === exId ? { ...e, series } : e)) }
          : c
      )
    )
  }

  return (
    <>
      <Head>
        <title>Plano de Treino — Training Track</title>
      </Head>
      <div className="main">
        <div className="plano-page">
          <div className="plano-header">
            <FontAwesomeIcon icon={faDumbbell} className="plano-header-icon" />
            <h2>Meu Plano de Treino</h2>
          </div>

          <div className="plano-cards">
            {cards.map((card, cardIdx) => (
              <div key={card.tipo} className="plano-card">
                <div className="plano-card-header">
                  <div className="plano-card-title">Treino {card.tipo}</div>
                  {cardIdx > 0 && (
                    <button className="delete-card-btn" onClick={() => removeCard(cardIdx)}>
                      <FontAwesomeIcon icon={faTrash} /> Deletar Treino
                    </button>
                  )}
                </div>

                <h4 className="plano-label">Músculos-alvo</h4>
                <div className="musculo-chips">
                  {GRUPOS.map(grupo => (
                    <div
                      key={grupo}
                      className={`musculo-chip${card.musculosAlvo.includes(grupo) ? ' musculo-chip--ativo' : ''}`}
                      onClick={() => toggleMusculo(cardIdx, grupo)}
                    >
                      {grupo}
                    </div>
                  ))}
                </div>

                <h4 className="plano-label">Exercícios / Séries</h4>
                <div className="plano-exercicios">
                  {card.exercicios.map((ex, exIdx) => (
                    <div key={ex.id} className="exercicio-item">
                      <div className="exercicio-row">
                        <select
                          className="exercicio-select"
                          value={ex.nome}
                          onChange={e => updateExercicioNome(cardIdx, ex.id, e.target.value)}
                        >
                          <option value="">Selecione...</option>
                          {(card.musculosAlvo.length > 0 && !card.musculosAlvo.includes('Full Body')
                            ? EXERCICIOS.filter(g => card.musculosAlvo.includes(g.grupo))
                            : EXERCICIOS
                          ).map(grupo => (
                            <optgroup key={grupo.grupo} label={grupo.grupo}>
                              {grupo.itens.map(item => (
                                <option key={item} value={item}>{item}</option>
                              ))}
                            </optgroup>
                          ))}
                        </select>

                        <div className="exercicio-series-wrap">
                          <select
                            className="exercicio-select exercicio-series"
                            value={ex.series}
                            onChange={e => updateExercicioSeries(cardIdx, ex.id, Number(e.target.value))}
                          >
                            {[1,2,3,4,5,6,7,8,9,10].map(n => (
                              <option key={n} value={n}>{n}</option>
                            ))}
                          </select>
                          </div>

                        <button
                          className="exercicio-order-btn"
                          onClick={() => moveExercicio(cardIdx, exIdx, 'up')}
                          aria-label="Mover para cima"
                          disabled={exIdx === 0}
                        >
                          <FontAwesomeIcon icon={faArrowUp} />
                        </button>
                        <button
                          className="exercicio-order-btn"
                          onClick={() => moveExercicio(cardIdx, exIdx, 'down')}
                          aria-label="Mover para baixo"
                          disabled={exIdx === card.exercicios.length - 1}
                        >
                          <FontAwesomeIcon icon={faArrowDown} />
                        </button>
                        <button
                          className="exercicio-trash-btn"
                          onClick={() => removeExercicio(cardIdx, ex.id)}
                          aria-label="Remover exercício"
                          disabled={card.exercicios.length === 1}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                      <textarea
                        className="exercicio-obs"
                        placeholder="Observação..."
                        value={ex.obs}
                        onChange={e => updateExercicioObs(cardIdx, ex.id, e.target.value)}
                        rows={1}
                      />
                      <div className="tecnica-chips">
                        {TECNICAS.map(t => (
                          <div
                            key={t}
                            className={`tecnica-chip${ex.tecnicas.includes(t) ? ' tecnica-chip--ativo' : ''}`}
                            onClick={() => toggleTecnica(cardIdx, ex.id, t)}
                          >
                            {t}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <button className="add-exercicio-btn" onClick={() => addExercicio(cardIdx)}>
                    <FontAwesomeIcon icon={faPlus} /> Exercício
                  </button>
                </div>
              </div>
            ))}
          </div>

          {cards.length < TIPOS.length && (
            <button className="add-treino-btn" onClick={addCard}>
              <FontAwesomeIcon icon={faPlus} /> Adicionar Treino {TIPOS[cards.length]}
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default PlanoTreino
