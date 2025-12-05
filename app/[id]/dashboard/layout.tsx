import { FinancialSidebar } from "@/components/financial-sidebar" 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="w-full h-full flex">
        <FinancialSidebar />
        {children}
    </div>    
  )
}