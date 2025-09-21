import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-3xl text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-8">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Bienvenido al gestor de autores</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/authors"
            className="block rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-zinc-900 px-6 py-8 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition transform text-center"
          >
            <span className="text-lg font-medium">Ver autores</span>
          </Link>
          <Link
            href="/crear"
            className="block rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-zinc-900 px-6 py-8 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition transform text-center"
          >
            <span className="text-lg font-medium">Crear autor</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
