
export const bibliotecaProfissional = [
  {
    origem: 'FPF',
    modalidade: 'Futsal',
    categoria: 'Organização Ofensiva',
    titulo: 'Futsal 3-1 — Saída de pressão',
    objetivo: 'Criar linha de passe no apoio frontal e sair da pressão pelo corredor lateral.',
    duracao: '12 min',
    jogadores: '5x5 + GR',
    nivel: 'Intermédio',
    fases: ['Organização inicial', 'Apoio frontal', 'Passe exterior', 'Ataque ao espaço', 'Finalização']
  },
  {
    origem: 'FPF',
    modalidade: 'Futsal',
    categoria: 'Rotação',
    titulo: 'Futsal 4-0 — Rotação simples',
    objetivo: 'Promover mobilidade, trocas posicionais e criação de espaço interior.',
    duracao: '10 min',
    jogadores: '4x4 + GR',
    nivel: 'Intermédio',
    fases: ['Amplitude', 'Troca curta', 'Rotação', 'Passe interior', 'Finalização']
  },
  {
    origem: 'UEFA',
    modalidade: 'Futebol',
    categoria: 'Bolas Paradas',
    titulo: 'Canto ofensivo — Bola curta e cruzamento rasteiro',
    objetivo: 'Atrair a pressão no canto curto e colocar a bola na linha da pequena área para finalização.',
    duracao: '8 min',
    jogadores: '8 atacantes x 7 defensores + GR',
    nivel: 'Avançado',
    fases: ['Organização', 'Passe curto', 'Cruzamento rasteiro', 'Aparecimento', 'Finalização']
  },
  {
    origem: 'Cavadas Academy',
    modalidade: 'Futebol',
    categoria: 'Transição Ofensiva',
    titulo: 'Transição 3x2 com finalização',
    objetivo: 'Após recuperação, atacar rápido a largura e criar situação de finalização.',
    duracao: '15 min',
    jogadores: '3x2 + GR',
    nivel: 'Base/Intermédio',
    fases: ['Recuperação', 'Passe vertical', 'Ataque corredor', 'Apoio', 'Finalização']
  },
  {
    origem: 'Cavadas Academy',
    modalidade: 'Voleibol',
    categoria: 'Organização Coletiva',
    titulo: 'Receção — Distribuição — Ataque',
    objetivo: 'Trabalhar receção, distribuição e ataque pelas zonas 2 e 4.',
    duracao: '15 min',
    jogadores: '6x6',
    nivel: 'Base',
    fases: ['Serviço', 'Receção', 'Distribuição', 'Ataque', 'Cobertura']
  }
]

export const comandosIA = [
  'Criar exercício de futsal 3-1 para saída de pressão',
  'Criar treino sub-15 de 75 minutos com foco em finalização',
  'Criar canto ofensivo com bola curta e cruzamento rasteiro',
  'Criar exercício de voleibol receção-distribuição-ataque',
  'Criar sessão de guarda-redes com reação e reposição'
]

export function gerarExercicioIA(texto) {
  const lower = texto.toLowerCase()
  if (lower.includes('canto')) {
    return {
      nome: 'Canto ofensivo — Bola curta na linha do primeiro poste',
      modalidade: 'Futebol',
      objetivo: 'Atrair a pressão junto à bandeirola e colocar a bola rasteira na linha da pequena área para finalização.',
      organizacao: '8 atacantes contra 7 defensores + guarda-redes. Um jogador no canto, um apoio curto, três jogadores na zona da pequena área e dois jogadores à entrada da área.',
      execucao: 'O executante joga curto. O apoio devolve ou conduz um toque. A bola é colocada rasteira para o meio da linha da pequena área. Um jogador aparece entre os defesas e finaliza de primeira.',
      variantes: 'Finalização ao primeiro poste; finalização ao segundo poste; bloqueio antes do aparecimento; canto curto com cruzamento aéreo.',
      fases: [
        'Organização inicial',
        'Passe curto',
        'Bola colocada na pequena área',
        'Aparecimento do finalizador',
        'Remate e reação à segunda bola'
      ],
      narracao: 'Canto curto. O apoio aproxima. A bola entra rasteira no meio da pequena área. O finalizador aparece entre os defesas e ataca a bola de primeira.'
    }
  }
  if (lower.includes('voleibol')) {
    return {
      nome: 'Receção, distribuição e ataque',
      modalidade: 'Voleibol',
      objetivo: 'Organizar a primeira receção, estabilizar a distribuição e atacar pelas zonas 2 ou 4.',
      organizacao: 'Campo de voleibol 6x6. Uma equipa serve, a outra organiza receção com três jogadores.',
      execucao: 'Serviço controlado. Receção para zona de distribuição. Distribuidor escolhe zona 2 ou 4. Ataque com cobertura.',
      variantes: 'Ataque pelo centro; serviço mais agressivo; bloqueio ativo.',
      fases: ['Serviço', 'Receção', 'Distribuição', 'Ataque', 'Cobertura'],
      narracao: 'Receção orientada. Distribuição simples. Ataque pelas zonas exteriores com cobertura ofensiva.'
    }
  }
  if (lower.includes('futsal') || lower.includes('3-1')) {
    return {
      nome: 'Futsal 3-1 — Saída de pressão',
      modalidade: 'Futsal',
      objetivo: 'Criar linha de passe no apoio frontal e sair da pressão com segurança.',
      organizacao: '5x5 em meio campo. Pivot como referência, alas abertos e fixo com bola.',
      execucao: 'Fixo atrai pressão. Ala baixa para receber. Pivot fixa defensor. Passe exterior e ataque ao espaço.',
      variantes: 'Saída pelo lado contrário; pivot móvel; terceiro homem.',
      fases: ['Organização', 'Apoio frontal', 'Passe exterior', 'Rotação', 'Finalização'],
      narracao: 'O fixo atrai. O ala cria linha. O pivot fixa. A equipa sai da pressão pelo corredor.'
    }
  }
  return {
    nome: 'Exercício Cavadas Tactical',
    modalidade: 'Futebol',
    objetivo: 'Criar um exercício ajustado ao pedido do treinador.',
    organizacao: 'Definir espaço, número de jogadores, objetivos e constrangimentos.',
    execucao: 'Executar por fases, com pausas para correção e feedback.',
    variantes: 'Aumentar oposição, reduzir espaço ou limitar toques.',
    fases: ['Organização', 'Execução', 'Correção', 'Progressão', 'Finalização'],
    narracao: 'Exercício criado pela IA Cavadas para apoiar o planeamento do treinador.'
  }
}
