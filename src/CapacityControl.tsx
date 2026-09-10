import { Minus, Plus } from 'lucide-react'

type CapacityControlProps = {
  label: string
  value: number
  min: number
  max: number
  onChange: (value: number) => void
}

export function CapacityControl({ label, value, min, max, onChange }: CapacityControlProps) {
  const setValue = (next: number) => onChange(Math.min(max, Math.max(min, next)))

  return <div className="capacity-control">
    <span className="capacity-label">{label}</span>
    <div className="capacity-stepper">
      <button type="button" onClick={() => setValue(value - 1)} disabled={value <= min} aria-label={`Decrease ${label.toLowerCase()}`}><Minus size={17} /></button>
      <output aria-live="polite" aria-label={`${label}: ${value}`}>{value}</output>
      <button type="button" onClick={() => setValue(value + 1)} disabled={value >= max} aria-label={`Increase ${label.toLowerCase()}`}><Plus size={17} /></button>
    </div>
  </div>
}
