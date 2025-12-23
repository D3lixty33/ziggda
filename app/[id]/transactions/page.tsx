"use client";

import { Transaction } from "@/lib/types";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ColumnDef } from "@tanstack/react-table";
import { useUserId } from "@/context/UserContext";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/compat/router";

import { TransactionsTable } from "@/components/transactions/TransactionsTable";
import { TransactionModal } from "@/components/transactions/TransactionsModal";

export default function Transactions() {
  const id = useUserId();
  const router = useRouter();

  const [data, setData] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoice, setInvoice] = useState("");
  const [amount, setAmount] = useState(0);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [clickable, setClickable] = useState(true);

  useEffect(() => {
    if (data.length <= 0) {
      if (id) fetchData(id);
    } else {
      return;
    }
    
  }, [id]);

  async function fetchData(id: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", id);

    if (data) setData(data as Transaction[]);
    if (error) console.error(error.message);
  }

  async function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!id) return;

    const supabase = createClient();
    const { error } = await supabase.from("transactions").insert([
      {
        id: uuidv4(),
        user_id: id,
        invoice_recipient: invoice,
        amount,
      },
    ]);

    if (error) console.error(error.message);

    setIsModalOpen(false);
    fetchData(id);
  }

  async function handleDelete() {
    if (!id) return;

    // Get selected row IDs from rowSelection
    const selectedIds = Object.keys(rowSelection)
      .map((index) => data[Number(index)]?.id)
      .filter(Boolean);

    if (selectedIds.length === 0) return;

    const supabase = createClient();
    const { error } = await supabase
      .from("transactions")
      .delete()
      .eq("user_id", id)
      .in("id", selectedIds);

    if (error) console.error(error.message);

    setRowSelection({});
    fetchData(id);
  }

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "invoice_recipient",
      header: "Invoice Recipient",
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: (info) => (
        <span className="text-muted-foreground">{String(info.getValue())}</span>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: (info) => (
        <span className="font-medium">
          €{Number(info.getValue()).toFixed(2)}
        </span>
      ),
    },
    {
      id: "select",
      header: "Check",
      cell: ({ row }) =>
        clickable ? (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ) : null,
    },
  ];

  return (
    <div className="w-full h-full p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold">Transactions</h2>
          <p className="text-sm text-muted-foreground">
            Recent account activity
          </p>
        </div>

        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
            onClick={() => setIsModalOpen(true)}
          >
            Add +
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
            onClick={handleDelete}
          >
            Delete -
          </button>
        </div>
      </div>

      {/* Reusable Table */}
      <TransactionsTable
        data={data}
        columns={columns}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        isClickable={true}
      />

      {/* Reusable Modal */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={HandleSubmit}
        setInvoice={setInvoice}
        setAmount={setAmount}
      />
    </div>
  );
}
