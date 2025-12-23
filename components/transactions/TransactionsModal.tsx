"use client";

import { FormEvent } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setInvoice: (value: string) => void;
  setAmount: (value: number) => void;
};

export function TransactionModal({
  isOpen,
  onClose,
  onSubmit,
  setInvoice,
  setAmount,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-background rounded-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Add Transaction</h3>

        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <label className="flex flex-col text-sm">
            Invoice Recipient
            <input
              type="text"
              className="mt-1 px-3 py-2 border rounded bg-background text-sm"
              onChange={(e) => setInvoice(e.target.value)}
            />
          </label>

          <label className="flex flex-col text-sm">
            Amount
            <input
              type="number"
              step="0.01"
              className="mt-1 px-3 py-2 border rounded bg-background text-sm"
              onChange={(e) => setAmount(e.target.valueAsNumber)}
            />
          </label>

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
