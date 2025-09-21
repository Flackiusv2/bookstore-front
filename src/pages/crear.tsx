import { useRouter } from "next/router";
import AuthorForm from "../components/AuthorForm";
import { useAuthors } from "../hooks/useAuthors";

export default function CrearAutorPage() {
  const { createAuthor } = useAuthors();
  const router = useRouter();

  async function handleSubmit(values: {
    name: string;
    description: string;
    birthDate: string;
    image: string;
  }) {
    const created = await createAuthor(values);
    if (created) router.push("/authors");
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-2xl border border-black/10 dark:border-white/15 bg-white dark:bg-zinc-900 shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">Crear nuevo autor</h1>
        <div className="space-y-4">
          <AuthorForm submitLabel="Crear" onSubmit={handleSubmit} />
        </div>
      </div>
    </main>
  );
}
