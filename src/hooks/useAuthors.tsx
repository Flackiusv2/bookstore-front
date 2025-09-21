"use client";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Author = {
  id: number;
  name: string;
  description: string;
  birthDate: string; // ISO string (YYYY-MM-DD)
  image: string;
};

export type NewAuthor = Omit<Author, "id">;
export type UpdateAuthor = Partial<NewAuthor> & { id: number };

type AuthorsContextType = {
  authors: Author[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  getAuthorById: (id: number) => Author | undefined;
  createAuthor: (data: NewAuthor) => Promise<Author | null>;
  updateAuthor: (id: number, data: NewAuthor) => Promise<Author | null>;
  deleteAuthor: (id: number) => Promise<boolean>;
};

const AuthorsContext = createContext<AuthorsContextType | undefined>(undefined);

const API_BASE = "http://127.0.0.1:8080/api/authors";

export function AuthorsProvider({ children }: { children: React.ReactNode }) {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data: Author[] = await res.json();
      setAuthors(data ?? []);
    } catch (e: any) {
      setError(e?.message ?? "Error al cargar autores");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Cargar autores al montar
    refresh();
  }, [refresh]);

  const getAuthorById = useCallback(
    (id: number) => authors.find((a) => a.id === id),
    [authors]
  );

  const createAuthor = useCallback(async (data: NewAuthor) => {
    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);

      // Algunos backends devuelven 201 sin cuerpo; manejar ambas situaciones
      let created: Author | null = null;
      try {
        const text = await res.text();
        created = text ? (JSON.parse(text) as Author) : null;
      } catch {
        created = null;
      }

      if (created) {
        setAuthors((prev) => [created as Author, ...prev]);
        return created;
      }

      // Si no hay cuerpo en la respuesta, refrescamos la lista y devolvemos un valor truthy para permitir redirección
      await refresh();
      return { id: Number.NaN, ...data } as unknown as Author; // placeholder para truthiness; no se añade al estado
    } catch (e) {
      console.error(e);
      return null;
    }
  }, [refresh]);

  const updateAuthor = useCallback(async (id: number, data: NewAuthor) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const updated: Author = await res.json();
      setAuthors((prev) => prev.map((a) => (a.id === id ? updated : a)));
      return updated;
    } catch (e) {
      console.error(e);
      return null;
    }
  }, []);

  const deleteAuthor = useCallback(async (id: number) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      setAuthors((prev) => prev.filter((a) => a.id !== id));
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }, []);

  const value = useMemo(
    () => ({ authors, loading, error, refresh, getAuthorById, createAuthor, updateAuthor, deleteAuthor }),
    [authors, loading, error, refresh, getAuthorById, createAuthor, updateAuthor, deleteAuthor]
  );

  return <AuthorsContext.Provider value={value}>{children}</AuthorsContext.Provider>;
}

export function useAuthors() {
  const ctx = useContext(AuthorsContext);
  if (!ctx) {
    throw new Error("useAuthors debe usarse dentro de AuthorsProvider");
  }
  return ctx;
}
