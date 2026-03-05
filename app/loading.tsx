export default function Loader() {
  return (
    <div className="flex items-center justify-center py-10 text-white/70">
      <div
        className="h-10 w-10 rounded-full border-4 border-white/20 border-t-[#F59E0B] animate-spin mr-3"
        aria-hidden
      />
      <span>Loading...</span>
    </div>
  );
}
