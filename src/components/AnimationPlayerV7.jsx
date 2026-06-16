
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Pause, Play, RotateCcw, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { animacoesDemoV7 } from '../data/animacoesV7'

function clamp(v, a, b){ return Math.max(a, Math.min(b, v)) }
function lerp(a,b,t){ return a + (b-a)*t }
function ease(t){ return t < .5 ? 2*t*t : 1 - Math.pow(-2*t+2,2)/2 }

function currentObjectPosition(base, phase, progress, id) {
  let pos = { x: base.x, y: base.y }
  const movements = phase?.movimentos || []
  for (const mv of movements) {
    if (mv.obj === id) {
      const t = ease(progress)
      pos = { x: lerp(mv.from.x, mv.to.x, t), y: lerp(mv.from.y, mv.to.y, t) }
    }
  }
  return pos
}

function CampoAnimado({ modalidade, players, ball, phase, progress }) {
  const ballPos = currentObjectPosition(ball, phase, progress, 'ball')
  return (
    <div className={`v7Field v7-${modalidade}`}>
      {modalidade === 'futebol' ? <LinhasFutebol /> : <LinhasFutsal />}
      <svg className="v7Arrows" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <marker id="v7arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <polygon points="0 0, 7 3.5, 0 7" fill="#8BD62F"/>
          </marker>
          <marker id="v7passArrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <polygon points="0 0, 7 3.5, 0 7" fill="#FFFFFF"/>
          </marker>
        </defs>
        {(phase?.movimentos || []).map((mv, i) => {
          const t = ease(progress)
          const x2 = lerp(mv.from.x, mv.to.x, t)
          const y2 = lerp(mv.from.y, mv.to.y, t)
          return <line
            key={i}
            x1={mv.from.x}
            y1={mv.from.y}
            x2={x2}
            y2={y2}
            className={mv.obj === 'ball' ? 'v7Pass' : 'v7Move'}
            markerEnd={mv.obj === 'ball' ? 'url(#v7passArrow)' : 'url(#v7arrow)'}
          />
        })}
      </svg>

      {players.map(p => {
        const pos = currentObjectPosition(p, phase, progress, p.id)
        const active = (phase?.movimentos || []).some(m => m.obj === p.id)
        return (
          <div
            key={p.id}
            className={`v7Player ${p.team} ${active ? 'active' : ''}`}
            style={{ left:`${pos.x}%`, top:`${pos.y}%` }}
            title={p.nome}
          >
            {p.n}
          </div>
        )
      })}

      <div className={`v7Ball ${(phase?.movimentos || []).some(m=>m.obj==='ball') ? 'active' : ''}`} style={{ left:`${ballPos.x}%`, top:`${ballPos.y}%` }}>
        ⚽
      </div>
    </div>
  )
}

function LinhasFutebol(){
  return <>
    <div className="v7Line mid" />
    <div className="v7Circle" />
    <div className="v7Box big left" /><div className="v7Box big right" />
    <div className="v7Box small left" /><div className="v7Box small right" />
    <div className="v7Goal left" /><div className="v7Goal right" />
  </>
}
function LinhasFutsal(){
  return <>
    <div className="v7Line mid" />
    <div className="v7Circle futsal" />
    <div className="v7FutsalArea left" /><div className="v7FutsalArea right" />
    <div className="v7Goal fut left" /><div className="v7Goal fut right" />
  </>
}

export function AnimationPlayerV7({ onLoadToBoard }) {
  const [demoKey, setDemoKey] = useState('cantoCurto')
  const demo = animacoesDemoV7[demoKey]
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const lastRef = useRef(null)

  const phase = demo.phases[phaseIndex]

  useEffect(() => {
    setPhaseIndex(0)
    setProgress(0)
    setPlaying(false)
  }, [demoKey])

  useEffect(() => {
    if (!playing) return
    let raf
    function tick(ts) {
      if (!lastRef.current) lastRef.current = ts
      const dt = (ts - lastRef.current) / 1000
      lastRef.current = ts
      setProgress(p => {
        const dur = Math.max(.1, phase.duracao || 2)
        const np = p + (dt * speed) / dur
        if (np >= 1) {
          if (phaseIndex < demo.phases.length - 1) {
            setPhaseIndex(i => i + 1)
            return 0
          }
          setPlaying(false)
          return 1
        }
        return np
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); lastRef.current = null }
  }, [playing, phaseIndex, speed, phase?.duracao, demo.phases.length])

  function reset(){
    setPlaying(false); setPhaseIndex(0); setProgress(0)
  }

  function previous(){
    setPlaying(false)
    setPhaseIndex(i => Math.max(0, i-1))
    setProgress(0)
  }

  function next(){
    setPlaying(false)
    setPhaseIndex(i => Math.min(demo.phases.length-1, i+1))
    setProgress(0)
  }

  function speak(){
    window.speechSynthesis?.cancel()
    const u = new SpeechSynthesisUtterance(phase.narracao || phase.nome)
    u.lang = 'pt-PT'
    window.speechSynthesis?.speak(u)
  }

  const pct = Math.round(progress * 100)

  return (
    <div className="v7PlayerWrap">
      <div className="v7Top">
        <div>
          <h1>Animações Táticas V7</h1>
          <p>{demo.nome} — {demo.descricao}</p>
        </div>
        <div className="v7Selects">
          <select value={demoKey} onChange={e=>setDemoKey(e.target.value)}>
            <option value="cantoCurto">Futebol — Canto curto</option>
            <option value="futsal31">Futsal — 3-1 saída</option>
          </select>
          <select value={speed} onChange={e=>setSpeed(Number(e.target.value))}>
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
        </div>
      </div>

      <CampoAnimado modalidade={demo.modalidade} players={demo.players} ball={demo.ball} phase={phase} progress={progress} />

      <div className="v7Controls">
        <button onClick={reset}><RotateCcw size={18}/> Reiniciar</button>
        <button onClick={previous}><SkipBack size={18}/> Anterior</button>
        <button className="primary" onClick={()=>setPlaying(v=>!v)}>{playing ? <Pause size={18}/> : <Play size={18}/>} {playing ? 'Pausa' : 'Play'}</button>
        <button onClick={next}><SkipForward size={18}/> Seguinte</button>
        <button onClick={speak}><Volume2 size={18}/> Narração</button>
        <button onClick={()=>onLoadToBoard && onLoadToBoard(demo)}>Aplicar no quadro</button>
      </div>

      <div className="v7Timeline">
        {demo.phases.map((f,i)=>(
          <button key={i} className={i === phaseIndex ? 'active' : i < phaseIndex ? 'done' : ''} onClick={()=>{setPlaying(false);setPhaseIndex(i);setProgress(0)}}>
            <b>{i+1}</b>
            <span>{f.nome}</span>
          </button>
        ))}
      </div>

      <div className="v7Info">
        <h2>{phase.nome}</h2>
        <p>{phase.narracao}</p>
        <div className="v7Progress"><span style={{width:`${pct}%`}} /></div>
      </div>
    </div>
  )
}
