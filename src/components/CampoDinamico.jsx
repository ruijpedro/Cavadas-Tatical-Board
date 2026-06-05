
import React from 'react'

export function CampoDinamico({
  modalidade = 'futsal',
  children,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
  fieldRef
}) {
  const tipo = modalidade || 'futsal'

  return (
    <div
      ref={fieldRef}
      className={`campo-dinamico campo-${tipo}`}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      {tipo === 'futsal' && <CampoFutsal />}
      {tipo === 'futebol' && <CampoFutebol />}
      {tipo === 'voleibol' && <CampoVoleibol />}
      {children}
    </div>
  )
}

function CampoFutsal() {
  return (
    <>
      <div className="linha-meio" />
      <div className="circulo-centro" />
      <div className="area-futsal area-esq" />
      <div className="area-futsal area-dir" />
      <div className="baliza-futsal baliza-esq" />
      <div className="baliza-futsal baliza-dir" />
      <div className="marca-penalti marca-esq" />
      <div className="marca-penalti marca-dir" />
    </>
  )
}

function CampoFutebol() {
  return (
    <>
      <div className="linha-meio" />
      <div className="circulo-centro futebol" />
      <div className="grande-area area-esq" />
      <div className="grande-area area-dir" />
      <div className="pequena-area pequena-esq" />
      <div className="pequena-area pequena-dir" />
      <div className="baliza-futebol baliza-esq" />
      <div className="baliza-futebol baliza-dir" />
      <div className="marca-penalti futebol-penalti-esq" />
      <div className="marca-penalti futebol-penalti-dir" />
      <div className="meia-lua meia-lua-esq" />
      <div className="meia-lua meia-lua-dir" />
    </>
  )
}

function CampoVoleibol() {
  return (
    <>
      <div className="rede-voleibol" />
      <div className="linha-ataque linha-ataque-esq" />
      <div className="linha-ataque linha-ataque-dir" />
      <div className="zona-ataque zona-ataque-esq" />
      <div className="zona-ataque zona-ataque-dir" />
      <div className="zona-defesa zona-defesa-esq" />
      <div className="zona-defesa zona-defesa-dir" />
      <div className="numero-zona z1">1</div>
      <div className="numero-zona z2">2</div>
      <div className="numero-zona z3">3</div>
      <div className="numero-zona z4">4</div>
      <div className="numero-zona z5">5</div>
      <div className="numero-zona z6">6</div>
    </>
  )
}
