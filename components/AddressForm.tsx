import { useState } from "react";
import { isAddress } from "@/lib/commerce";
import type { Address } from "@/lib/types";
export const blankAddress: Address = {
  id: "",
  name: "",
  phone: "",
  address: "",
  pincode: "",
  gstin: "",
};
export function AddressForm({
  initial = blankAddress,
  onSave,
  onCancel,
  submitLabel = "Save address",
  children,
}: {
  initial?: Address;
  onSave: (address: Address) => void;
  onCancel?: () => void;
  submitLabel?: string;
  children?: React.ReactNode;
}) {
  const [draft, setDraft] = useState(initial);
  const [error, setError] = useState("");
  const field = (key: keyof Address, value: string) => {
    setDraft({ ...draft, [key]: value });
    setError("");
  };
  return (
    <form
      className="address-form"
      onSubmit={(e) => {
        e.preventDefault();
        const address = {
          ...draft,
          id: draft.id || crypto.randomUUID(),
          name: draft.name.trim(),
          address: draft.address.trim(),
          gstin: draft.gstin.trim().toUpperCase(),
        };
        if (!isAddress(address)) {
          setError(
            "Enter your name, ten-digit phone number, full address and six-digit pincode.",
          );
          return;
        }
        if (
          address.gstin &&
          !/^\d{2}[A-Z]{5}\d{4}[A-Z][A-Z0-9]Z[A-Z0-9]$/.test(address.gstin)
        ) {
          setError("Check your 15-character GSTIN, or leave it empty.");
          return;
        }
        onSave(address);
      }}
    >
      <div className="form-grid">
        <label>
          Contact name
          <input
            aria-label="Contact name"
            required
            autoComplete="name"
            minLength={2}
            value={draft.name}
            onChange={(e) => field("name", e.target.value)}
          />
        </label>
        <label>
          Phone number
          <input
            aria-label="Phone number"
            required
            type="tel"
            autoComplete="tel-national"
            inputMode="numeric"
            pattern="[0-9]{10}"
            maxLength={10}
            value={draft.phone}
            onChange={(e) => field("phone", e.target.value.replace(/\D/g, ""))}
          />
        </label>
        <label className="form-wide">
          Delivery address
          <textarea
            aria-label="Delivery address"
            required
            autoComplete="street-address"
            minLength={5}
            rows={3}
            value={draft.address}
            onChange={(e) => field("address", e.target.value)}
          />
        </label>
        <label>
          Pincode
          <input
            aria-label="Pincode"
            required
            autoComplete="postal-code"
            inputMode="numeric"
            pattern="[1-9][0-9]{5}"
            maxLength={6}
            value={draft.pincode}
            onChange={(e) =>
              field("pincode", e.target.value.replace(/\D/g, ""))
            }
          />
        </label>
        <label>
          GSTIN <span>(optional)</span>
          <input
            aria-label="GSTIN (optional)"
            autoCapitalize="characters"
            maxLength={15}
            value={draft.gstin}
            onChange={(e) => field("gstin", e.target.value)}
          />
        </label>
      </div>
      {children}
      {error && (
        <p className="notice" role="alert">
          {error}
        </p>
      )}
      <div className="action-row">
        <button className="button" type="submit">
          {submitLabel}
        </button>
        {onCancel && (
          <button className="button-outline" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
