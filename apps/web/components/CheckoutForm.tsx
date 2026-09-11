'use client';
import { useState } from 'react';
import { Button } from '@indimba/ui/Button';
import { CheckCircle2 } from 'lucide-react';

export function CheckoutForm({
  eventTitle,
  tierName,
  priceZmwCents,
}: {
  eventTitle: string;
  tierName: string;
  priceZmwCents: number;
}) {
  const [quantity, setQuantity] = useState(1);
  const [step, setStep] = useState<'details' | 'confirmed'>('details');
  const [method, setMethod] = useState<'mtn' | 'airtel' | 'card'>('mtn');

  const total = priceZmwCents * quantity;

  if (step === 'confirmed') {
    return (
      <div className="text-center py-8">
        <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
        <h1 className="font-display text-3xl tracking-wide text-white mb-2">BOOKING CONFIRMED</h1>
        <p className="text-surface-300 text-sm">
          {quantity} × {tierName} for {eventTitle}. A confirmation has been sent to your email.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-surface-800 rounded-xl border border-white/5 p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white font-semibold text-sm">{tierName}</span>
          <span className="text-white font-bold text-sm">K{(priceZmwCents / 100).toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-surface-400 text-sm">Quantity</span>
          <div className="flex items-center gap-3">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-7 h-7 rounded-md bg-white/5 text-white hover:bg-white/10">
              −
            </button>
            <span className="text-white font-semibold w-4 text-center">{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)} className="w-7 h-7 rounded-md bg-white/5 text-white hover:bg-white/10">
              +
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-white font-semibold text-sm mb-3">Payment method</p>
        <div className="grid grid-cols-3 gap-2">
          {(['mtn', 'airtel', 'card'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`py-2.5 rounded-lg text-xs font-bold border transition-colors ${
                method === m ? 'border-teal-400 text-teal-300 bg-teal-500/10' : 'border-white/10 text-surface-300'
              }`}
            >
              {m === 'mtn' ? 'MTN MoMo' : m === 'airtel' ? 'Airtel Money' : 'Card'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mb-6 pt-4 border-t border-white/5">
        <span className="text-surface-300 text-sm">Total</span>
        <span className="text-2xl font-black text-white">K{(total / 100).toLocaleString()}</span>
      </div>

      <Button variant="events" className="w-full" onClick={() => setStep('confirmed')}>
        Confirm & Pay
      </Button>
    </>
  );
}
