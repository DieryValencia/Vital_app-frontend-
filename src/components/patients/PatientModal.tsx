import { X } from 'lucide-react'
import { Card } from '@/components/ui/Card'

interface PatientModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export const PatientModal: React.FC<PatientModalProps> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto mx-4">
        <Card className="relative">
          <div className="flex items-center justify-between mb-6 sticky top-0 bg-white pb-4 border-b">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="pb-2">
            {children}
          </div>
        </Card>
      </div>
    </div>
  )
}