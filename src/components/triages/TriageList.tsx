import { TriageCard } from './TriageCard'
import type { Triage } from '@/api/triages.types'

interface TriageListProps {
  triages: Triage[]
  onEdit: (triage: Triage) => void
  onDelete: (triage: Triage) => void
}

export const TriageList: React.FC<TriageListProps> = ({
  triages,
  onEdit,
  onDelete
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {triages.map((triage) => (
        <TriageCard
          key={triage.id}
          triage={triage}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}