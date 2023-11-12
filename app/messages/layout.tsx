export default function Layout({ children, individual }: { children: React.ReactNode; individual: React.ReactNode }) {
  return (
    <div className="grid grid-cols-10 gap-4">
      <div className="col-span-3 p-6">{children}</div>
      <div className="col-span-7 h-screen p-6">{individual}</div>
    </div>
  );
}
