"use client";

import { useState, type FormEvent } from "react";
import {
  deleteWishlist,
  unlockWishlist,
  updateWishlist,
  type ActionResult,
} from "@/app/actions";
import {
  GiftFields,
  inputClass,
  toGiftRows,
  type GiftRow,
} from "@/components/gift-fields";
import { updateWishlistSchema } from "@/lib/validations";

type Mode = "idle" | "unlock" | "edit" | "delete";

type Props = {
  wishlist: {
    id: string;
    firstName: string;
    lastName: string;
    gifts: { name: string; url: string | null }[];
  };
};

function ErrorMessage({ error }: { error: string | null }) {
  if (!error) return null;
  return (
    <p
      role="alert"
      className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800"
    >
      {error}
    </p>
  );
}

export function WishlistActions({ wishlist }: Props) {
  const [mode, setMode] = useState<Mode>("idle");
  const [secret, setSecret] = useState("");
  const [gifts, setGifts] = useState<GiftRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  function open(next: Mode) {
    setSecret("");
    setError(null);
    setMode(next);
  }

  function close() {
    open("idle");
  }

  async function run(
    action: () => Promise<ActionResult>,
    onSuccess: () => void,
  ) {
    setError(null);
    setPending(true);
    try {
      const result = await action();
      if (!result.ok) {
        setError(result.error);
        return;
      }
      onSuccess();
    } catch {
      setError("Brak połączenia. Spróbuj ponownie.");
    } finally {
      setPending(false);
    }
  }

  function handleUnlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void run(
      () => unlockWishlist({ id: wishlist.id, pin: secret }),
      () => {
        setGifts(toGiftRows(wishlist.gifts));
        setMode("edit");
      },
    );
  }

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = {
      id: wishlist.id,
      pin: secret,
      gifts: gifts.map(({ name, url }) => ({ name, url })),
    };

    const parsed = updateWishlistSchema.safeParse(input);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Nieprawidłowe dane.");
      return;
    }

    void run(() => updateWishlist(input), close);
  }

  function handleDelete(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void run(() => deleteWishlist({ id: wishlist.id, secret }), close);
  }

  if (mode === "idle") {
    return (
      <div className="mt-4 flex justify-center gap-4 border-t border-neutral-100 pt-3 text-sm text-white">
        <button
          type="button"
          onClick={() => open("unlock")}
          className="font-medium  hover:text-orange-300 duration-100"
        >
          Edytuj
        </button>
        <button
          type="button"
          onClick={() => open("delete")}
          className="font-medium  hover:text-red-600 duration-100"
        >
          Usuń
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4 border-t border-neutral-100 pt-4">
      {mode === "unlock" && (
        <form onSubmit={handleUnlock} className="space-y-3">
          <input
            type="password"
            inputMode="numeric"
            autoComplete="off"
            maxLength={4}
            aria-label="PIN"
            placeholder="PIN (4 cyfry)"
            value={secret}
            onChange={(e) => setSecret(e.target.value.replace(/\D/g, ""))}
            className={inputClass}
          />
          <ErrorMessage error={error} />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={pending}
              className="rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 disabled:opacity-60"
            >
              {pending ? "Sprawdzam…" : "Dalej"}
            </button>
            <button
              type="button"
              onClick={close}
              className="rounded-lg border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-50"
            >
              Anuluj
            </button>
          </div>
        </form>
      )}

      {mode === "edit" && (
        <form onSubmit={handleSave} noValidate className="space-y-3">
          <GiftFields
            legend="Edytuj prezenty"
            gifts={gifts}
            onChange={setGifts}
          />
          <ErrorMessage error={error} />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={pending}
              className="rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 disabled:opacity-60"
            >
              {pending ? "Zapisuję…" : "Zapisz"}
            </button>
            <button
              type="button"
              onClick={close}
              className="rounded-lg border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-50"
            >
              Anuluj
            </button>
          </div>
        </form>
      )}

      {mode === "delete" && (
        <form onSubmit={handleDelete} className="space-y-3">
          <p className="text-sm ">
            Usunąć listę: {wishlist.firstName} {wishlist.lastName}? Tego nie
            można cofnąć. Podaj PIN .
          </p>
          <input
            type="password"
            autoComplete="off"
            aria-label="PIN lub hasło administratora"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className={inputClass}
          />
          <ErrorMessage error={error} />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={pending}
              className="rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 disabled:opacity-60"
            >
              {pending ? "Usuwam…" : "Usuń listę"}
            </button>
            <button
              type="button"
              onClick={close}
              className="rounded-lg border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-50"
            >
              Anuluj
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
