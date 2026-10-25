import type { QuoteSummary } from "@/lib/types";
import { money } from "@/lib/calculations";
export function PricingSummary({ quote }: { quote: QuoteSummary }) {
  const charge = (n: number | null) =>
    n === null ? "Not confirmed" : money(n / 100);
  return (
    <div className="price-summary">
      <dl>
        <div>
          <dt>
            Materials subtotal <span>(sample)</span>
          </dt>
          <dd>{money(quote.materialsPaise / 100)}</dd>
        </div>
        <div>
          <dt>Tax</dt>
          <dd>{charge(quote.taxPaise)}</dd>
        </div>
        <div>
          <dt>Delivery</dt>
          <dd>{charge(quote.deliveryPaise)}</dd>
        </div>
        <div>
          <dt>Unloading</dt>
          <dd>{charge(quote.unloadingPaise)}</dd>
        </div>
        <div className="price-summary-total">
          <dt>Final payable amount</dt>
          <dd>
            {quote.payablePaise === null
              ? "Awaiting confirmation"
              : money(quote.payablePaise / 100)}
          </dd>
        </div>
      </dl>
      <p className="muted-copy">
        The materials subtotal is not the final bill. All charges and
        availability must be confirmed before payment. No payment is available
        in this preview.
      </p>
    </div>
  );
}
