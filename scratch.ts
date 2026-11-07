import { prisma } from "@/lib/db";
import { hashPin, checkAccess } from "@/lib/pin";

async function main() {
  const w = await prisma.wishlist.create({
    data: {
      firstName: "Test",
      lastName: "Pin",
      normalizedName: "test pin",
      pinHash: await hashPin("1234"),
    },
  });

  console.log(await checkAccess(w.id, "0000")); // invalid, attemptsLeft: 4
  console.log(await checkAccess(w.id, "1234")); // ok (licznik wyzerowany)

  for (let i = 0; i < 5; i++) {
    console.log(await checkAccess(w.id, "0000")); // invalid 4, 3, 2, 1, a 5. próba: locked
  }

  console.log(await checkAccess(w.id, "1234")); // locked (nawet z dobrym PIN-em)

  await prisma.wishlist.delete({ where: { id: w.id } });
  await prisma.$disconnect();
}

main();
