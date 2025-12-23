"use client";

import CreditCard from "@/components/utils/Cards";
import { useUserId } from "@/context/UserContext";
import { CreditCardProp, Transaction } from "@/lib/types"; // if you have transaction type
import { useState, useEffect } from "react";
import { TransactionsTable } from "@/components/transactions/TransactionsTable";
import { createClient } from "@/utils/supabase/client";
import { ColumnDef } from "@tanstack/react-table";

export default function FinancialDashboard() {
  // Example placeholder for transactions
  const id = useUserId();

  const [data, setData] = useState<Transaction[]>([]);
  const [card, setCard] = useState<CreditCardProp[]>([]);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (data.length <= 0) {
      if (id) fetchData(id);
    } else {
      return;
    }
  }, [id]);

  useEffect(() => {
    if (card.length <= 0) {
      if (id) fetchCards(id);
    } else {
      return;
    }
  }, [id]);

  useEffect(() => {
    if (!data) return;
  }, [data]);

  async function fetchData(id: string) {
    console.log(id);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", id);

    if (data) setData(data as Transaction[]);
    if (error) console.error(error.message);
  }

  async function fetchCards(id: string): Promise<CreditCardProp[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("cards")
      .select("*")
      .eq("user_id", id);
    if (data) setCard(data as CreditCardProp[]);
    if (error) console.error(error.message);

    const cards: CreditCardProp[] = data || [];
    return cards;
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
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    },
  ];

  //useEffect(() => {}, [id]);
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Financial Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Overview of your accounts and recent activity
        </p>
      </header>

      {/* Credit Cards Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Cards</h2>
        <div className="flex flex-wrap gap-6">
          {card.length > 0 &&
            card.map((item) => (
              <CreditCard
                key={item.id}
                cardNumber={String(item.main_cd)}
                cardHolder={item.user || ""}
                expiry={String(item.exp_date)}
                cvv={String(item.cvv)}
                cardType="visa"
                retro
              />
            ))}
        </div>
      </section>

      {/* Transactions Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Recent Transactions
        </h2>
        <div>
          <TransactionsTable
            data={data}
            columns={columns}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            isClickable={false}
          />
        </div>
      </section>
    </div>
  );
}
