import { useRouter } from "next/router";
import AuthorForm from "../../components/AuthorForm";
import { useAuthors } from "../../hooks/useAuthors";
import { useEffect, useMemo, useState } from "react";

export default function EditarAutorPage() {
  const router = useRouter();
  const { id } = router.query;
  const { getAuthorById, updateAuthor, loading } = useAuthors();

  const authorId = useMemo(() => {
    const n = Number(id);
    return Number.isFinite(n) ? n : null;
  }, [id]);

  const [ready, setReady] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    birthDate: "",
    image: "",
  });

  useEffect(() => {
    if (authorId == null) return;
    const author = getAuthorById(authorId);
    if (author) {
      setInitialValues({
        name: author.name ?? "",
        description: author.description ?? "",
        birthDate: author.birthDate ?? "",
        image: author.image ?? "",
      });
      setReady(true);
    } else if (!loading) {
      // No encontrado después de cargar
      setReady(true);
    }
  }, [authorId, getAuthorById, loading]);

  async function handleSubmit(values: {
    name: string;
    description: string;
    birthDate: string;
    image: string;
  }) {
    if (authorId == null) return;
    const updated = await updateAuthor(authorId, values);
    if (updated) router.push("/authors");
  }

  if (authorId == null) return <main style={{ padding: 24 }}>ID inválido</main>;
  if (!ready) return <main style={{ padding: 24 }}>Cargando autor...</main>;
  const author = authorId != null ? getAuthorById(authorId) : undefined;
  if (!author) return <main style={{ padding: 24 }}>Autor no encontrado.</main>;

  return (
    <main style={{ padding: 24 }}>
      <h1>Editar autor</h1>
      <AuthorForm initialValues={initialValues} submitLabel="Guardar" onSubmit={handleSubmit} />
    </main>
  );
}
