import { useState } from "react";
import { MapPin } from "lucide-react";
import { checkDelivery } from "@/lib/commerce";
import { useShop } from "./ShopProvider";
export function DeliveryCheck() {
  const { pincode, setPincode } = useShop();
  const [draft, setDraft] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  return (
    <section className="delivery-check" aria-label="Delivery area check">
      <div>
        <MapPin size={20} aria-hidden="true" />
        <div>
          <h2>Where do you need delivery?</h2>
          <p>Check your pincode before planning an order.</p>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const result = checkDelivery(draft ?? pincode);
          setMessage(result.message);
          if (result.status !== "invalid") setPincode(draft ?? pincode);
        }}
      >
        <label className="sr-only" htmlFor="delivery-pincode">
          Delivery pincode
        </label>
        <input
          id="delivery-pincode"
          inputMode="numeric"
          autoComplete="postal-code"
          placeholder={pincode || "Enter pincode"}
          maxLength={6}
          value={draft ?? pincode}
          onChange={(e) => {
            setDraft(e.target.value.replace(/\D/g, ""));
            setMessage("");
          }}
          required
          pattern="[1-9][0-9]{5}"
        />
        <button type="submit" className="button-outline">
          Check delivery
        </button>
      </form>
      {(message || pincode) && (
        <p className="delivery-result" role="status">
          {message || checkDelivery(pincode).message}
        </p>
      )}
    </section>
  );
}
