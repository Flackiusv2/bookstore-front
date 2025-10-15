import Link from "next/link";
import { useAuthors } from "../hooks/useAuthors";
import AuthorCard from "../components/AuthorCard";

export default function FavoritosPage() {
  const { favoriteAuthors, loading, error, deleteAuthor, isFavorite, toggleFavorite } = useAuthors();

  return (
    <main className="min-h-screen p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-2xl font-semibold">Autores favoritos</h1>
        <div className="flex items-center gap-2">
          <Link
            href="/authors"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/10"
          >
            Volver a autores
          </Link>
        </div>
      </div>

      {loading && <p>Cargando...</p>}
      {error && (
        <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {!loading && favoriteAuthors.length === 0 && (
        <p>No has marcado autores como favoritos todavía.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {favoriteAuthors.map((a) => (
          <AuthorCard
            key={a.id}
            id={a.id}
            name={a.name}
            description={a.description}
            birthDate={a.birthDate}
            image={a.image}
            isFavorite={isFavorite(a.id)}
            onToggleFavorite={toggleFavorite}
            onDelete={(id) => {
              if (confirm("¿Eliminar autor?")) {
                deleteAuthor(id);
              }
            }}
          />
        ))}
      </div>
    </main>
  );
}
