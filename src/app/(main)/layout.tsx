import Header from '@/components/Header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto p-4 w-full">{children}</div>
    </>
  );
}
