import { getTranslation } from "@/lib/translations.lib"
import { getLocale } from "@/utils/locale.utils"
import Link from "next/link"

import { Card } from "../components/card"

export default async function WhoAmI() {
  const translation = await getTranslation(getLocale())
  return (
    <main className="columns-1 lg:columns-2 xl:columns-3 gap-4 *:mb-4">
      {/* Education Section */}
      <Card>
        <Card.Header>
          <h1>{translation.education.title}</h1>
        </Card.Header>
        <Card.Body className="flex flex-col gap-0.5 divide-y divide-neutral-800 *:grid *:items-center *:justify-between *:gap-1.5">
          {translation.education.degrees.map(
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
      {/* Skills Section */}
      <Card>
        <Card.Header>
          <h1>{translation.skills.title}</h1>
        </Card.Header>
        <Card.Body className="divide-y divide-neutral-800">
          {translation.skills.categories.map(({ entries, title }, index) => (
            <section className="*:w-full" key={index}>
              <h2 className="font-semibold">{title}</h2>
              <p>{entries.join(", ")}.</p>
            </section>
          ))}
        </Card.Body>
      </Card>
      {/* Experience Section */}
      <Card>
        <Card.Header>
          <h1>{translation.experience.title}</h1>
        </Card.Header>
        <Card.Body className="flex flex-col gap-0.5 divide-y divide-neutral-800 *:grid *:items-center *:justify-between *:gap-1.5">
          {translation.experience.entries.map(
            ({ company, position }, index) => (
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
            ),
          )}
        </Card.Body>
      </Card>
      {/* Certificates Section */}
      <Card>
        <Card.Header>
          <h1>{translation.certificates_card_title}</h1>
        </Card.Header>
        <Card.Body>
          <ul className="flex flex-col gap-0.5 divide-y divide-neutral-800">
            {translation.certificates.map((certificate, index) => (
              <li
                className="flex flex-wrap gap-2 items-center break-inside-avoid"
                key={index}
                title={certificate.description}
              >
                <span className="text-sm">{certificate.issuer}</span>
                <Link
                  className="font-medium flex-1"
                  href={certificate.url}
                  target="_blank"
                >
                  {certificate.title}
                </Link>
                <time className="text-sm">{certificate.date}</time>
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
      {/* Courses Section */}
      <Card>
        <Card.Header>
          <h1>Cursos</h1>
        </Card.Header>
        <Card.Body>
          <ul className="flex flex-col gap-0.5 divide-y divide-neutral-800">
            {translation.courses.map((course, index) => (
              <li
                className="flex flex-wrap gap-2 items-center break-inside-avoid"
                key={index}
                title={course.description}
              >
                <span className="text-sm">{course.institution}</span>
                <Link
                  className="font-medium flex-1"
                  href={course.url}
                  target="_blank"
                >
                  {course.title}
                </Link>
                <time className="text-sm">{course.date}</time>
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
      {/* Awards & Honors Section */}
      <Card>
        <Card.Header>
          <h1>{translation.honors_card_title}</h1>
        </Card.Header>
        <Card.Body>
          <ul className="flex flex-col gap-0.5 divide-y divide-neutral-800">
            {translation.honors.map((honor, index) => (
              <li
                className="flex flex-wrap gap-2 gap-y-0 items-center"
                key={index}
              >
                <span className="text-sm">{honor.issuer}</span>
                <Link
                  className="font-medium flex-1"
                  href={honor.url}
                  target="_blank"
                  title={honor.description}
                >
                  {honor.title}
                </Link>
                <time className="text-sm">{honor.date}</time>
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </main>
  )
}
