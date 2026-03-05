import Sidebar from "./Sidebar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10 bg-[#0E1117]">
        {children}
      </main>
    </div>
  );
}
