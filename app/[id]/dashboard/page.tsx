"use client";

import CardShow from "@/components/utils/DataCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full p-4 md:p-8 space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Panoramica delle transazioni recenti
          </p>
        </div>
        <Button className="w-full sm:w-auto">Nuova transazione</Button>
      </header>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-4">
            <div className="space-y-2">
              <h3 className="text-sm text-muted-foreground">TOTALE</h3>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-semibold">€4.200</span>
                <ArrowUpRight className="text-green-500" />
              </div>
              <p className="text-xs text-muted-foreground">
                +12% rispetto al mese scorso
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-4">
            <div className="space-y-2">
              <h3 className="text-sm text-muted-foreground">NETTO</h3>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-semibold">€2.200</span>
                <ArrowUpRight className="text-green-500" />
              </div>
              <p className="text-xs text-muted-foreground">
                +12% rispetto al mese scorso
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-4">
            <div className="space-y-2">
              <h3 className="text-sm text-muted-foreground">ENTRATE</h3>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-semibold">€1.200</span>
                <ArrowUpRight className="text-green-500" />
              </div>
              <p className="text-xs text-muted-foreground">
                +12% rispetto al mese scorso
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-4">
            <div className="space-y-2">
              <h3 className="text-sm text-muted-foreground">USCITE</h3>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-semibold">€550</span>
                <ArrowDownRight className="text-red-500" />
              </div>
              <p className="text-xs text-muted-foreground">
                -5% rispetto al mese scorso
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Content grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transactions */}
        <Card className="lg:col-span-2 rounded-2xl shadow-sm">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Ultime transazioni</h2>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((t) => (
                <div
                  key={t}
                  className="flex items-center justify-between rounded-xl border p-3"
                >
                  <div>
                    <p className="font-medium">Pagamento #{t}</p>
                    <p className="text-xs text-muted-foreground">24/12/2025</p>
                  </div>
                  <span className="font-semibold">€{t * 120}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Riepilogo</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Entrate</span>
                <span>€1.200</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Uscite</span>
                <span>€550</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Saldo</span>
                <span>€650</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
