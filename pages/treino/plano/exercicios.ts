export type GrupoExercicio = {
  grupo: string
  itens: string[]
}

export const EXERCICIOS: GrupoExercicio[] = [
  {
    grupo: 'Peito',
    itens: ['Supino reto', 'Supino inclinado', 'Supino declinado', 'Crucifixo', 'Crossover', 'Peck deck', 'Flexão de braço'],
  },
  {
    grupo: 'Costas',
    itens: ['Puxada frontal', 'Puxada fechada', 'Barra fixa', 'Remada curvada', 'Remada unilateral', 'Remada cavalinho', 'Remada baixa', 'Pulldown'],
  },
  {
    grupo: 'Ombros',
    itens: ['Desenvolvimento', 'Elevação lateral', 'Elevação frontal', 'Crucifixo inverso', 'Arnold press', 'Face pull'],
  },
  {
    grupo: 'Bíceps',
    itens: ['Rosca direta', 'Rosca alternada', 'Rosca martelo', 'Rosca concentrada', 'Rosca scott', 'Rosca 21'],
  },
  {
    grupo: 'Tríceps',
    itens: ['Tríceps pulley', 'Tríceps testa', 'Tríceps francês', 'Tríceps coice', 'Tríceps corda', 'Mergulho'],
  },
  {
    grupo: 'Quadríceps',
    itens: ['Agachamento', 'Leg press', 'Cadeira extensora', 'Agachamento búlgaro', 'Hack squat', 'Afundo'],
  },
  {
    grupo: 'Posterior',
    itens: ['Stiff', 'Mesa flexora', 'Cadeira flexora', 'Levantamento terra romeno', 'Good morning'],
  },
  {
    grupo: 'Glúteo',
    itens: ['Hip thrust', 'Elevação pélvica', 'Abdução', 'Agachamento sumô', 'Glúteo na polia'],
  },
  {
    grupo: 'Panturrilha',
    itens: ['Panturrilha em pé', 'Panturrilha sentado', 'Panturrilha no leg press'],
  },
  {
    grupo: 'Abdômen',
    itens: ['Crunch', 'Prancha', 'Elevação de pernas', 'Abdominal infra', 'Russian twist', 'Pallof press'],
  },
]
