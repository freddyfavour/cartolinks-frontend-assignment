export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full h-16 flex items-center justify-between px-8 bg-black text-white z-50">
      <div className="flex items-center">
        <div className="flex items-center">
          <img src="/icons/logo.svg" alt="Krea AI" className="h-7" />
          <span className="text-xl font-medium ml-2">Krea AI</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-base">curated by Mobbin</span>
      </div>
    </footer>
  );
}