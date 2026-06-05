
import React, { useState } from 'react'
import { Upload, Wand2, Camera } from 'lucide-react'
import { interpretarEsquemaManual } from '../data/sketchInterpreter'

export function ImportarEsquema({ onApply }) {
  const [preview, setPreview] = useState(null)
  const [modalidade, setModalidade] = useState('futebol')
  const [descricao, setDescricao] = useState('Canto curto, bola rasteira para a linha da pequena área e jogador a aparecer para finalizar.')
  const [resultado, setResultado] = useState(null)

  function loadImage(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result)
    reader.readAsDataURL(file)
  }

  function interpretar() {
    const r = interpretarEsquemaManual({ modalidade, descricao })
    setResultado(r)
  }

  function aplicar() {
    if (resultado && onApply) onApply(resultado)
  }

  return (
    <div className="sketchBox">
      <h2><Camera size={22}/> Importar esquema desenhado à mão</h2>
      <p className="muted">Carrega uma fotografia do esquema, descreve rapidamente a jogada e a app converte para fases, narração e movimentos base.</p>

      <label className="uploadBox">
        <Upload size={22}/>
        <span>Escolher fotografia do esquema</span>
        <input type="file" accept="image/*" onChange={loadImage}/>
      </label>

      {preview && <img className="sketchPreview" src={preview} alt="Pré-visualização do esquema"/>}

      <label>Modalidade</label>
      <select value={modalidade} onChange={e=>setModalidade(e.target.value)}>
        <option value="futebol">Futebol</option>
        <option value="futsal">Futsal</option>
        <option value="voleibol">Voleibol</option>
      </select>

      <label>Descrição rápida do desenho</label>
      <textarea rows={4} value={descricao} onChange={e=>setDescricao(e.target.value)} />

      <button className="mainAction" onClick={interpretar}><Wand2 size={18}/> Interpretar esquema</button>

      {resultado && <div className="sketchResult">
        <h3>{resultado.nome}</h3>
        <p><b>Objetivo:</b> {resultado.objetivo}</p>
        <p><b>Organização:</b> {resultado.organizacao}</p>
        <b>Fases:</b>
        <ol>
          {resultado.fases.map((f,i)=><li key={i}>{f.nome} — {f.narracao}</li>)}
        </ol>
        <button className="mainAction" onClick={aplicar}>Aplicar no quadro tático</button>
      </div>}
    </div>
  )
}
