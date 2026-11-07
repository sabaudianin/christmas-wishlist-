"use client";

import { useRef } from "react";
import { MAX_GIFTS } from "@/lib/validations";

export type GiftRow = { id: number; name: string; url: string };

export const inputClass =
  "w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200";

export function toGiftRows(
  gifts: { name: string; url: string | null }[],
): GiftRow[] {
  return gifts.map((gift, index) => ({
    id: index,
    name: gift.name,
    url: gift.url ?? "",
  }));
}

type Props = {
  legend: string;
  gifts: GiftRow[];
  onChange: (gifts: GiftRow[]) => void;
};

export function GiftFields({ legend, gifts, onChange }: Props) {
  const nextId = useRef(gifts.length);

  function update(id: number, field: "name" | "url", value: string) {
    onChange(
      gifts.map((gift) =>
        gift.id === id ? { ...gift, [field]: value } : gift,
      ),
    );
  }

  function add() {
    onChange([...gifts, { id: nextId.current++, name: "", url: "" }]);
  }

  function remove(id: number) {
    onChange(gifts.filter((gift) => gift.id !== id));
  }

  return (
    <fieldset className="space-y-3">
      <legend className="mb-1 text-sm font-medium">{legend}</legend>

      {gifts.map((gift, index) => (
        <div key={gift.id} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
          <input
            aria-label={`Nazwa prezentu ${index + 1}`}
            placeholder="Nazwa prezentu"
            value={gift.name}
            onChange={(e) => update(gift.id, "name", e.target.value)}
            maxLength={100}
            className={inputClass}
          />
          <input
            aria-label={`Link do prezentu ${index + 1} (opcjonalny)`}
            placeholder="Link (opcjonalnie)"
            inputMode="url"
            value={gift.url}
            onChange={(e) => update(gift.id, "url", e.target.value)}
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => remove(gift.id)}
            disabled={gifts.length === 1}
            aria-label={`Usuń prezent ${index + 1}`}
            className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50 disabled:opacity-40"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        disabled={gifts.length >= MAX_GIFTS}
        className="text-sm font-medium text-red-700 hover:underline disabled:opacity-50"
      >
        + Dodaj kolejny prezent
      </button>
    </fieldset>
  );
}
