
import React, { useState } from 'react'
import { Camera, Wand2, CheckCircle, SlidersHorizontal } from 'lucide-react'
import { analisarEsquemaAssistido } from '../data/iaVisionAssistida'

export function IAVisionAssistida({ onApply }) {
  const [preview, setPreview] = useState(null)
  const [modalidade, setModalidade] = useState('futebol')
  const [descricao, setDescricao] = useState('Canto curto com bola rasteira para a linha da pequena área e jogador a aparecer para finalizar.')
  const [detecoes, setDetecoes] = useState({ jogadores:8, defesas:5, setas:4, passes:2 })
  const [resultado, setResultado] = useState(null)

  function escolherImagem(e){
    const f = e.target.files?.[0]
    if(!f) return
    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result)
    reader.readAsDataURL(f)
  }

  function analisar(){
    setResultado(analisarEsquemaAssistido({ modalidade, descricao, detecoes }))
  }

  return (
    <div className="visionBox">
      <div className="visionHeader">
        <h2><Camera size={24}/> IA Vision Assistida</h2>
        <p>Fotografa um esquema manuscrito, confirma o que a IA encontrou e converte para fases/animação base.</p>
      </div>

      <div className="visionGrid">
        <div className="visionCard">
          <h3>1. Fotografia do esquema</h3>
          <label className="visionUpload">
            <Camera size={28}/>
            <span>Escolher fotografia</span>
            <input type="file" accept="image/*" onChange={escolherImagem}/>
          </label>
          {preview ? <img src={preview} className="visionPreview" alt="Esquema manuscrito"/> : <div className="visionEmpty">Sem imagem carregada</div>}
        </div>

        <div className="visionCard">
          <h3>2. Descrição rápida</h3>
          <label>Modalidade</label>
          <select value={modalidade} onChange={e=>setModalidade(e.target.value)}>
            <option value="futebol">Futebol</option>
            <option value="futsal">Futsal</option>
            <option value="voleibol">Voleibol</option>
          </select>

          <label>O que representa o desenho?</label>
          <textarea rows={5} value={descricao} onChange={e=>setDescricao(e.target.value)} />

          <h3><SlidersHorizontal size={18}/> Confirmação assistida</h3>
          <div className="visionCounters">
            <label>Jogadores <input type="number" value={detecoes.jogadores} onChange={e=>setDetecoes({...detecoes,jogadores:e.target.value})}/></label>
            <label>Defesas <input type="number" value={detecoes.defesas} onChange={e=>setDetecoes({...detecoes,defesas:e.target.value})}/></label>
            <label>Setas <input type="number" value={detecoes.setas} onChange={e=>setDetecoes({...detecoes,setas:e.target.value})}/></label>
            <label>Passes <input type="number" value={detecoes.passes} onChange={e=>setDetecoes({...detecoes,passes:e.target.value})}/></label>
          </div>

          <button className="visionMain" onClick={analisar}><Wand2 size={18}/> Analisar esquema</button>
        </div>
      </div>

      {resultado && <div className="visionResult">
        <h3><CheckCircle size={20}/> Resultado interpretado</h3>
        <p><b>Tipo:</b> {resultado.tipo}</p>
        <p><b>Resumo:</b> {resultado.resumo}</p>
        <p><b>Nome:</b> {resultado.nome}</p>
        <p><b>Objetivo:</b> {resultado.objetivo}</p>
        <h4>Fases criadas</h4>
        <ol>
          {resultado.fases.map((f,i)=><li key={i}><b>{f.nome}</b> — {f.narracao}</li>)}
        </ol>
        <button className="visionMain" onClick={()=>onApply && onApply(resultado)}>Aplicar no quadro tático</button>
      </div>}
    </div>
  )
}
