
export function analisarEsquemaAssistido({ modalidade='futebol', descricao='', detecoes={} }) {
  const t = descricao.toLowerCase()
  const nJogadores = Number(detecoes.jogadores || 8)
  const nDefesas = Number(detecoes.defesas || 5)
  const nSetas = Number(detecoes.setas || 4)
  const nPasses = Number(detecoes.passes || 2)

  if (t.includes('canto') || t.includes('bola parada')) {
    return {
      tipo: 'Canto / Bola Parada',
      modalidade: 'futebol',
      resumo: `A IA Vision assistida interpretou ${nJogadores} atacantes, ${nDefesas} defensores, ${nSetas} movimentos e ${nPasses} passes.`,
      nome: 'Canto ofensivo — bola curta e finalização',
      objetivo: 'Transformar o esquema manuscrito num canto ofensivo animado com passe curto, bola na pequena área e finalização.',
      fases: [
        {
          nome: 'Organização inicial',
          narracao: 'Organização inicial do canto ofensivo. Jogadores posicionados para atrair marcações e criar espaço na pequena área.',
          movimentos: []
        },
        {
          nome: 'Passe curto',
          narracao: 'O executante joga curto para o apoio próximo, atraindo pressão no corredor lateral.',
          movimentos: [
            { type:'pass', from:{x:6,y:92}, to:{x:18,y:82} },
            { type:'move', from:{x:18,y:82}, to:{x:26,y:76} }
          ]
        },
        {
          nome: 'Bola na pequena área',
          narracao: 'A bola é colocada rasteira para o meio da linha da pequena área.',
          movimentos: [
            { type:'pass', from:{x:26,y:76}, to:{x:54,y:38} },
            { type:'move', from:{x:46,y:58}, to:{x:54,y:40} }
          ]
        },
        {
          nome: 'Aparecimento',
          narracao: 'O finalizador aparece entre os defesas no momento certo para atacar a bola.',
          movimentos: [
            { type:'move', from:{x:66,y:68}, to:{x:57,y:41} },
            { type:'move', from:{x:40,y:50}, to:{x:47,y:45} }
          ]
        },
        {
          nome: 'Finalização',
          narracao: 'Finalização de primeira para a baliza. Os restantes jogadores atacam a segunda bola.',
          movimentos: [
            { type:'pass', from:{x:54,y:38}, to:{x:50,y:10} },
            { type:'move', from:{x:72,y:55}, to:{x:65,y:42} }
          ]
        }
      ],
      players: [
        { id:'A1', n:7, team:'blue', x:6, y:92, nome:'Executante' },
        { id:'A2', n:10, team:'blue', x:18, y:82, nome:'Apoio curto' },
        { id:'A3', n:4, team:'blue', x:40, y:50, nome:'Bloqueio' },
        { id:'A4', n:9, team:'blue', x:46, y:58, nome:'Ataque 1.º poste' },
        { id:'A5', n:11, team:'blue', x:66, y:68, nome:'Finalizador' },
        { id:'A6', n:8, team:'blue', x:72, y:55, nome:'Segunda bola' },
        { id:'D1', n:'X', team:'red', x:46, y:43, nome:'Defesa' },
        { id:'D2', n:'X', team:'red', x:57, y:46, nome:'Defesa' },
        { id:'D3', n:'X', team:'red', x:66, y:50, nome:'Defesa' },
        { id:'GR', n:'GR', team:'yellow', x:50, y:8, nome:'Guarda-redes' }
      ],
      ball: { x:6, y:92 }
    }
  }

  if (t.includes('futsal') || modalidade === 'futsal') {
    return {
      tipo: 'Futsal / Jogada',
      modalidade: 'futsal',
      resumo: `A IA Vision assistida interpretou ${nJogadores} jogadores, ${nSetas} movimentos e ${nPasses} passes.`,
      nome: 'Futsal — rotação e apoio frontal',
      objetivo: 'Converter o esquema manuscrito em movimentação 3-1 com apoio frontal.',
      fases: [
        { nome:'Organização', narracao:'Estrutura inicial 3-1.', movimentos:[] },
        { nome:'Apoio frontal', narracao:'O pivot fixa e dá apoio frontal.', movimentos:[{type:'move',from:{x:68,y:50},to:{x:60,y:50}}] },
        { nome:'Rotação', narracao:'O ala roda por fora para receber.', movimentos:[{type:'move',from:{x:30,y:20},to:{x:45,y:15}},{type:'pass',from:{x:48,y:50},to:{x:45,y:15}}] },
        { nome:'Finalização', narracao:'Passe final para finalização.', movimentos:[{type:'pass',from:{x:45,y:15},to:{x:70,y:50}}] }
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
    tipo: 'Esquema genérico',
    modalidade,
    resumo: `A IA Vision assistida interpretou ${nJogadores} jogadores, ${nSetas} movimentos e ${nPasses} passes.`,
    nome: 'Esquema manuscrito interpretado',
    objetivo: 'Converter desenho em fases e movimentos editáveis.',
    fases: [
      { nome:'Organização', narracao:'Organização inicial.', movimentos:[] },
      { nome:'Movimento principal', narracao:'Primeiro movimento do exercício.', movimentos:[{type:'move',from:{x:35,y:50},to:{x:52,y:42}}] },
      { nome:'Passe', narracao:'Passe para zona de vantagem.', movimentos:[{type:'pass',from:{x:35,y:50},to:{x:60,y:45}}] },
      { nome:'Finalização', narracao:'Ataque ao espaço e finalização.', movimentos:[{type:'move',from:{x:60,y:45},to:{x:75,y:35}}] }
    ],
    players: [
      { id:'A1', n:1, team:'blue', x:20, y:50, nome:'Jogador 1' },
      { id:'A2', n:2, team:'blue', x:35, y:50, nome:'Jogador 2' },
      { id:'A3', n:3, team:'blue', x:60, y:45, nome:'Jogador 3' },
      { id:'D1', n:'X', team:'red', x:72, y:48, nome:'Defesa' }
    ],
    ball: { x:35, y:50 }
  }
}
