"use client";

import { useRef, useState, type FormEvent } from "react";
import { createWishlist } from "@/app/actions";
import { createWishlistSchema } from "@/lib/validations";
import { GiftFields, inputClass, type GiftRow } from "@/components/gift-fields";

export function CreateWishlistForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pin, setPin] = useState("");
  const [gifts, setGifts] = useState<GiftRow[]>([{ id: 0, name: "", url: "" }]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    const input = {
      firstName,
      lastName,
      pin,
      gifts: gifts.map(({ name, url }) => ({ name, url })),
    };

    const parsed = createWishlistSchema.safeParse(input);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Nieprawidłowe dane.");
      return;
    }

    setPending(true);
    try {
      const result = await createWishlist(input);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setFirstName("");
      setLastName("");
      setPin("");
      setGifts([{ id: 0, name: "", url: "" }]);
      setSuccess(true);
    } catch {
      setError("Brak połączenia. Spróbuj ponownie.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mt-8 space-y-5 rounded-2xl border border-neutral-200 bg-green-900 p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold">Dodaj swoją listę</h2>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="firstName" className="mb-1 block text-sm font-medium">
            Imię
          </label>
          <input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            maxLength={50}
            autoComplete="off"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1 block text-sm font-medium">
            Nazwisko
          </label>
          <input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            maxLength={50}
            autoComplete="off"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="pin" className="mb-1 block text-sm font-medium">
            PIN
          </label>
          <input
            id="pin"
            type="password"
            inputMode="numeric"
            autoComplete="off"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            className={inputClass}
          />
          <p className="mt-1 text-xs text-neutral-500">
            4 cyfry. Zapamiętaj go, bo nie da się go odzyskać.
          </p>
        </div>
      </div>

      <GiftFields
        legend="Co chciałbyś dostać?"
        gifts={gifts}
        onChange={setGifts}
      />

      <div aria-live="polite">
        {error && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800"
          >
            {error}
          </p>
        )}
        {success && (
          <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800">
            Lista dodana! Zapamiętaj swój PIN, bo przyda się do edycji. 🎁
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-red-700 px-5 py-2.5 font-medium text-white hover:bg-red-800 disabled:opacity-60"
      >
        {pending ? "Zapisuję…" : "Dodaj listę"}
      </button>
    </form>
  );
}
