
export const demoLinhaPasseFutsal = {
  id: 'cavadas-linhas-passe-01',
  modalidade: 'futsal',
  nome: 'Movimentação para criação de linhas de passe',
  objetivo: 'Criar linhas de passe, dar apoio frontal e finalizar com superioridade.',
  descricao: 'Exercício baseado no esquema enviado: circulação, apoio frontal, rotação lateral e ataque à zona de finalização.',
  duracao: '10 minutos',
  jogadores: '5 azuis x 2 vermelhos + GR',
  equipamento: 'Bolas, coletes, cones e balizas',
  textoApresentacao: [
    'Organização inicial da equipa no meio campo ofensivo.',
    'Passe e movimentação para criar uma nova linha de passe.',
    'Apoio frontal para fixar o defensor e atrair pressão.',
    'Passe para a zona de fixação e ataque ao espaço.',
    'Rotação final e finalização.'
  ],
  players: [
    { id: 'A1', n: 1, team: 'teamA', x: 145, y: 95, label: 'Ala esquerdo' },
    { id: 'A2', n: 2, team: 'teamA', x: 265, y: 170, label: 'Apoio frontal' },
    { id: 'A3', n: 3, team: 'teamA', x: 155, y: 330, label: 'Ala baixo' },
    { id: 'A4', n: 4, team: 'teamA', x: 520, y: 300, label: 'Ala direito' },
    { id: 'A5', n: 5, team: 'teamA', x: 420, y: 265, label: 'Pivot' },
    { id: 'A6', n: 6, team: 'teamA', x: 455, y: 345, label: 'Finalizador' },
    { id: 'A7', n: 7, team: 'teamA', x: 610, y: 135, label: 'Apoio lado contrário' },
    { id: 'B1', n: 1, team: 'teamB', x: 190, y: 85, label: 'Defensor' },
    { id: 'B2', n: 2, team: 'teamB', x: 495, y: 70, label: 'Defensor' },
    { id: 'GR', n: 'GR', team: 'gk', x: 430, y: 95, label: 'Guarda-redes' }
  ],
  ball: { x: 360, y: 250 },
  phases: [
    {
      name: 'Início',
      pause: 1,
      voice: 'Fase um. Organização inicial. A equipa posiciona-se para criar várias linhas de passe.',
      movements: []
    },
    {
      name: 'Passe e movimentação',
      pause: 2,
      voice: 'Fase dois. O jogador com bola procura o apoio frontal e movimenta-se para voltar a receber.',
      movements: [
        { type: 'pass', from: { x: 360, y: 250 }, to: { x: 265, y: 170 } },
        { type: 'move', from: { x: 265, y: 170 }, to: { x: 335, y: 220 } },
        { type: 'move', from: { x: 145, y: 95 }, to: { x: 145, y: 150 } }
      ]
    },
    {
      name: 'Apoio frontal',
      pause: 2,
      voice: 'Fase três. O apoio frontal fixa o adversário e abre espaço para a rotação exterior.',
      movements: [
        { type: 'move', from: { x: 335, y: 220 }, to: { x: 420, y: 265 } },
        { type: 'move', from: { x: 155, y: 330 }, to: { x: 240, y: 390 } }
      ]
    },
    {
      name: 'Passe para fixação',
      pause: 2,
      voice: 'Fase quatro. A bola entra no jogador de fixação e a equipa prepara a entrada na zona de finalização.',
      movements: [
        { type: 'pass', from: { x: 265, y: 170 }, to: { x: 420, y: 265 } },
        { type: 'move', from: { x: 520, y: 300 }, to: { x: 610, y: 210 } },
        { type: 'move', from: { x: 455, y: 345 }, to: { x: 555, y: 345 } }
      ]
    },
    {
      name: 'Rotação e finalização',
      pause: 2,
      voice: 'Fase cinco. Rotação final. O jogador ataca o espaço e a jogada termina com finalização.',
      movements: [
        { type: 'move', from: { x: 610, y: 210 }, to: { x: 675, y: 150 } },
        { type: 'pass', from: { x: 420, y: 265 }, to: { x: 555, y: 345 } },
        { type: 'move', from: { x: 555, y: 345 }, to: { x: 650, y: 285 } }
      ]
    }
  ]
}
