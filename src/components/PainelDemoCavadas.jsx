
import React from 'react'
import { demoLinhaPasseFutsal } from '../data/demoLinhaPasseFutsal'

export function PainelDemoCavadas({ onLoadDemo }) {
  return (
    <div className="demo-cavadas-card">
      <div>
        <strong>Demo Cavadas</strong>
        <p>Carrega o exercício baseado no esquema enviado: linhas de passe, apoio frontal, rotação e finalização.</p>
      </div>
      <button onClick={() => onLoadDemo(demoLinhaPasseFutsal)}>
        Carregar animação
      </button>
    </div>
  )
}
