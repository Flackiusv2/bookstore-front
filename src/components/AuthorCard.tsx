"use client";
import Link from "next/link";

export type AuthorCardProps = {
  id: number;
  name: string;
  description: string;
  birthDate: string;
  image?: string;
  onDelete?: (id: number) => void;
};

export default function AuthorCard({ id, name, description, birthDate, image, onDelete }: AuthorCardProps) {
  return (
    <div className="rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="w-full h-48 bg-gray-50 dark:bg-zinc-800 flex items-center justify-center">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={name} className="max-h-full max-w-full object-contain" />
        ) : (
          <div className="text-gray-400">Sin imagen</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{name}</h3>
        <p className="text-sm font-semibold mb-1">{birthDate}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{description}</p>
      </div>
      <div className="p-4 pt-0 flex gap-2">
        <Link
          href={`/editar/${id}`}
          className="inline-flex items-center justify-center px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm"
        >
          Editar
        </Link>
        <button
          onClick={() => onDelete?.(id)}
          className="inline-flex items-center justify-center px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
