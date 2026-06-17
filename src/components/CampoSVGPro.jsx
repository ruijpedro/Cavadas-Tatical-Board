
import React from 'react'

export function CampoSVGPro({ modalidade = 'futebol' }) {
  if (modalidade === 'futsal') return <CampoFutsalSVG />
  if (modalidade === 'voleibol') return <CampoVoleibolSVG />
  return <CampoFutebolSVG />
}

function CampoFutebolSVG() {
  return (
    <svg className="campo-svg-pro campo-svg-futebol" viewBox="0 0 120 78" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern id="netFootballV93" width="1.2" height="1.2" patternUnits="userSpaceOnUse">
          <path d="M 1.2 0 L 0 0 0 1.2" fill="none" stroke="rgba(255,255,255,.75)" strokeWidth=".15"/>
        </pattern>
      </defs>

      <rect x="4" y="4" width="112" height="70" rx="1.5" fill="none" stroke="white" strokeWidth=".9"/>
      <line x1="60" y1="4" x2="60" y2="74" stroke="white" strokeWidth=".7"/>
      <circle cx="60" cy="39" r="9.15" fill="none" stroke="white" strokeWidth=".7"/>
      <circle cx="60" cy="39" r=".65" fill="white"/>

      <rect x="4" y="18" width="17.5" height="42" fill="none" stroke="white" strokeWidth=".7"/>
      <rect x="98.5" y="18" width="17.5" height="42" fill="none" stroke="white" strokeWidth=".7"/>

      <rect x="4" y="29" width="6.3" height="20" fill="none" stroke="white" strokeWidth=".7"/>
      <rect x="109.7" y="29" width="6.3" height="20" fill="none" stroke="white" strokeWidth=".7"/>

      <circle cx="15" cy="39" r=".65" fill="white"/>
      <circle cx="105" cy="39" r=".65" fill="white"/>

      <path d="M21.5 31.4 A9.15 9.15 0 0 1 21.5 46.6" fill="none" stroke="white" strokeWidth=".7"/>
      <path d="M98.5 31.4 A9.15 9.15 0 0 0 98.5 46.6" fill="none" stroke="white" strokeWidth=".7"/>

      <path d="M4 7 A3 3 0 0 0 7 4" fill="none" stroke="white" strokeWidth=".7"/>
      <path d="M113 4 A3 3 0 0 0 116 7" fill="none" stroke="white" strokeWidth=".7"/>
      <path d="M4 71 A3 3 0 0 1 7 74" fill="none" stroke="white" strokeWidth=".7"/>
      <path d="M113 74 A3 3 0 0 1 116 71" fill="none" stroke="white" strokeWidth=".7"/>

      <rect x=".8" y="34" width="3.2" height="10" fill="url(#netFootballV93)" stroke="white" strokeWidth=".55"/>
      <rect x="116" y="34" width="3.2" height="10" fill="url(#netFootballV93)" stroke="white" strokeWidth=".55"/>
    </svg>
  )
}

function CampoFutsalSVG() {
  return (
    <svg className="campo-svg-pro campo-svg-futsal futsal-clean-v93" viewBox="0 0 120 78" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern id="netFutsalCleanV93" width="1.1" height="1.1" patternUnits="userSpaceOnUse">
          <path d="M 1.1 0 L 0 0 0 1.1" fill="none" stroke="rgba(255,255,255,.78)" strokeWidth=".13"/>
        </pattern>
      </defs>

      {/* Limite exterior */}
      <rect x="4" y="4" width="112" height="70" rx="1.5" fill="none" stroke="white" strokeWidth=".95"/>

      {/* Linha central */}
      <line x1="60" y1="4" x2="60" y2="74" stroke="white" strokeWidth=".8"/>
      <circle cx="60" cy="39" r="6" fill="none" stroke="white" strokeWidth=".8"/>
      <circle cx="60" cy="39" r=".65" fill="white"/>

      {/* Áreas dos 6m — apenas arco limpo, SEM traços horizontais junto às balizas */}
      <path d="M4 24 C19 24 19 54 4 54" fill="none" stroke="white" strokeWidth="1.05"/>
      <path d="M116 24 C101 24 101 54 116 54" fill="none" stroke="white" strokeWidth="1.05"/>

      {/* Marcas oficiais simplificadas: 6m e 10m */}
      <circle cx="16" cy="39" r=".85" fill="white"/>
      <circle cx="28" cy="39" r=".85" fill="white"/>
      <circle cx="104" cy="39" r=".85" fill="white"/>
      <circle cx="92" cy="39" r=".85" fill="white"/>

      {/* Cantos */}
      <path d="M4 7 A3 3 0 0 0 7 4" fill="none" stroke="white" strokeWidth=".75"/>
      <path d="M113 4 A3 3 0 0 0 116 7" fill="none" stroke="white" strokeWidth=".75"/>
      <path d="M4 71 A3 3 0 0 1 7 74" fill="none" stroke="white" strokeWidth=".75"/>
      <path d="M113 74 A3 3 0 0 1 116 71" fill="none" stroke="white" strokeWidth=".75"/>

      {/* Zonas de substituição afastadas das balizas */}
      <g stroke="white" strokeWidth=".75">
        <line x1="31" y1="74" x2="31" y2="76.4"/>
        <line x1="45" y1="74" x2="45" y2="76.4"/>
        <line x1="75" y1="74" x2="75" y2="76.4"/>
        <line x1="89" y1="74" x2="89" y2="76.4"/>
      </g>

      {/* Balizas com rede — sem qualquer marca extra lateral */}
      <rect x=".8" y="34" width="3.2" height="10" fill="url(#netFutsalCleanV93)" stroke="white" strokeWidth=".6"/>
      <rect x="116" y="34" width="3.2" height="10" fill="url(#netFutsalCleanV93)" stroke="white" strokeWidth=".6"/>
    </svg>
  )
}

function CampoVoleibolSVG() {
  return (
    <svg className="campo-svg-pro campo-svg-voleibol" viewBox="0 0 120 78" preserveAspectRatio="none" aria-hidden="true">
      <rect x="10" y="8" width="100" height="62" fill="none" stroke="white" strokeWidth=".9"/>
      <line x1="60" y1="8" x2="60" y2="70" stroke="white" strokeWidth="1.2"/>
      <line x1="42" y1="8" x2="42" y2="70" stroke="white" strokeWidth=".65" strokeDasharray="2 2"/>
      <line x1="78" y1="8" x2="78" y2="70" stroke="white" strokeWidth=".65" strokeDasharray="2 2"/>
    </svg>
  )
}
