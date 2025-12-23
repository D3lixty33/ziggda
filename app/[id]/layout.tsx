import { FinancialSidebar } from "@/components/utils/Financial-sidebar";
import { UserWrapper } from "@/components/utils/UserWrapper";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[280px_1fr]">
      
      {/* Sidebar */}
      <div className="border-b md:border-b-0 md:border-r">
        <FinancialSidebar id={id} />
      </div>

      {/* Main Content */}
      <div className="overflow-y-auto">
        <UserWrapper id={id}>
          <div className="p-4 md:p-6">
            {children}
          </div>
        </UserWrapper>
      </div>

    </div>
  );
}
