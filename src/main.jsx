
import React, { useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Play, Pause, Plus, FileText, Brain, BookOpen, Cloud, Download, Mic, Monitor, Search, Star, Users } from 'lucide-react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { bibliotecaProfissional, comandosIA, gerarExercicioIA } from './data/bibliotecaProfissional'
import './style.css'
import { ImportarEsquema } from './components/ImportarEsquema'
import { IAVisionAssistida } from './components/IAVisionAssistida'
import { EsquemasTreinoPanel, gerarJogadoresTreino } from './components/EsquemasTreinoPanel'

const posicoesBase = {
  futebol: [
    { id:'A1', n:1, team:'blue', x:12, y:50, nome:'GR' },
    { id:'A2', n:2, team:'blue', x:28, y:25, nome:'LD' },
    { id:'A3', n:3, team:'blue', x:28, y:75, nome:'LE' },
    { id:'A4', n:4, team:'blue', x:45, y:50, nome:'Médio' },
    { id:'A5', n:9, team:'blue', x:70, y:50, nome:'Avançado' },
    { id:'B1', n:'X', team:'red', x:78, y:36, nome:'Defesa' },
    { id:'B2', n:'X', team:'red', x:78, y:64, nome:'Defesa' }
  ],
  futsal: [
    { id:'A1', n:1, team:'yellow', x:12, y:50, nome:'GR' },
    { id:'A2', n:2, team:'blue', x:30, y:20, nome:'Ala' },
    { id:'A3', n:3, team:'blue', x:30, y:80, nome:'Ala' },
    { id:'A4', n:4, team:'blue', x:48, y:50, nome:'Fixo' },
    { id:'A5', n:5, team:'blue', x:68, y:50, nome:'Pivot' },
    { id:'B1', n:'X', team:'red', x:75, y:38, nome:'Defesa' },
    { id:'B2', n:'X', team:'red', x:75, y:62, nome:'Defesa' }
  ],
  voleibol: [
    { id:'A1', n:1, team:'blue', x:25, y:78, nome:'Zona 1' },
    { id:'A2', n:2, team:'blue', x:25, y:25, nome:'Zona 2' },
    { id:'A3', n:3, team:'blue', x:38, y:25, nome:'Zona 3' },
    { id:'A4', n:4, team:'blue', x:50, y:25, nome:'Zona 4' },
    { id:'A5', n:5, team:'blue', x:50, y:78, nome:'Zona 5' },
    { id:'A6', n:6, team:'blue', x:38, y:78, nome:'Zona 6' }
  ]
}

function Logo(){
  return (
    <div className="brand">
      <div className="brandIcon" aria-label="Cavadas Tactical">
        <svg viewBox="0 0 120 120" role="img">
          <rect x="4" y="4" width="112" height="112" rx="24" fill="#071A2E" stroke="#21496C" strokeWidth="3"/>
          <path d="M18 83 C34 56, 54 38, 80 27 C96 20, 108 24, 112 36" fill="none" stroke="#8BD62F" strokeWidth="8" strokeLinecap="round"/>
          <circle cx="38" cy="38" r="15" fill="#22A7E0"/>
          <path d="M36 25 C51 32, 56 47, 63 62 C70 78, 86 83, 101 85" fill="none" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round"/>
          <path d="M25 91 H95" stroke="#8BD62F" strokeWidth="6" strokeLinecap="round"/>
          <text x="60" y="106" textAnchor="middle" fontSize="22" fontFamily="Arial" fontWeight="900" fill="#FFFFFF">CT</text>
        </svg>
      </div>
      <div><b>CAVADAS</b><span>TACTICAL</span><small>Planear • Animar • Evoluir</small></div>
    </div>
  )
}

function Campo({ modalidade, children, refCampo, onMouseMove, onMouseUp }) {
  return <div ref={refCampo} className={`campo campo-${modalidade}`} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}>
    {modalidade === 'futebol' && <LinhasFutebol />}
    {modalidade === 'futsal' && <LinhasFutsal />}
    {modalidade === 'voleibol' && <LinhasVoleibol />}
    {children}
  </div>
}

function LinhasFutebol(){
  return <>
    <div className="linha-meio" /><div className="circulo-centro" />
    <div className="grande-area esq" /><div className="grande-area dir" />
    <div className="pequena-area esq" /><div className="pequena-area dir" />
    <div className="baliza esq" /><div className="baliza dir" />
  </>
}
function LinhasFutsal(){
  return <>
    <div className="linha-meio" /><div className="circulo-centro futsal" />
    <div className="area-futsal esq" /><div className="area-futsal dir" />
    <div className="baliza fut esq" /><div className="baliza fut dir" />
  </>
}
function LinhasVoleibol(){
  return <>
    <div className="rede" /><div className="linha-ataque esq" /><div className="linha-ataque dir" />
    {[1,2,3,4,5,6].map(n => <div key={n} className={`zona z${n}`}>{n}</div>)}
  </>
}

function App(){
  const campoRef = useRef(null)
  const dragRef = useRef(null)
  const [tab, setTab] = useState('quadro')
  const [modalidade, setModalidade] = useState('futsal')
  
  const [configTreino, setConfigTreino] = useState({ tipoTreino: 'campo', atacantes: 7, defensores: 6, guardaRedes: true })
  const [players, setPlayers] = useState(posicoesBase.futsal)
  const [ball, setBall] = useState({ x:50, y:50 })
  const [mode, setMode] = useState('move')
  const [paths, setPaths] = useState([])
  const [phase, setPhase] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [search, setSearch] = useState('')
  const [iaText, setIaText] = useState('Criar canto ofensivo com bola curta e cruzamento rasteiro')
  const [iaResult, setIaResult] = useState(null)
  const [notes, setNotes] = useState('Seleciona uma modalidade, arrasta jogadores e cria movimentos por fases.')
  const [fases, setFases] = useState([
    { nome:'Fase 1', pausa:1, narracao:'Organização inicial do exercício.' },
    { nome:'Fase 2', pausa:2, narracao:'Movimento principal e criação de linha de passe.' },
    { nome:'Fase 3', pausa:2, narracao:'Finalização ou progressão do exercício.' }
  ])

  function aplicarEsquemaTreino(){
    const novos = gerarJogadoresTreino({ modalidade, ...configTreino })
    setPlayers(novos)
    setBall({ x: modalidade === 'futsal' ? 48 : 8, y: modalidade === 'futsal' ? 50 : 92 })
    setPaths([])
    setPhase(0)

    const tipo = configTreino.tipoTreino === 'guarda-redes' ? 'guarda-redes' : 'jogadores de campo'
    setNotes(`${modalidade.toUpperCase()} — esquema de treino de ${tipo}.\n\nAtacantes: ${configTreino.atacantes}\nDefensores: ${configTreino.defensores}\nGuarda-redes: ${configTreino.guardaRedes ? 'sim' : 'não'}.\n\nJogadores aplicados automaticamente no campo.`)
  }

  function mudarModalidade(m){
    setModalidade(m)
    setPlayers((m === 'futebol' || m === 'futsal') ? gerarJogadoresTreino({ modalidade: m, ...configTreino }) : posicoesBase[m])
    setPaths([])
    setBall({ x: m === 'voleibol' ? 18 : 50, y: 50 })
    setNotes(`Modalidade selecionada: ${m.toUpperCase()}. Campo e posições base atualizados.`)
  }

  function getPos(e){
    const r = campoRef.current.getBoundingClientRect()
    return {
      x: Math.max(2, Math.min(98, ((e.clientX-r.left)/r.width)*100)),
      y: Math.max(2, Math.min(98, ((e.clientY-r.top)/r.height)*100))
    }
  }

  function startDrag(e, id, tipo='player'){
    dragRef.current = { id, tipo, start:getPos(e) }
  }

  function move(e){
    if(!dragRef.current || !campoRef.current) return
    const p = getPos(e)
    if(dragRef.current.tipo === 'ball') setBall(p)
    else setPlayers(ps => ps.map(j => j.id === dragRef.current.id ? { ...j, x:p.x, y:p.y } : j))
  }

  function stop(e){
    if(!dragRef.current || !campoRef.current) return
    const end = getPos(e)
    if(mode === 'animate' && dragRef.current.tipo === 'player'){
      setPaths(p => [...p, { id:Date.now(), phase, type:'move', from:dragRef.current.start, to:end }])
    }
    if(mode === 'pass' && dragRef.current.tipo === 'ball'){
      setPaths(p => [...p, { id:Date.now(), phase, type:'pass', from:dragRef.current.start, to:end }])
    }
    dragRef.current = null
  }

  function speak(txt){
    window.speechSynthesis?.cancel()
    const u = new SpeechSynthesisUtterance(txt)
    u.lang = 'pt-PT'
    window.speechSynthesis?.speak(u)
  }

  async function play(){
    setPlaying(true)
    for(let i=0;i<fases.length;i++){
      setPhase(i)
      speak(fases[i].narracao)
      await new Promise(r => setTimeout(r, (Number(fases[i].pausa)+2)*1000))
    }
    setPlaying(false)
  }

  function gerarIA(){
    const r = gerarExercicioIA(iaText)
    setIaResult(r)
    setNotes(`${r.nome}\n\nObjetivo: ${r.objetivo}\n\nOrganização: ${r.organizacao}\n\nExecução: ${r.execucao}`)
    if(r.modalidade) mudarModalidade(r.modalidade.toLowerCase() === 'futebol' ? 'futebol' : r.modalidade.toLowerCase() === 'voleibol' ? 'voleibol' : 'futsal')
    setFases(r.fases.map((f,i) => ({ nome:`Fase ${i+1}`, pausa:2, narracao: i === 0 ? r.narracao : f })))
  }

  function carregarBiblioteca(ex){
    setNotes(`${ex.titulo}\n\nObjetivo: ${ex.objetivo}\n\nOrigem: ${ex.origem}\nCategoria: ${ex.categoria}\nDuração: ${ex.duracao}\nJogadores: ${ex.jogadores}`)
    mudarModalidade(ex.modalidade.toLowerCase() === 'futebol' ? 'futebol' : ex.modalidade.toLowerCase() === 'voleibol' ? 'voleibol' : 'futsal')
    setFases(ex.fases.map((f,i)=>({ nome:`Fase ${i+1}`, pausa:2, narracao:f })))
    setTab('quadro')
  }

  async function exportPDF(){
    const canvas = await html2canvas(campoRef.current)
    const img = canvas.toDataURL('image/png')
    const doc = new jsPDF('landscape')
    doc.setFillColor(7,26,46); doc.rect(0,0,297,22,'F')
    doc.setTextColor(139,214,47); doc.setFontSize(18); doc.text('CAVADAS TACTICAL', 12, 14)
    doc.setTextColor(0,0,0); doc.setFontSize(14); doc.text('Ficha de Exercício', 12, 34)
    doc.addImage(img, 'PNG', 12, 42, 170, 115)
    doc.setFontSize(10); doc.text(notes, 190, 48, { maxWidth:90 })
    doc.setFontSize(11); doc.text('Fases:', 190, 120)
    fases.forEach((f,i)=>doc.text(`${i+1}. ${f.nome} — ${f.narracao}`, 190, 130+i*8, { maxWidth:90 }))
    doc.save('cavadas-tactical-exercicio.pdf')
  }


  function aplicarEsquemaInterpretado(esquema){
    const m = (esquema.modalidade || 'futebol').toLowerCase()
    setModalidade(m === 'voleibol' ? 'voleibol' : m === 'futsal' ? 'futsal' : 'futebol')
    if (esquema.players) setPlayers(esquema.players)
    if (esquema.ball) setBall(esquema.ball)
    if (esquema.fases) {
      setFases(esquema.fases.map((f,i)=>({ nome:f.nome || `Fase ${i+1}`, pausa:2, narracao:f.narracao || f.nome })))
      const newPaths = []
      esquema.fases.forEach((fase, idx)=>{
        ;(fase.movimentos || []).forEach((mv,j)=>{
          newPaths.push({ id: Date.now()+idx*100+j, phase:idx, type:mv.type || 'move', from:mv.from, to:mv.to })
        })
      })
      setPaths(newPaths)
      setPhase(0)
    }
    setNotes(`${esquema.nome}\n\nObjetivo: ${esquema.objetivo}\n\nOrganização: ${esquema.organizacao}`)
    setTab('quadro')
  }


  function aplicarVisionAssistida(esquema){
    const m = (esquema.modalidade || 'futebol').toLowerCase()
    setModalidade(m === 'voleibol' ? 'voleibol' : m === 'futsal' ? 'futsal' : 'futebol')
    if(esquema.players) setPlayers(esquema.players)
    if(esquema.ball) setBall(esquema.ball)
    if(esquema.fases){
      setFases(esquema.fases.map((f,i)=>({ nome:f.nome || `Fase ${i+1}`, pausa:2, narracao:f.narracao || f.nome })))
      const newPaths = []
      esquema.fases.forEach((fase,idx)=>{
        ;(fase.movimentos || []).forEach((mv,j)=>{
          newPaths.push({ id:Date.now()+idx*100+j, phase:idx, type:mv.type || 'move', from:mv.from, to:mv.to })
        })
      })
      setPaths(newPaths)
      setPhase(0)
    }
    setNotes(`${esquema.nome}\n\nTipo: ${esquema.tipo}\n\nObjetivo: ${esquema.objetivo}\n\nResumo: ${esquema.resumo}`)
    setTab('quadro')
  }

  const filtrados = bibliotecaProfissional.filter(x => `${x.origem} ${x.modalidade} ${x.categoria} ${x.titulo} ${x.objetivo}`.toLowerCase().includes(search.toLowerCase()))
  const visiblePaths = paths.filter(p => p.phase === phase)

  return <div className="app">
    <header className="topbar">
      <Logo />
      <nav>
        <button className={tab==='quadro'?'active':''} onClick={()=>setTab('quadro')}>Quadro</button>
        <button className={tab==='biblioteca'?'active':''} onClick={()=>setTab('biblioteca')}>Biblioteca</button>
        <button className={tab==='ia'?'active':''} onClick={()=>setTab('ia')}>IA Cavadas</button>
        <button className={tab==='vision'?'active':''} onClick={()=>setTab('vision')}>IA Vision</button>
        <button className={tab==='modelo'?'active':''} onClick={()=>setTab('modelo')}>Modelo</button>
        <button className={tab==='google'?'active':''} onClick={()=>setTab('google')}>Google</button>
      </nav>
    </header>

    <main className="layout">
      <aside className="panel">
        <h3>Modalidade</h3>
        <div className="modalidades">
          <button className={modalidade==='futsal'?'active':''} onClick={()=>mudarModalidade('futsal')}>Futsal</button>
          <button className={modalidade==='futebol'?'active':''} onClick={()=>mudarModalidade('futebol')}>Futebol</button>
          <button className={modalidade==='voleibol'?'active':''} onClick={()=>mudarModalidade('voleibol')}>Voleibol</button>
        </div>

        
        <EsquemasTreinoPanel
          modalidade={modalidade}
          config={configTreino}
          setConfig={setConfigTreino}
          onAplicar={aplicarEsquemaTreino}
        />

        <h3>Ferramentas</h3>
        <div className="tools">
          <button className={mode==='move'?'active':''} onClick={()=>setMode('move')}>Mover</button>
          <button className={mode==='animate'?'active':''} onClick={()=>setMode('animate')}>Animar</button>
          <button className={mode==='pass'?'active':''} onClick={()=>setMode('pass')}>Passe</button>
        </div>

        <div className="hint">
          <b>Como usar</b>
          <p>Escolhe a modalidade. Arrasta jogadores. Para criar animação, escolhe “Animar” e arrasta um jogador. Para passe, escolhe “Passe” e arrasta a bola.</p>
        </div>

        <h3>Fases</h3>
        <div className="timeline">
          {fases.map((f,i)=><button key={i} className={phase===i?'active':''} onClick={()=>setPhase(i)}>{i+1}</button>)}
          <button onClick={()=>setFases([...fases,{nome:`Fase ${fases.length+1}`,pausa:2,narracao:'Nova fase.'}])}><Plus size={16}/></button>
        </div>
        <label>Narração</label>
        <textarea value={fases[phase]?.narracao||''} onChange={e=>setFases(fs=>fs.map((f,i)=>i===phase?{...f,narracao:e.target.value}:f))}/>
        <button className="wide" onClick={()=>speak(fases[phase]?.narracao||'')}><Mic size={16}/> Ouvir fase</button>
      </aside>

      <section className="mainPanel">
        {tab === 'quadro' && <>
          <div className="sectionHead">
            <div>
              <h1>Quadro Tático</h1>
              <p>{modalidade.toUpperCase()} — fase {phase+1} de {fases.length}</p>
            </div>
            <div className="actions">
              <button onClick={play}>{playing ? <Pause/> : <Play/>} Play</button>
              <button onClick={exportPDF}><FileText/> PDF</button>
              <button onClick={()=>alert('MP4 preparado para a próxima fase com MediaRecorder/canvas.')}><Download/> MP4</button>
              <button onClick={()=>document.body.classList.toggle('presentation')}><Monitor/> Apresentação</button>
            </div>
          </div>
          <Campo modalidade={modalidade} refCampo={campoRef} onMouseMove={move} onMouseUp={stop}>
            <svg className="arrows" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs><marker id="arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><polygon points="0 0, 7 3.5, 0 7" fill="#8BD62F"/></marker></defs>
              {visiblePaths.map(p => <line key={p.id} x1={p.from.x} y1={p.from.y} x2={p.to.x} y2={p.to.y} className={p.type==='pass'?'pass':'move'} markerEnd="url(#arrow)" />)}
            </svg>
            {players.map(j => <div key={j.id} className={`player ${j.team}`} style={{left:`${j.x}%`, top:`${j.y}%`}} onMouseDown={e=>startDrag(e,j.id,'player')} title={j.nome}>{j.n}</div>)}
            {(modalidade !== 'voleibol') && <div className="ball" style={{left:`${ball.x}%`, top:`${ball.y}%`}} onMouseDown={e=>startDrag(e,'ball','ball')}>⚽</div>}
            {(modalidade === 'voleibol') && <div className="ball volley" style={{left:`${ball.x}%`, top:`${ball.y}%`}} onMouseDown={e=>startDrag(e,'ball','ball')}>🏐</div>}
          </Campo>
        </>}

        {tab === 'biblioteca' && <>
          <div className="sectionHead"><h1><BookOpen/> Biblioteca Profissional</h1></div>
          <div className="search"><Search size={18}/><input placeholder="Pesquisar por UEFA, FPF, Cavadas, futsal, canto..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
          <div className="cards">
            {filtrados.map((ex,i)=><div className="card" key={i}>
              <div className="cardTop"><b>{ex.titulo}</b><span>{ex.origem}</span></div>
              <p>{ex.objetivo}</p>
              <div className="tags"><span>{ex.modalidade}</span><span>{ex.categoria}</span><span>{ex.nivel}</span><span>{ex.duracao}</span></div>
              <button onClick={()=>carregarBiblioteca(ex)}>Carregar no quadro</button>
            </div>)}
          </div>
        </>}

        {tab === 'ia' && <>
          <div className="sectionHead"><h1><Brain/> IA Cavadas V1</h1></div>
          <div className="iaBox">
            <h2>O que queres criar hoje?</h2>
            <textarea value={iaText} onChange={e=>setIaText(e.target.value)} rows={4}/>
            <button onClick={gerarIA}>Gerar exercício</button>
            <div className="quick">
              {comandosIA.map(c=><button key={c} onClick={()=>setIaText(c)}>{c}</button>)}
            </div>
          </div>
          {iaResult && <div className="result">
            <h2>{iaResult.nome}</h2>
            <p><b>Objetivo:</b> {iaResult.objetivo}</p>
            <p><b>Organização:</b> {iaResult.organizacao}</p>
            <p><b>Execução:</b> {iaResult.execucao}</p>
            <p><b>Variantes:</b> {iaResult.variantes}</p>
            <p><b>Narração:</b> {iaResult.narracao}</p>
            <button onClick={()=>setTab('quadro')}>Ver no quadro</button>
          </div>}
        </>}


        {tab === 'sketch' && <>
          <div className="sectionHead"><h1>Importar Esquema</h1></div>
          <ImportarEsquema onApply={aplicarEsquemaInterpretado} />
        </>}


        {tab === 'vision' && <>
          <div className="sectionHead"><h1>IA Vision Assistida</h1></div>
          <IAVisionAssistida onApply={aplicarVisionAssistida} />
        </>}

        {tab === 'modelo' && <>
          <div className="sectionHead"><h1>Modelo de Jogo</h1></div>
          {['Organização Ofensiva','Organização Defensiva','Transição Ofensiva','Transição Defensiva','Bolas Paradas'].map(t=><div className="card" key={t}><b>{t}</b><p>Associar exercícios da biblioteca a este princípio do modelo Cavadas Academy.</p></div>)}
        </>}

        {tab === 'google' && <>
          <div className="sectionHead"><h1><Cloud/> Google</h1></div>
          {['Login Google','Google Drive — guardar exercícios/PDFs','Google Sheets — estatísticas/biblioteca','Google Calendar — treinos/jogos'].map(t=><div className="card" key={t}><b>{t}</b><p>Módulo preparado para ligar com Client ID e API Key do projeto.</p></div>)}
        </>}
      </section>

      <aside className="panel right">
        <h3>Notas / Informação</h3>
        <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={12}/>
        <div className="hint">
          <b>V3.3</b>
          <p>Inclui campo dinâmico real, biblioteca profissional, IA V1, PDF com logo, narração e estrutura Google.</p>
        </div>
      </aside>
    </main>
  </div>
}

createRoot(document.getElementById('root')).render(<App />)