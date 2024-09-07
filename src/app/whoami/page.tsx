import { getTranslation } from "@/lib/translations.lib"
import { getLocale } from "@/utils/locale.utils"
import Link from "next/link"

import { Card } from "../components/card"

export default async function WhoAmI() {
  const dictionary = await getTranslation(getLocale())
  return (
    <main className="columns-1 lg:columns-2 xl:columns-3 gap-4 *:xl:py-0 *:mb-4">
      <Card>
        <Card.Header>{dictionary.education.title}</Card.Header>
        <Card.Body className="flex flex-col gap-0.5 divide-y divide-neutral-800 *:grid *:items-center *:justify-between *:gap-1.5">
          {dictionary.education.degrees.map(
            ({ degree, institution }, index) => (
              <article key={index}>
                <aside className="flex flex-col">
                  <h1 className="font-medium inline">{degree}</h1>
                  <Link href={institution?.website}>{institution?.name}</Link>
                </aside>
                <aside className="col-start-2 text-end">
                  <address>
                    {institution?.location.city} - {institution?.location.state}
                  </address>
                  <time>{institution?.date}</time>
                </aside>
              </article>
            ),
          )}
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>{dictionary.skills.title}</Card.Header>
        <Card.Body className="divide-y divide-neutral-800">
          {dictionary.skills.categories.map(({ entries, title }, index) => (
            <section className="*:w-full" key={index}>
              <h2 className="font-semibold">{title}</h2>
              <p>{entries.join(", ")}.</p>
            </section>
          ))}
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>{dictionary.experience.title}</Card.Header>
        <Card.Body className="flex flex-col gap-0.5 divide-y divide-neutral-800 *:grid *:items-center *:justify-between *:gap-1.5">
          {dictionary.experience.entries.map(({ company, position }, index) => (
            <article key={index}>
              <aside className="flex flex-col">
                <h1 className="font-medium inline">{position}</h1>
                <Link href="https://www.sescpr.com.br/">{company.name}</Link>
              </aside>
              <aside className="col-start-2 text-end">
                <address>
                  {company.location.city}, {company.location.state}
                </address>
                <time>{company.date}</time>
              </aside>
            </article>
          ))}
        </Card.Body>
      </Card>
    </main>
  )
}
