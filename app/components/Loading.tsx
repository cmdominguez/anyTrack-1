export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[60vh] flex-col gap-4">
      <div className="animate-spin h-20 w-20 rounded-full border-t-2 border-b-2 border-blue-500" />
      <p className="text-slate-800 font-bold">Cargando ...</p>
    </div>
  );
}
