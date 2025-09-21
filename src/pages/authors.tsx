import Link from "next/link";
import { useAuthors } from "../hooks/useAuthors";
import AuthorCard from "../components/AuthorCard";

export default function AuthorsPage() {
  const { authors, loading, error, deleteAuthor, refresh } = useAuthors();

  return (
    <main className="min-h-screen p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-2xl font-semibold">Autores</h1>
        <div className="flex items-center gap-2">
          <Link
            href="/crear"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white"
          >
            Crear autor
          </Link>
          <button
            onClick={refresh}
            className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/10"
          >
            Recargar
          </button>
        </div>
      </div>

      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && authors.length === 0 && <p>No hay autores.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {authors.map((a) => (
          <AuthorCard
            key={a.id}
            id={a.id}
            name={a.name}
            description={a.description}
            birthDate={a.birthDate}
            image={a.image}
            onDelete={(id) => {
              if (confirm("¿Eliminar autor?")) deleteAuthor(id);
            }}
          />
        ))}
      </div>
    </main>
  );
}
