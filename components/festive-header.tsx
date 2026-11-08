import { Garland } from "@/components/garland";
import Image from "next/image";

export function FestiveHeader() {
  return (
    <header className="pt-0 text-center">
      <Garland />
      <Image src="/Calque_1.svg" alt="Logo firmy" width={150} height={150} />
      <h1 className="font-display text-4xl font-semibold tracking-tight text-gold-300 sm:text-5xl">
        <span aria-hidden>🎅🏻 </span>Lista Mikołaja
      </h1>
      <p className="mx-auto mt-3 max-w-5xl text-cream-100/80">
        Dodaj swoją listę życzeń, a koledzy i koleżanki będą wiedzieć, co Cię
        ucieszy. Jeśli wolisz niespodzianke nie musisz się wpisywać. Kliknięcie
        w opis prezentu przenosi do strony z prezentem, gdzie możesz go kupić.
      </p>
    </header>
  );
}
