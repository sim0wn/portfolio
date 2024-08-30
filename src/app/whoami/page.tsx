import { getDictionary } from "@/lib/dictionaries"
import { getLocale } from "@/utils/locale.utils"
import { headers } from "next/headers"
import Link from "next/link"

import { Card } from "../components/card"

export default async function WhoAmI() {
  const dictionary = await getDictionary(getLocale(headers()))
  return (
    <main className="columns-1 lg:columns-2 xl:columns-3 gap-4 *:xl:py-0 *:mb-4">
      <Card>
        <Card.Header>{dictionary.whoami.education.title}</Card.Header>
        <Card.Body className="flex flex-col gap-0.5 divide-y divide-neutral-800 *:grid *:items-center *:justify-between *:gap-1.5">
          <article>
            <aside className="flex flex-col">
              <h1 className="font-medium inline">
                {dictionary.whoami.education.degrees.associate}
              </h1>
              <Link href="https://www.fatecourinhos.edu.br/">
                Faculdade de Tecnologia de Ourinhos
              </Link>
            </aside>
            <aside className="col-start-2 text-end">
              <address>Ourinhos, SP</address>
              <time>2024 - 2026</time>
            </aside>
          </article>
          <article>
            <aside className="flex flex-col">
              <h1 className="font-medium inline">
                {dictionary.whoami.education.degrees.technician}
              </h1>
              <Link href="https://ifpr.edu.br/jacarezinho/">
                Instituto Federal de Educação, Ciência e Tecnologia do Paraná -{" "}
                <i>campus</i> Jacarezinho
              </Link>
            </aside>
            <aside className="col-start-2 text-end">
              <address>Jacarezinho, PR</address>
              <time>2020 - 2023</time>
            </aside>
          </article>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>{dictionary.whoami.skills.title}</Card.Header>
        <Card.Body>
          {dictionary.whoami.skills.categories.map(
            ({ entries, title }, index) => (
              <section className="*:w-full" key={index}>
                <h2 className="font-semibold">{title}</h2>
                <p>{entries.join(", ")}</p>
              </section>
            ),
          )}
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>{dictionary.whoami.experience.title}</Card.Header>
        <Card.Body className="flex flex-col gap-0.5 divide-y divide-neutral-800 *:grid *:items-center *:justify-between *:gap-1.5">
          <article>
            <aside className="flex flex-col">
              <h1 className="font-medium inline">
                {dictionary.whoami.experience.entries.sesc}
              </h1>
              <Link href="https://www.sescpr.com.br/">
                Serviço Social do Comércio (SESC)
              </Link>
            </aside>
            <aside className="col-start-2 text-end">
              <address>Santo Antônio da Platina, PR</address>
              <time>2023 - 2024</time>
            </aside>
          </article>
        </Card.Body>
      </Card>
    </main>
  )
}
