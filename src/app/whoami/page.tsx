import Link from "next/link"

import { Card } from "../components/card"

export default function WhoAmI() {
  return (
    <main className="columns-1 lg:columns-2 xl:columns-3 gap-4 *:xl:py-0 *:mb-4">
      <Card>
        <Card.Header>Education</Card.Header>
        <Card.Body className="flex flex-col gap-0.5 divide-y divide-neutral-800 *:grid *:items-center *:justify-between *:gap-1.5">
          <article>
            <aside className="flex flex-col">
              <h1 className="font-medium inline">
                Information Security Associate
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
              <h1 className="font-medium inline">Information Technician</h1>
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
        <Card.Header>Skills</Card.Header>
        <Card.Body className="*:flex *:*:flex-wrap *:items-center *:gap-1.5">
          <section>
            <h1 className="font-semibold">Analytical</h1>
            <ul className="flex divide-x divide-neutral-800 *:px-2">
              <li>autonomy</li>
              <li>discipline</li>
              <li>focus</li>
              <li>organization</li>
              <li>problem-solving</li>
            </ul>
          </section>
          <section>
            <h1 className="font-semibold">Interpersonal</h1>
            <ul className="flex divide-x divide-neutral-800 *:px-2">
              <li>leadership</li>
              <li>presentation</li>
              <li>teamwork</li>
              <li>writing</li>
            </ul>
          </section>
          <section>
            <h1 className="font-semibold">Languages</h1>
            <ul className="flex divide-x divide-neutral-800 *:px-2">
              <li>Portuguese</li>
              <li>English</li>
            </ul>
          </section>
          <section>
            <h1 className="font-semibold">Technical</h1>
            <ul className="flex divide-x divide-neutral-800 *:px-2">
              <li>BASH</li>
              <li>Kotlin</li>
              <li>Linux</li>
              <li>penetration testing</li>
              <li>PHP</li>
              <li>Python</li>
              <li>SQL</li>
              <li>TypeScript</li>
              <li>Windows</li>
            </ul>
          </section>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Work</Card.Header>
        <Card.Body className="flex flex-col gap-0.5 divide-y divide-neutral-800 *:grid *:items-center *:justify-between *:gap-1.5">
          <article>
            <aside className="flex flex-col">
              <h1 className="font-medium inline">Administrative Assistant</h1>
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
