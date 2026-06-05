
import React from 'react'
import { Users } from 'lucide-react'

export function gerarJogadoresFutebol({ atacantes = 7, defensores = 6, guardaRedes = true }) {
  const jogadores = []

  // Atacantes azuis — distribuição ofensiva no campo
  const atacantesPos = [
    [8, 92], [18, 78], [32, 66], [46, 58], [58, 48],
    [68, 38], [76, 28], [60, 72], [42, 82], [28, 42],
    [52, 28]
  ]

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

  // Defensores vermelhos — zona defensiva
  const defensoresPos = [
    [48, 34], [58, 34], [68, 38], [76, 48], [64, 58],
    [52, 54], [42, 46], [72, 28], [56, 22], [82, 40]
  ]

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
      x: 50,
      y: 8,
      nome: 'Guarda-redes'
    })
  }

  return jogadores
}

export function SeletorJogadoresFutebol({
  modalidade,
  config,
  setConfig,
  onAplicar
}) {
  if (modalidade !== 'futebol') return null

  return (
    <div className="footballPlayersBox">
      <h3><Users size={18}/> Jogadores na animação</h3>

      <label>Atacantes</label>
      <input
        type="number"
        min="1"
        max="11"
        value={config.atacantes}
        onChange={e => setConfig({ ...config, atacantes: Number(e.target.value) })}
      />

      <label>Defensores</label>
      <input
        type="number"
        min="0"
        max="11"
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

      <button className="footballApply" onClick={onAplicar}>
        Aplicar jogadores no campo
      </button>

      <p className="miniHint">
        Ideal para cantos, livres, bolas paradas, organização ofensiva e transições.
      </p>
    </div>
  )
}
