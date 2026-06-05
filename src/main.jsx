import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Play, Pause, RotateCcw, Plus, Trash2, Save, FileDown, MousePointer2, ArrowRight, Users, BookOpen, Cloud, Home, Video, BarChart3, Move, Target, Undo2, Mic, Volume2, StepForward, Clock, Copy, Layers, SquarePlus } from 'lucide-react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import './styles.css'

const STORE_KEY = 'cavadas_tactical_v2'

const startPlayers = [
  { id: 'a1', team: 'A', num: 1, x: 12, y: 50, role: 'GR' },
  { id: 'a2', team: 'A', num: 2, x: 28, y: 25, role: 'DEF' },
  { id: 'a3', team: 'A', num: 3, x: 28, y: 75, role: 'DEF' },
  { id: 'a4', team: 'A', num: 4, x: 48, y: 38, role: 'ALA' },
  { id: 'a5', team: 'A', num: 5, x: 48, y: 62, role: 'ALA' },
  { id: 'a6', team: 'A', num: 6, x: 68, y: 50, role: 'PIV' },
  { id: 'b1', team: 'B', num: 1, x: 88, y: 50, role: 'GR' },
  { id: 'b2', team: 'B', num: 2, x: 72, y: 25, role: 'DEF' },
  { id: 'b3', team: 'B', num: 3, x: 72, y: 75, role: 'DEF' },
  { id: 'b4', team: 'B', num: 4, x: 54, y: 38, role: 'ALA' },
  { id: 'b5', team: 'B', num: 5, x: 54, y: 62, role: 'ALA' },
  { id: 'ball', team: 'BALL', num: '⚽', x: 50, y: 50, role: 'BOLA' }
]

const seeds = [
  { title: 'Saída curta + terceiro homem', category: 'Organização Ofensiva', notes: 'GR liga no fixo. Ala atrai pressão. Apoio frontal solta no terceiro homem.', phases: 3 },
  { title: 'Pressão alta 2+1', category: 'Organização Defensiva', notes: 'Primeira linha condiciona saída. Segundo jogador fecha linha interior.', phases: 2 },
  { title: 'Transição ofensiva rápida', category: 'Transição Ofensiva', notes: 'Recuperar, primeiro passe vertical, apoio em largura e ataque ao espaço.', phases: 3 },
  { title: 'Canto curto', category: 'Bolas Paradas', notes: 'Jogador aproxima, devolução rápida e remate exterior.', phases: 2 }
]

const basePhase = (name, duration = 3, pause = 1) => ({ id: uid('fase'), name, duration, pause, narration: '', voiceNote: '', positions: {}, arrows: [] })
function uid(prefix='id'){ return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}` }
function clamp(n,min,max){ return Math.max(min, Math.min(max,n)) }
function lerp(a,b,t){ return a + (b-a)*t }

function App(){
  const boardRef = useRef(null)
  const fileAudioRef = useRef(null)
  const [tab,setTab] = useState('tatico')
  const [pitch,setPitch] = useState('futsal')
  const [players,setPlayers] = useState(startPlayers)
  const [phases,setPhases] = useState([basePhase('Fase 1 — Saída curta'), basePhase('Fase 2 — Fixar e soltar'), basePhase('Fase 3 — Finalização')])
  const [phaseIndex,setPhaseIndex] = useState(0)
  const [selected,setSelected] = useState(null)
  const [tool,setTool] = useState('move')
  const [draftArrow,setDraftArrow] = useState(null)
  const [dragId,setDragId] = useState(null)
  const [playing,setPlaying] = useState(false)
  const [time,setTime] = useState(0)
  const [speed,setSpeed] = useState(1)
  const [exerciseTitle,setExerciseTitle] = useState('Exercício 01 — Organização Ofensiva')
  const [exerciseCategory,setExerciseCategory] = useState('Futsal')
  const [exerciseNotes,setExerciseNotes] = useState('Objetivo: criar superioridade no corredor central e finalizar após apoio frontal.')
  const [library,setLibrary] = useState(seeds)

  const current = phases[phaseIndex]
  const totalTime = phases.reduce((s,p)=>s + Number(p.duration||0) + Number(p.pause||0), 0)

  useEffect(()=>{
    const raw = localStorage.getItem(STORE_KEY)
    if(!raw) return
    try{
      const data = JSON.parse(raw)
      setPlayers(data.players || startPlayers)
      setPhases(data.phases || [basePhase('Fase 1')])
      setExerciseTitle(data.exerciseTitle || exerciseTitle)
      setExerciseCategory(data.exerciseCategory || exerciseCategory)
      setExerciseNotes(data.exerciseNotes || exerciseNotes)
      setLibrary(data.library || seeds)
      setPitch(data.pitch || 'futsal')
    }catch{}
  },[])

  useEffect(()=>{
    if(!playing) return
    const t = setInterval(()=>setTime(v => v >= totalTime ? 0 : v + 0.06*speed), 60)
    return ()=>clearInterval(t)
  },[playing,totalTime,speed])

  useEffect(()=>{
    let acc = 0
    for(let i=0;i<phases.length;i++){
      const end = acc + Number(phases[i].duration||0) + Number(phases[i].pause||0)
      if(time <= end){ setPhaseIndex(i); break }
      acc = end
    }
  },[time,phases])

  const phaseTiming = useMemo(()=>{
    let start = 0
    for(let i=0;i<phaseIndex;i++) start += Number(phases[i].duration||0) + Number(phases[i].pause||0)
    const p = phases[phaseIndex]
    const local = clamp(time - start, 0, Number(p.duration||0) + Number(p.pause||0))
    const moveT = clamp(local / Number(p.duration||1), 0, 1)
    const inPause = local > Number(p.duration||0)
    return { local, moveT, inPause }
  },[time,phaseIndex,phases])

  const displayPlayers = useMemo(()=>{
    const previousPositions = {}
    for(let i=0;i<phaseIndex;i++) Object.assign(previousPositions, phases[i].positions || {})
    const targetPositions = current?.positions || {}
    return players.map(p=>{
      const from = previousPositions[p.id] || { x:p.x, y:p.y }
      const to = targetPositions[p.id] || from
      const t = phaseTiming.moveT
      return { ...p, x: lerp(from.x,to.x,t), y: lerp(from.y,to.y,t) }
    })
  },[players,phases,phaseIndex,current,phaseTiming.moveT])

  const saveLocal=()=>{
    localStorage.setItem(STORE_KEY, JSON.stringify({ players, phases, exerciseTitle, exerciseCategory, exerciseNotes, library, pitch }))
    alert('Cavadas Tactical V2 guardado localmente.')
  }
  const resetBoard=()=>{ setPlayers(startPlayers); setPhases([basePhase('Fase 1 — Saída curta'),basePhase('Fase 2 — Desenvolvimento')]); setTime(0); setPlaying(false); setPhaseIndex(0) }
  const addPlayer=(team)=>{ const nums=players.filter(p=>p.team===team).map(p=>Number(p.num)||0); setPlayers([...players,{id:uid(team.toLowerCase()),team,num:Math.max(0,...nums)+1,x:team==='A'?35:65,y:50,role:'JOG'}]) }
  const removeSelected=()=>{ if(!selected) return; setPlayers(players.filter(p=>p.id!==selected)); setPhases(phases.map(ph=>({...ph, positions:Object.fromEntries(Object.entries(ph.positions||{}).filter(([id])=>id!==selected)), arrows:(ph.arrows||[]).filter(a=>a.playerId!==selected)}))); setSelected(null) }
  const boardPoint=(event)=>{ const r=boardRef.current.getBoundingClientRect(); return {x:clamp(((event.clientX-r.left)/r.width)*100,0,100), y:clamp(((event.clientY-r.top)/r.height)*100,0,100)} }
  const updatePhase=(patch)=>setPhases(phases.map((p,i)=>i===phaseIndex?{...p,...patch}:p))
  const updatePhasePosition=(id,pt)=>updatePhase({ positions:{...(current.positions||{}), [id]:pt } })
  const addPhase=()=>{ setPhases([...phases, basePhase(`Fase ${phases.length+1}`)]); setPhaseIndex(phases.length) }
  const duplicatePhase=()=>{ const p=phases[phaseIndex]; setPhases([...phases.slice(0,phaseIndex+1), {...p,id:uid('fase'), name:p.name+' cópia'}, ...phases.slice(phaseIndex+1)]) }
  const deletePhase=()=>{ if(phases.length<=1) return; const next=phases.filter((_,i)=>i!==phaseIndex); setPhases(next); setPhaseIndex(Math.max(0,phaseIndex-1)); setTime(0) }

  const onPointerDown=(event,id)=>{ event.stopPropagation(); setSelected(id); if(tool==='move') setDragId(id); if(tool==='arrow'){ const p=displayPlayers.find(pl=>pl.id===id); setDraftArrow({ id:'draft', playerId:id, x1:p.x, y1:p.y, x2:p.x, y2:p.y, type:'movimento' }) } }
  const onBoardMove=(event)=>{ const pt=boardPoint(event); if(dragId&&tool==='move') updatePhasePosition(dragId,pt); if(draftArrow&&tool==='arrow') setDraftArrow({...draftArrow,x2:pt.x,y2:pt.y}) }
  const onBoardUp=()=>{ if(draftArrow){ updatePhase({ arrows:[...(current.arrows||[]), {...draftArrow,id:uid('arr')}] }); setDraftArrow(null) } setDragId(null) }

  const speak=()=>{
    const text = current?.narration || exerciseNotes
    if(!text) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang='pt-PT'; u.rate=0.95
    window.speechSynthesis.speak(u)
  }
  const attachAudio=(e)=>{ const f=e.target.files?.[0]; if(!f) return; const url=URL.createObjectURL(f); updatePhase({ voiceNote:url }) }
  const exportPDF=async()=>{
    const canvas=await html2canvas(boardRef.current,{backgroundColor:'#111',scale:2})
    const img=canvas.toDataURL('image/png')
    const pdf=new jsPDF('landscape','mm','a4')
    pdf.setFillColor(5,5,5); pdf.rect(0,0,297,210,'F')
    pdf.setTextColor(255,214,0); pdf.setFontSize(18); pdf.text('CAVADAS TACTICAL — V2',14,16)
    pdf.setTextColor(255,255,255); pdf.setFontSize(12); pdf.text(exerciseTitle,14,27); pdf.text(`Categoria: ${exerciseCategory}`,14,35)
    pdf.addImage(img,'PNG',14,44,176,110)
    pdf.setFontSize(10); pdf.text('Notas gerais:',202,48); pdf.text(pdf.splitTextToSize(exerciseNotes,82),202,58)
    let y=96; pdf.setTextColor(255,214,0); pdf.text('Fases / Narração:',202,y); y+=8; pdf.setTextColor(255,255,255)
    phases.forEach((p,i)=>{ if(y<188){ pdf.text(`${i+1}. ${p.name} (${p.duration}s + pausa ${p.pause}s)`,202,y); y+=6; pdf.text(pdf.splitTextToSize(p.narration||'Sem narração definida.',82),202,y); y+=12 } })
    pdf.setTextColor(160,160,160); pdf.text('Documento gerado pela app Cavadas Tactical.',14,196)
    pdf.save('Cavadas_Tactical_V2.pdf')
  }
  const saveToLibrary=()=>{ setLibrary([{title:exerciseTitle,category:exerciseCategory,notes:exerciseNotes,phases:phases.length},...library]); saveLocal() }

  return <div className="app">
    <header className="topbar"><div className="brandMark">CT</div><div><h1>Cavadas Tactical</h1><p>V2 — animações por fases, pausas e narração</p></div></header>
    <nav className="tabs">
      <button className={tab==='inicio'?'active':''} onClick={()=>setTab('inicio')}><Home size={18}/>Início</button>
      <button className={tab==='tatico'?'active':''} onClick={()=>setTab('tatico')}><Target size={18}/>Tática</button>
      <button className={tab==='timeline'?'active':''} onClick={()=>setTab('timeline')}><Layers size={18}/>Timeline</button>
      <button className={tab==='exercicios'?'active':''} onClick={()=>setTab('exercicios')}><BookOpen size={18}/>Exercícios</button>
      <button className={tab==='videos'?'active':''} onClick={()=>setTab('videos')}><Video size={18}/>Vídeos</button>
      <button className={tab==='atletas'?'active':''} onClick={()=>setTab('atletas')}><BarChart3 size={18}/>Atletas</button>
      <button className={tab==='cloud'?'active':''} onClick={()=>setTab('cloud')}><Cloud size={18}/>Cloud</button>
    </nav>

    {tab==='inicio'&&<HomePanel setTab={setTab} library={library} phases={phases}/>}    
    {tab==='tatico'&&<main className="workspace">
      <section className="sidePanel">
        <label>Título</label><input value={exerciseTitle} onChange={e=>setExerciseTitle(e.target.value)}/>
        <label>Categoria</label><input value={exerciseCategory} onChange={e=>setExerciseCategory(e.target.value)}/>
        <label>Notas gerais</label><textarea value={exerciseNotes} onChange={e=>setExerciseNotes(e.target.value)}/>
        <label>Fase atual</label><select value={phaseIndex} onChange={e=>{setPhaseIndex(Number(e.target.value)); setTime(phases.slice(0,Number(e.target.value)).reduce((s,p)=>s+p.duration+p.pause,0))}}>{phases.map((p,i)=><option key={p.id} value={i}>{i+1}. {p.name}</option>)}</select>
        <div className="buttonGrid">
          <button onClick={()=>setTool('move')} className={tool==='move'?'yellow':''}><Move size={16}/>Mover</button>
          <button onClick={()=>setTool('arrow')} className={tool==='arrow'?'yellow':''}><ArrowRight size={16}/>Seta</button>
          <button onClick={()=>addPlayer('A')}><Plus size={16}/>Jog. A</button>
          <button onClick={()=>addPlayer('B')}><Plus size={16}/>Jog. B</button>
          <button onClick={removeSelected}><Trash2 size={16}/>Apagar</button>
          <button onClick={resetBoard}><RotateCcw size={16}/>Reset</button>
        </div>
        <label>Tipo de campo</label><select value={pitch} onChange={e=>setPitch(e.target.value)}><option value="futsal">Futsal</option><option value="football7">Futebol 7</option><option value="football11">Futebol 11</option><option value="half">Meio campo</option></select>
        <div className="actions">
          <button onClick={()=>setPlaying(!playing)} className="primary">{playing?<Pause size={16}/>:<Play size={16}/>} {playing?'Pausar':'Animar'}</button>
          <button onClick={()=>{setPlaying(false);setTime(0)}}><Undo2 size={16}/>Início</button>
          <button onClick={speak}><Volume2 size={16}/>Ouvir fase</button>
          <button onClick={saveLocal}><Save size={16}/>Guardar</button>
          <button onClick={saveToLibrary}><BookOpen size={16}/>Biblioteca</button>
          <button onClick={exportPDF}><FileDown size={16}/>PDF</button>
        </div>
      </section>
      <section className="boardWrap">
        <div className="hint"><MousePointer2 size={15}/> Fase {phaseIndex+1}/{phases.length}: arrasta os jogadores para a posição final desta fase. A app anima a transição e faz a pausa configurada.</div>
        <div ref={boardRef} className={`pitch ${pitch}`} onPointerMove={onBoardMove} onPointerUp={onBoardUp} onPointerLeave={onBoardUp}>
          <PitchLines/><svg className="moveLayer" viewBox="0 0 100 100" preserveAspectRatio="none"><defs><marker id="arrowHead" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L7,3 z" fill="#ffd600"/></marker></defs>{[...(current?.arrows||[]),draftArrow].filter(Boolean).map(a=><line key={a.id} x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} stroke="#ffd600" strokeWidth="1.2" markerEnd="url(#arrowHead)"/> )}</svg>
          {displayPlayers.map(p=><Player key={p.id} p={p} selected={selected===p.id} onPointerDown={onPointerDown}/>) }
          {phaseTiming.inPause&&<div className="pauseBadge"><Clock size={18}/> Pausa explicativa</div>}
        </div>
        <TimelineBar phases={phases} time={time} totalTime={totalTime} setTime={setTime}/>
      </section>
    </main>}

    {tab==='timeline'&&<main className="timelinePanel">
      <section className="phaseEditor">
        <div className="phaseHeader"><h2>Timeline / Fases</h2><div className="miniActions"><button onClick={addPhase}><SquarePlus size={16}/>Nova fase</button><button onClick={duplicatePhase}><Copy size={16}/>Duplicar</button><button onClick={deletePhase}><Trash2 size={16}/>Apagar</button></div></div>
        <div className="phaseList">{phases.map((p,i)=><button key={p.id} className={i===phaseIndex?'active':''} onClick={()=>setPhaseIndex(i)}><b>{i+1}</b><span>{p.name}</span><small>{p.duration}s + pausa {p.pause}s</small></button>)}</div>
        <label>Nome da fase</label><input value={current.name} onChange={e=>updatePhase({name:e.target.value})}/>
        <div className="twoCols"><div><label>Duração movimento (s)</label><input type="number" min="1" value={current.duration} onChange={e=>updatePhase({duration:Number(e.target.value)})}/></div><div><label>Pausa depois do movimento (s)</label><input type="number" min="0" value={current.pause} onChange={e=>updatePhase({pause:Number(e.target.value)})}/></div></div>
        <label>Narração escrita / texto para voz</label><textarea value={current.narration} onChange={e=>updatePhase({narration:e.target.value})} placeholder="Ex.: O ala fixa o defensor, pausa curta, e o pivot ataca o espaço nas costas."/>
        <div className="miniActions"><button onClick={speak} className="primary"><Volume2 size={16}/>Ouvir texto</button><button onClick={()=>fileAudioRef.current.click()}><Mic size={16}/>Anexar áudio</button><input ref={fileAudioRef} type="file" accept="audio/*" hidden onChange={attachAudio}/>{current.voiceNote&&<audio controls src={current.voiceNote}/>}</div>
        <label>Velocidade da animação</label><input type="range" min="0.5" max="2" step="0.1" value={speed} onChange={e=>setSpeed(Number(e.target.value))}/><p className="muted">Velocidade atual: {speed.toFixed(1)}x</p>
        <div className="miniActions"><button onClick={()=>setPlaying(!playing)} className="primary">{playing?<Pause size={16}/>:<Play size={16}/>} Play</button><button onClick={()=>setTime(Math.max(0,time-1))}><Undo2 size={16}/> -1s</button><button onClick={()=>setTime(Math.min(totalTime,time+1))}><StepForward size={16}/> +1s</button></div>
      </section>
    </main>}

    {tab==='exercicios'&&<LibraryPanel library={library} load={ex=>{setExerciseTitle(ex.title);setExerciseCategory(ex.category);setExerciseNotes(ex.notes);setTab('tatico')}}/>}
    {tab==='videos'&&<Placeholder title="Vídeos" text="V2 preparada para importar vídeo real, congelar frames e desenhar setas por cima. A exportação MP4 entra na próxima ronda técnica."/>}
    {tab==='atletas'&&<Placeholder title="Atletas" text="Área preparada para ligação à Cavadas Academy: presença, escalão, posição, avaliação técnica/tática/física/mental e evolução."/>}
    {tab==='cloud'&&<CloudPanel/>}
  </div>
}

function Player({p,selected,onPointerDown}){ return <button className={`player team${p.team} ${selected?'selected':''}`} style={{left:`${p.x}%`,top:`${p.y}%`}} onPointerDown={e=>onPointerDown(e,p.id)}>{p.num}</button> }
function PitchLines(){ return <div className="lines"><div className="midline"/><div className="circle"/><div className="box left"/><div className="box right"/><div className="goal left"/><div className="goal right"/></div> }
function TimelineBar({phases,time,totalTime,setTime}){ let acc=0; return <div className="timeline"><div className="timeLabel">{time.toFixed(1)}s / {totalTime.toFixed(1)}s</div><div className="track" onClick={e=>{const r=e.currentTarget.getBoundingClientRect();setTime(((e.clientX-r.left)/r.width)*totalTime)}}><div className="progress" style={{width:`${totalTime?time/totalTime*100:0}%`}}/>{phases.map((p,i)=>{const w=(p.duration+p.pause)/totalTime*100; const left=acc/totalTime*100; acc+=p.duration+p.pause; return <span key={p.id} className="segment" style={{left:`${left}%`,width:`${w}%`}}>{i+1}</span>})}</div></div> }
function HomePanel({setTab,library,phases}){ return <main className="cards"><section className="hero"><h2>Bem-vindo ao Cavadas Tactical V2</h2><p>Cria exercícios com fases, movimentos com pequenas paragens, explicação por voz e exportação PDF.</p><button onClick={()=>setTab('tatico')} className="primary"><Target size={18}/>Abrir quadro tático</button></section><section className="stat"><Users/><b>{library.length}</b><span>exercícios na biblioteca</span></section><section className="stat"><Layers/><b>{phases.length}</b><span>fases na jogada atual</span></section></main> }
function LibraryPanel({library,load}){ return <main className="library">{library.map((ex,i)=><article key={i} className="exercise"><h3>{ex.title}</h3><b>{ex.category}</b><p>{ex.notes}</p><small>{ex.phases?`${ex.phases} fases`:''}</small><button onClick={()=>load(ex)}>Abrir</button></article>)}</main> }
function Placeholder({title,text}){ return <main className="placeholder"><h2>{title}</h2><p>{text}</p></main> }
function CloudPanel(){ return <main className="placeholder"><h2>Cloud Google</h2><p>Módulo reservado para Login Google, Drive, Sheets e Calendar. Mantém a arquitetura pronta para o módulo Google reutilizável dos projetos RJP/Cavadas.</p></main> }

createRoot(document.getElementById('root')).render(<App />)
