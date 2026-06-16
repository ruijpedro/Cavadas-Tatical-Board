
import React from 'react'

export function CampoSVGPro({ modalidade = 'futsal' }) {
  if (modalidade === 'futebol') return <CampoFutebolPro />
  if (modalidade === 'voleibol') return <CampoVoleibolPro />
  return <CampoFutsalPro />
}

function CampoFutebolPro(){
  return (
    <svg className="campo-svg-pro" viewBox="0 0 120 78" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern id="grassA" width="20" height="78" patternUnits="userSpaceOnUse">
          <rect width="10" height="78" fill="#1b843a"/>
          <rect x="10" width="10" height="78" fill="#219845"/>
        </pattern>
        <pattern id="goalNetF" width="1.6" height="1.6" patternUnits="userSpaceOnUse">
          <path d="M0 0H1.6V1.6" fill="none" stroke="rgba(255,255,255,.65)" strokeWidth=".18"/>
        </pattern>
      </defs>
      <rect x="0" y="0" width="120" height="78" fill="url(#grassA)"/>
      <rect x="4" y="4" width="112" height="70" rx="1.2" fill="none" stroke="white" strokeWidth="0.85"/>
      <line x1="60" y1="4" x2="60" y2="74" stroke="white" strokeWidth="0.62"/>
      <circle cx="60" cy="39" r="9.15" fill="none" stroke="white" strokeWidth="0.62"/>
      <circle cx="60" cy="39" r="0.55" fill="white"/>
      <rect x="4" y="17.2" width="18.0" height="43.6" fill="none" stroke="white" strokeWidth="0.68"/>
      <rect x="98" y="17.2" width="18.0" height="43.6" fill="none" stroke="white" strokeWidth="0.68"/>
      <rect x="4" y="29.0" width="6.8" height="20.0" fill="none" stroke="white" strokeWidth="0.68"/>
      <rect x="109.2" y="29.0" width="6.8" height="20.0" fill="none" stroke="white" strokeWidth="0.68"/>
      <circle cx="15.0" cy="39" r="0.58" fill="white"/>
      <circle cx="105.0" cy="39" r="0.58" fill="white"/>
      <path d="M22 31.8 A9.15 9.15 0 0 1 22 46.2" fill="none" stroke="white" strokeWidth="0.62"/>
      <path d="M98 31.8 A9.15 9.15 0 0 0 98 46.2" fill="none" stroke="white" strokeWidth="0.62"/>
      <path d="M4 7 A3 3 0 0 0 7 4" fill="none" stroke="white" strokeWidth="0.62"/>
      <path d="M113 4 A3 3 0 0 0 116 7" fill="none" stroke="white" strokeWidth="0.62"/>
      <path d="M4 71 A3 3 0 0 1 7 74" fill="none" stroke="white" strokeWidth="0.62"/>
      <path d="M113 74 A3 3 0 0 1 116 71" fill="none" stroke="white" strokeWidth="0.62"/>
      <rect x="1.2" y="34" width="2.8" height="10" fill="url(#goalNetF)" stroke="white" strokeWidth="0.55"/>
      <rect x="116" y="34" width="2.8" height="10" fill="url(#goalNetF)" stroke="white" strokeWidth="0.55"/>
    </svg>
  )
}

function CampoFutsalPro(){
  return (
    <svg className="campo-svg-pro" viewBox="0 0 120 78" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern id="goalNetFs" width="1.5" height="1.5" patternUnits="userSpaceOnUse">
          <path d="M0 0H1.5V1.5" fill="none" stroke="rgba(255,255,255,.68)" strokeWidth=".16"/>
        </pattern>
      </defs>
      <rect x="0" y="0" width="120" height="78" fill="#2878bd"/>
      <rect x="4" y="4" width="112" height="70" rx="1.2" fill="none" stroke="white" strokeWidth="0.85"/>
      <line x1="60" y1="4" x2="60" y2="74" stroke="white" strokeWidth="0.62"/>
      <circle cx="60" cy="39" r="6" fill="none" stroke="white" strokeWidth="0.62"/>
      <circle cx="60" cy="39" r="0.55" fill="white"/>
      {/* Área de futsal: arco principal + segmentos junto à linha de baliza */}
      <path d="M4 24 C18 24 18 54 4 54" fill="none" stroke="white" strokeWidth="0.78"/>
      <path d="M116 24 C102 24 102 54 116 54" fill="none" stroke="white" strokeWidth="0.78"/>
      <line x1="4" y1="30" x2="6.6" y2="30" stroke="white" strokeWidth="0.78"/>
      <line x1="4" y1="48" x2="6.6" y2="48" stroke="white" strokeWidth="0.78"/>
      <line x1="113.4" y1="30" x2="116" y2="30" stroke="white" strokeWidth="0.78"/>
      <line x1="113.4" y1="48" x2="116" y2="48" stroke="white" strokeWidth="0.78"/>
      <circle cx="16" cy="39" r="0.62" fill="white"/>
      <circle cx="28" cy="39" r="0.62" fill="white"/>
      <circle cx="104" cy="39" r="0.62" fill="white"/>
      <circle cx="92" cy="39" r="0.62" fill="white"/>
      <path d="M4 7 A3 3 0 0 0 7 4" fill="none" stroke="white" strokeWidth="0.62"/>
      <path d="M113 4 A3 3 0 0 0 116 7" fill="none" stroke="white" strokeWidth="0.62"/>
      <path d="M4 71 A3 3 0 0 1 7 74" fill="none" stroke="white" strokeWidth="0.62"/>
      <path d="M113 74 A3 3 0 0 1 116 71" fill="none" stroke="white" strokeWidth="0.62"/>
      {/* zonas de substituição */}
      <line x1="31" y1="74" x2="31" y2="76.2" stroke="white" strokeWidth="0.72"/>
      <line x1="43" y1="74" x2="43" y2="76.2" stroke="white" strokeWidth="0.72"/>
      <line x1="77" y1="74" x2="77" y2="76.2" stroke="white" strokeWidth="0.72"/>
      <line x1="89" y1="74" x2="89" y2="76.2" stroke="white" strokeWidth="0.72"/>
      <rect x="1.4" y="34.8" width="2.6" height="8.4" fill="url(#goalNetFs)" stroke="white" strokeWidth="0.55"/>
      <rect x="116" y="34.8" width="2.6" height="8.4" fill="url(#goalNetFs)" stroke="white" strokeWidth="0.55"/>
    </svg>
  )
}

function CampoVoleibolPro(){
  return (
    <svg className="campo-svg-pro" viewBox="0 0 120 78" preserveAspectRatio="none" aria-hidden="true">
      <rect x="0" y="0" width="120" height="78" fill="#dd8f2c"/>
      <rect x="10" y="8" width="100" height="62" fill="none" stroke="white" strokeWidth="0.9"/>
      <line x1="60" y1="8" x2="60" y2="70" stroke="white" strokeWidth="1.2"/>
      <line x1="42" y1="8" x2="42" y2="70" stroke="white" strokeWidth="0.65" strokeDasharray="2 2"/>
      <line x1="78" y1="8" x2="78" y2="70" stroke="white" strokeWidth="0.65" strokeDasharray="2 2"/>
    </svg>
  )
}
