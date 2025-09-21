"use client";
import React, { useEffect, useState } from "react";

export type AuthorFormValues = {
  name: string;
  description: string;
  birthDate: string; // YYYY-MM-DD
  image: string;
};

export default function AuthorForm({
  initialValues,
  onSubmit,
  submitLabel = "Guardar",
}: {
  initialValues?: Partial<AuthorFormValues>;
  onSubmit: (values: AuthorFormValues) => void | Promise<void>;
  submitLabel?: string;
}) {
  const [form, setForm] = useState<AuthorFormValues>({
    name: "",
    description: "",
    birthDate: "",
    image: "",
  });

  useEffect(() => {
    if (initialValues) {
      setForm((prev) => ({ ...prev, ...initialValues } as AuthorFormValues));
    }
  }, [initialValues]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-1.5">
        <label className="text-sm font-medium">Nombre</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-black/15 dark:border-white/15 bg-white dark:bg-zinc-800 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid gap-1.5">
        <label className="text-sm font-medium">Descripción</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-md border border-black/15 dark:border-white/15 bg-white dark:bg-zinc-800 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid gap-1.5">
        <label className="text-sm font-medium">Fecha de nacimiento</label>
        <input
          type="date"
          name="birthDate"
          value={form.birthDate}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-black/15 dark:border-white/15 bg-white dark:bg-zinc-800 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid gap-1.5">
        <label className="text-sm font-medium">URL de imagen</label>
        <input
          type="url"
          name="image"
          value={form.image}
          onChange={handleChange}
          className="w-full rounded-md border border-black/15 dark:border-white/15 bg-white dark:bg-zinc-800 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
      >
        {submitLabel}
      </button>
    </form>
  );
}
