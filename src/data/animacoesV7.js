
export const animacoesDemoV7 = {
  cantoCurto: {
    id: 'canto-curto-finalizacao',
    nome: 'Canto curto — bola na pequena área',
    modalidade: 'futebol',
    descricao: 'Passe curto, bola rasteira para a linha da pequena área e aparecimento para finalização.',
    players: [
      { id:'A1', n:7, team:'blue', x:8, y:92, nome:'Executante' },
      { id:'A2', n:10, team:'blue', x:20, y:82, nome:'Apoio curto' },
      { id:'A3', n:4, team:'blue', x:40, y:50, nome:'Bloqueio' },
      { id:'A4', n:9, team:'blue', x:46, y:58, nome:'Ataque 1.º poste' },
      { id:'A5', n:11, team:'blue', x:66, y:68, nome:'Finalizador' },
      { id:'D1', n:'X', team:'red', x:46, y:43, nome:'Defesa' },
      { id:'D2', n:'X', team:'red', x:57, y:46, nome:'Defesa' },
      { id:'GR', n:'GR', team:'yellow', x:50, y:8, nome:'Guarda-redes' }
    ],
    ball: { x:8, y:92 },
    phases: [
      {
        nome: 'Organização inicial',
        duracao: 1.6,
        narracao: 'Organização inicial para canto curto. O apoio aproxima-se para receber.',
        movimentos: []
      },
      {
        nome: 'Passe curto',
        duracao: 2.2,
        narracao: 'O canto é batido curto para atrair a pressão defensiva.',
        movimentos: [
          { obj:'ball', type:'pass', from:{x:8,y:92}, to:{x:20,y:82} },
          { obj:'A2', type:'move', from:{x:20,y:82}, to:{x:26,y:76} },
          { obj:'A3', type:'move', from:{x:40,y:50}, to:{x:47,y:45} }
        ]
      },
      {
        nome: 'Bola na pequena área',
        duracao: 2.2,
        narracao: 'O apoio coloca a bola rasteira para a linha da pequena área.',
        movimentos: [
          { obj:'ball', type:'pass', from:{x:20,y:82}, to:{x:55,y:42} },
          { obj:'A4', type:'move', from:{x:46,y:58}, to:{x:54,y:42} }
        ]
      },
      {
        nome: 'Aparecimento',
        duracao: 2.2,
        narracao: 'O finalizador aparece entre os defesas no momento certo.',
        movimentos: [
          { obj:'A5', type:'move', from:{x:66,y:68}, to:{x:57,y:42} },
          { obj:'D2', type:'move', from:{x:57,y:46}, to:{x:60,y:44} }
        ]
      },
      {
        nome: 'Finalização',
        duracao: 1.8,
        narracao: 'Finalização de primeira para a baliza.',
        movimentos: [
          { obj:'ball', type:'shot', from:{x:55,y:42}, to:{x:50,y:10} }
        ]
      }
    ]
  },
  futsal31: {
    id: 'futsal-31-saida',
    nome: 'Futsal 3-1 — saída de pressão',
    modalidade: 'futsal',
    descricao: 'Apoio frontal, rotação exterior e passe para o corredor livre.',
    players: [
      { id:'A1', n:1, team:'yellow', x:12, y:50, nome:'GR' },
      { id:'A2', n:2, team:'blue', x:30, y:20, nome:'Ala' },
      { id:'A3', n:3, team:'blue', x:30, y:80, nome:'Ala' },
      { id:'A4', n:4, team:'blue', x:48, y:50, nome:'Fixo' },
      { id:'A5', n:5, team:'blue', x:68, y:50, nome:'Pivot' },
      { id:'D1', n:'X', team:'red', x:75, y:40, nome:'Defesa' },
      { id:'D2', n:'X', team:'red', x:75, y:60, nome:'Defesa' }
    ],
    ball: { x:48, y:50 },
    phases: [
      { nome:'Organização', duracao:1.4, narracao:'Organização inicial em três um.', movimentos:[] },
      { nome:'Apoio frontal', duracao:2.0, narracao:'O pivot fixa e oferece apoio frontal.', movimentos:[
        { obj:'A5', type:'move', from:{x:68,y:50}, to:{x:60,y:50} }
      ]},
      { nome:'Rotação exterior', duracao:2.0, narracao:'O ala roda por fora para receber.', movimentos:[
        { obj:'A2', type:'move', from:{x:30,y:20}, to:{x:44,y:16} },
        { obj:'ball', type:'pass', from:{x:48,y:50}, to:{x:44,y:16} }
      ]},
      { nome:'Passe final', duracao:2.0, narracao:'Passe para o pivot e ataque ao espaço.', movimentos:[
        { obj:'ball', type:'pass', from:{x:44,y:16}, to:{x:60,y:50} },
        { obj:'A3', type:'move', from:{x:30,y:80}, to:{x:56,y:74} }
      ]},
      { nome:'Finalização', duracao:1.8, narracao:'Finalização após apoio frontal.', movimentos:[
        { obj:'ball', type:'shot', from:{x:60,y:50}, to:{x:88,y:50} }
      ]}
    ]
  }
}
