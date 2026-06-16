
import React from 'react'
import { Copy, Plus, SkipBack, SkipForward, Trash2 } from 'lucide-react'

export function TimelineFases({
  fases = [],
  faseAtual = 0,
  setFaseAtual,
  onNovaFase,
  onCopiarFase,
  onEliminarFase
}) {
  const total = fases.length || 1

  function anterior() {
    setFaseAtual(Math.max(0, faseAtual - 1))
  }

  function seguinte() {
    setFaseAtual(Math.min(total - 1, faseAtual + 1))
  }

  return (
    <div className="timelineV91">
      <div className="timelineV91Top">
        <strong>Timeline da animação</strong>
        <span>Fase {faseAtual + 1} de {total}</span>
      </div>

      <div className="timelineV91Controls">
        <button onClick={anterior}><SkipBack size={16}/> Anterior</button>
        <button onClick={seguinte}>Seguinte <SkipForward size={16}/></button>
        <button onClick={onNovaFase}><Plus size={16}/> Nova Fase</button>
        <button onClick={onCopiarFase}><Copy size={16}/> Copiar</button>
        <button className="danger" onClick={onEliminarFase}><Trash2 size={16}/> Eliminar</button>
      </div>

      <div className="timelineV91Steps">
        {fases.map((f, i) => (
          <button
            key={i}
            className={i === faseAtual ? 'active' : i < faseAtual ? 'done' : ''}
            onClick={() => setFaseAtual(i)}
          >
            <b>{i + 1}</b>
            <span>{f.nome || `Fase ${i + 1}`}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
