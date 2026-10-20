import { Minus, Plus } from "lucide-react";
import { normalizeQuantity } from "@/lib/calculations";
export function QuantityStepper({
  value,
  onChange,
  label = "Quantity",
  className = "",
}: {
  value: number;
  onChange: (n: number) => void;
  label?: string;
  className?: string;
}) {
  return (
    <div className={`quantity-stepper ${className}`}>
      <button
        type="button"
        onClick={() => onChange(normalizeQuantity(value - 1))}
        disabled={value <= 1}
        aria-label={`Decrease ${label}`}
      >
        <Minus size={14} />
      </button>
      <input
        aria-label={label}
        type="number"
        min={1}
        max={9999}
        value={value}
        onChange={(e) => onChange(normalizeQuantity(Number(e.target.value)))}
      />
      <button
        type="button"
        onClick={() => onChange(normalizeQuantity(value + 1))}
        disabled={value >= 9999}
        aria-label={`Increase ${label}`}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
