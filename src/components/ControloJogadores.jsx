
import React from 'react'
import { Minus, Plus, UserPlus, Users } from 'lucide-react'

export function gerarJogadoresPorControlo({ modalidade='futsal', atacantes=5, defensores=4, guardaRedes=1 }) {
  const isFutsal = modalidade === 'futsal'
  const aPos = isFutsal ? [[12,50],[32,24],[32,76],[50,50],[68,50],[58,25],[58,75],[78,35],[78,65],[46,18],[46,82]]
                        : [[8,88],[18,70],[30,55],[44,48],[58,42],[70,32],[78,22],[62,70],[45,78],[28,36],[52,25]]
  const dPos = isFutsal ? [[73,38],[73,62],[60,50],[84,50],[64,28],[64,72],[90,35],[90,65],[54,40],[54,60],[78,50]]
                        : [[48,34],[58,34],[68,38],[76,48],[64,58],[52,54],[42,46],[72,28],[56,22],[82,40],[70,70]]
  const players=[]
  for(let i=0;i<Number(atacantes);i++){ const p=aPos[i%aPos.length]; players.push({id:`A${i+1}`,n:i+1,team:'blue',x:p[0],y:p[1],nome:`Atacante ${i+1}`}) }
  for(let i=0;i<Number(defensores);i++){ const p=dPos[i%dPos.length]; players.push({id:`D${i+1}`,n:'X',team:'red',x:p[0],y:p[1],nome:`Defensor ${i+1}`}) }
  for(let i=0;i<Number(guardaRedes);i++){ players.push({id:`GR${i+1}`,n:guardaRedes>1?`GR${i+1}`:'GR',team:'yellow',x:isFutsal?(i===0?10:90):(i===0?8:92),y:50,nome:`Guarda-redes ${i+1}`}) }
  return players
}

function Row({label,value,min=0,max=22,onChange}) {
  return <div className="counterRowV94"><span>{label}</span><div className="counterBoxV94">
    <button onClick={()=>onChange(Math.max(min,value-1))}><Minus size={16}/></button><b>{value}</b>
    <button onClick={()=>onChange(Math.min(max,value+1))}><Plus size={16}/></button>
  </div></div>
}

export function ControloJogadores({ modalidade, config, setConfig, onAplicar }) {
  const total=Number(config.atacantes||0)+Number(config.defensores||0)+Number(config.guardaRedes||0)
  return <div className="playerControlV94">
    <h3><Users size={18}/> Jogadores</h3>
    <Row label="Atacantes" value={config.atacantes} min={1} max={modalidade==='futsal'?10:11} onChange={v=>setConfig({...config,atacantes:v})}/>
    <Row label="Defensores" value={config.defensores} min={0} max={modalidade==='futsal'?10:11} onChange={v=>setConfig({...config,defensores:v})}/>
    <Row label="Guarda-redes" value={config.guardaRedes} min={0} max={2} onChange={v=>setConfig({...config,guardaRedes:v})}/>
    <div className="totalPlayersV94">Total no exercício: <strong>{total}</strong></div>
    <button className="applyPlayersV94" onClick={onAplicar}><UserPlus size={18}/> Aplicar jogadores no campo</button>
  </div>
}
