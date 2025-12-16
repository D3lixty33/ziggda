import { FinancialSidebar } from "@/components/financial-sidebar";
import { UserWrapper } from "@/components/utils/UserWrapper";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>; // Important: params may be a Promise
}) {
  const { id } = await params; // Await the whole params object
  //console.log("User ID:", id);

  return (
      <div className="w-full h-full flex">
        <div className="flex w-auto h-auto">
          <FinancialSidebar id={id} />
        </div>
        <div className="flex w-full h-full ml-72">
          <UserWrapper id={id}>
            {children}
          </UserWrapper>
        </div>
      </div>
  );
}
