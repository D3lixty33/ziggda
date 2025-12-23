import CardShow from "@/components/utils/DataCard";

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full flex gap-8">
      <div className="w-42">
        <CardShow
          description="Valore totale delle transazioni nell'ultimo mese"
          title="TOTALE"
          value={1000}
          variant="total"
        ></CardShow>
      </div>
      <div className="w-42">
        <CardShow
          description="Valore netto delle transazioni nell'ultimo mese"
          title="NETTO"
          value={650}
          variant="total"
        ></CardShow>
      </div>
    </div>
  );
}
