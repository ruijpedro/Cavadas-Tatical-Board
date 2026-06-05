
export function interpretarEsquemaManual({ modalidade, descricao }) {
  const texto = (descricao || '').toLowerCase()

  if (texto.includes('canto')) {
    return {
      nome: 'Canto ofensivo interpretado do esquema',
      modalidade: 'futebol',
      objetivo: 'Transformar o esquema desenhado à mão numa jogada de canto organizada por fases.',
      organizacao: 'Jogador no canto, apoio curto, jogadores na zona da pequena área, bloqueios e finalizador a aparecer.',
      fases: [
        {
          nome: 'Organização inicial',
          narracao: 'Equipa posicionada para canto ofensivo. Um jogador aproxima para opção curta.',
          movimentos: []
        },
        {
          nome: 'Passe curto',
          narracao: 'O canto é batido curto para atrair a pressão defensiva.',
          movimentos: [
            { type: 'pass', from: { x: 5, y: 92 }, to: { x: 18, y: 82 } },
            { type: 'move', from: { x: 24, y: 70 }, to: { x: 34, y: 62 } }
          ]
        },
        {
          nome: 'Bola na pequena área',
          narracao: 'A bola é colocada rasteira para a linha da pequena área.',
          movimentos: [
            { type: 'pass', from: { x: 18, y: 82 }, to: { x: 58, y: 43 } },
            { type: 'move', from: { x: 52, y: 62 }, to: { x: 58, y: 43 } }
          ]
        },
        {
          nome: 'Aparecimento e finalização',
          narracao: 'O finalizador aparece entre os defesas e ataca a bola de primeira.',
          movimentos: [
            { type: 'move', from: { x: 64, y: 70 }, to: { x: 62, y: 44 } },
            { type: 'pass', from: { x: 58, y: 43 }, to: { x: 50, y: 12 } }
          ]
        }
      ],
      players: [
        { id:'A1', n:7, team:'blue', x:5, y:92, nome:'Executante' },
        { id:'A2', n:10, team:'blue', x:18, y:82, nome:'Apoio curto' },
        { id:'A3', n:4, team:'blue', x:34, y:62, nome:'Bloqueio' },
        { id:'A4', n:9, team:'blue', x:52, y:62, nome:'Atacante 1.º poste' },
        { id:'A5', n:11, team:'blue', x:64, y:70, nome:'Finalizador' },
        { id:'D1', n:'X', team:'red', x:48, y:50, nome:'Defesa' },
        { id:'D2', n:'X', team:'red', x:60, y:54, nome:'Defesa' },
        { id:'GR', n:'GR', team:'yellow', x:50, y:9, nome:'Guarda-redes' }
      ],
      ball: { x:5, y:92 }
    }
  }

  if (texto.includes('futsal') || texto.includes('3-1') || modalidade === 'futsal') {
    return {
      nome: 'Esquema futsal interpretado',
      modalidade: 'futsal',
      objetivo: 'Converter o desenho em movimentação 3-1 com apoio frontal e rotação.',
      organizacao: 'Fixo, dois alas, pivot e guarda-redes.',
      fases: [
        { nome:'Organização inicial', narracao:'Equipa em estrutura base 3-1.', movimentos:[] },
        { nome:'Apoio frontal', narracao:'O pivot fixa e oferece linha de passe.', movimentos:[{ type:'move', from:{x:68,y:50}, to:{x:60,y:50} }] },
        { nome:'Rotação exterior', narracao:'Ala roda por fora para receber.', movimentos:[{ type:'move', from:{x:30,y:20}, to:{x:45,y:15} }, { type:'pass', from:{x:48,y:50}, to:{x:45,y:15} }] },
        { nome:'Finalização', narracao:'Passe final para o jogador em melhor posição.', movimentos:[{ type:'pass', from:{x:45,y:15}, to:{x:70,y:50} }] }
      ],
      players: [
        { id:'A1', n:1, team:'yellow', x:12, y:50, nome:'GR' },
        { id:'A2', n:2, team:'blue', x:30, y:20, nome:'Ala' },
        { id:'A3', n:3, team:'blue', x:30, y:80, nome:'Ala' },
        { id:'A4', n:4, team:'blue', x:48, y:50, nome:'Fixo' },
        { id:'A5', n:5, team:'blue', x:68, y:50, nome:'Pivot' },
        { id:'D1', n:'X', team:'red', x:75, y:40, nome:'Defesa' },
        { id:'D2', n:'X', team:'red', x:75, y:60, nome:'Defesa' }
      ],
      ball: { x:48, y:50 }
    }
  }

  return {
    nome: 'Esquema interpretado',
    modalidade: modalidade || 'futebol',
    objetivo: 'Converter o esquema desenhado numa sequência organizada por fases.',
    organizacao: 'Jogadores posicionados conforme o desenho original.',
    fases: [
      { nome:'Organização inicial', narracao:'Organização inicial do esquema.', movimentos:[] },
      { nome:'Movimento principal', narracao:'Primeiro movimento de criação de espaço.', movimentos:[{ type:'move', from:{x:35,y:50}, to:{x:50,y:40} }] },
      { nome:'Passe', narracao:'Passe para o jogador em melhor posição.', movimentos:[{ type:'pass', from:{x:35,y:50}, to:{x:60,y:45} }] },
      { nome:'Finalização', narracao:'Ataque ao espaço e finalização.', movimentos:[{ type:'move', from:{x:60,y:45}, to:{x:75,y:35} }] }
    ],
    players: [
      { id:'A1', n:1, team:'blue', x:18, y:50, nome:'Jogador 1' },
      { id:'A2', n:2, team:'blue', x:35, y:50, nome:'Jogador 2' },
      { id:'A3', n:3, team:'blue', x:60, y:45, nome:'Jogador 3' },
      { id:'D1', n:'X', team:'red', x:72, y:48, nome:'Defesa' }
    ],
    ball: { x:35, y:50 }
  }
}
