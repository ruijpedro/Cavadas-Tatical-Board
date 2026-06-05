
import React from 'react'
import { Users, Shield, Goal, Dumbbell } from 'lucide-react'

export function gerarJogadoresTreino({ modalidade = 'futebol', tipoTreino = 'campo', atacantes = 7, defensores = 6, guardaRedes = true }) {
  const jogadores = []

  const isFutsal = modalidade === 'futsal'

  if (tipoTreino === 'guarda-redes') {
    if (modalidade === 'futsal') {
      jogadores.push(
        { id:'GR1', n:'GR', team:'yellow', x:12, y:50, nome:'Guarda-redes' },
        { id:'T1', n:1, team:'blue', x:38, y:25, nome:'Rematador 1' },
        { id:'T2', n:2, team:'blue', x:38, y:75, nome:'Rematador 2' },
        { id:'T3', n:3, team:'blue', x:58, y:50, nome:'Apoio frontal' },
        { id:'T4', n:4, team:'blue', x:72, y:30, nome:'Finalizador' },
        { id:'D1', n:'X', team:'red', x:68, y:60, nome:'Oposição' }
      )
      return jogadores
    }

    jogadores.push(
      { id:'GR1', n:'GR', team:'yellow', x:10, y:50, nome:'Guarda-redes' },
      { id:'T1', n:1, team:'blue', x:34, y:25, nome:'Remate lateral' },
      { id:'T2', n:2, team:'blue', x:34, y:75, nome:'Remate lateral' },
      { id:'T3', n:3, team:'blue', x:50, y:50, nome:'Remate frontal' },
      { id:'T4', n:4, team:'blue', x:66, y:35, nome:'Cruzamento' },
      { id:'T5', n:5, team:'blue', x:66, y:65, nome:'Cruzamento' },
      { id:'D1', n:'X', team:'red', x:56, y:48, nome:'Oposição' }
    )
    return jogadores
  }

  const atacantesPosFutebol = [
    [8, 92], [18, 78], [32, 66], [46, 58], [58, 48],
    [68, 38], [76, 28], [60, 72], [42, 82], [28, 42],
    [52, 28]
  ]

  const defensoresPosFutebol = [
    [48, 34], [58, 34], [68, 38], [76, 48], [64, 58],
    [52, 54], [42, 46], [72, 28], [56, 22], [82, 40], [70,70]
  ]

  const atacantesPosFutsal = [
    [12,50], [30,20], [30,80], [48,50], [68,50],
    [55,25], [55,75], [75,35], [75,65]
  ]

  const defensoresPosFutsal = [
    [72,38], [72,62], [58,50], [82,50], [62,25],
    [62,75], [85,35], [85,65]
  ]

  const atacantesPos = isFutsal ? atacantesPosFutsal : atacantesPosFutebol
  const defensoresPos = isFutsal ? defensoresPosFutsal : defensoresPosFutebol

  for (let i = 0; i < Number(atacantes); i++) {
    const p = atacantesPos[i % atacantesPos.length]
    jogadores.push({
      id: `A${i + 1}`,
      n: i + 1,
      team: 'blue',
      x: p[0],
      y: p[1],
      nome: `Atacante ${i + 1}`
    })
  }

  for (let i = 0; i < Number(defensores); i++) {
    const p = defensoresPos[i % defensoresPos.length]
    jogadores.push({
      id: `D${i + 1}`,
      n: 'X',
      team: 'red',
      x: p[0],
      y: p[1],
      nome: `Defesa ${i + 1}`
    })
  }

  if (guardaRedes) {
    jogadores.push({
      id: 'GR',
      n: 'GR',
      team: 'yellow',
      x: isFutsal ? 12 : 10,
      y: 50,
      nome: 'Guarda-redes'
    })
  }

  return jogadores
}

export function EsquemasTreinoPanel({
  modalidade,
  config,
  setConfig,
  onAplicar
}) {
  if (modalidade !== 'futebol' && modalidade !== 'futsal') return null

  return (
    <div className="trainingSchemeBox">
      <h3><Dumbbell size={18}/> Esquema de treino</h3>

      <label>Tipo de exercício</label>
      <div className="trainingTypeGrid">
        <button
          className={config.tipoTreino === 'campo' ? 'active' : ''}
          onClick={() => setConfig({ ...config, tipoTreino: 'campo' })}
        >
          <Users size={16}/> Jogadores de campo
        </button>

        <button
          className={config.tipoTreino === 'guarda-redes' ? 'active' : ''}
          onClick={() => setConfig({ ...config, tipoTreino: 'guarda-redes' })}
        >
          <Goal size={16}/> Guarda-redes
        </button>
      </div>

      {config.tipoTreino === 'campo' && (
        <>
          <label>Atacantes</label>
          <input
            type="number"
            min="1"
            max={modalidade === 'futsal' ? 9 : 11}
            value={config.atacantes}
            onChange={e => setConfig({ ...config, atacantes: Number(e.target.value) })}
          />

          <label>Defensores</label>
          <input
            type="number"
            min="0"
            max={modalidade === 'futsal' ? 8 : 11}
            value={config.defensores}
            onChange={e => setConfig({ ...config, defensores: Number(e.target.value) })}
          />

          <label className="checkLine">
            <input
              type="checkbox"
              checked={config.guardaRedes}
              onChange={e => setConfig({ ...config, guardaRedes: e.target.checked })}
            />
            Incluir guarda-redes
          </label>
        </>
      )}

      {config.tipoTreino === 'guarda-redes' && (
        <div className="keeperInfo">
          <Shield size={18}/>
          <p>
            Gera automaticamente um exercício de guarda-redes com rematadores, apoios,
            oposição e zona de finalização.
          </p>
        </div>
      )}

      <button className="trainingApply" onClick={onAplicar}>
        Aplicar esquema no campo
      </button>

      <p className="miniHint">
        Disponível para {modalidade === 'futsal' ? 'futsal' : 'futebol'}:
        jogadores de campo, guarda-redes, bolas paradas, finalização e transições.
      </p>
    </div>
  )
}
