import { format } from "date-fns"
import { enUS, pt } from "date-fns/locale"
import { BriefcaseBusinessIcon, GraduationCap } from "lucide-react"
import { Locale } from "next-intl"

import { Timeline } from "@/components"
import { Link } from "@/i18n"
import { payload } from "@/lib"

export async function Career({ locale }: { locale: Locale }) {
  const { docs: experiences } = await payload.find({
    collection: "experiences",
    locale,
  })
  const { docs: educations } = await payload.find({
    collection: "educations",
    locale,
  })
  const formatDate = (date: string) =>
    format(date, "MMM yyyy", {
      locale: locale === "pt-BR" ? pt : enUS,
    })
  return (
    <section className="flex w-full flex-col place-content-center gap-8 *:w-fit md:flex-row md:gap-16">
      <Timeline data-orientation="vertical">
        {educations.map((education) => (
          <Timeline.Item key={education.id}>
            <Timeline.Marker className="p-0.5">
              <GraduationCap />
            </Timeline.Marker>
            <Timeline.Content>
              <Timeline.Header>
                <Timeline.Title>{education.course}</Timeline.Title>
              </Timeline.Header>
              <Timeline.Subtitle>
                <Link href={education.institution.website ?? "#"}>
                  {education.institution.name}
                </Link>
              </Timeline.Subtitle>
              <Timeline.DateRange>
                <Timeline.Date dateTime={education.duration.startDate}>
                  {formatDate(education.duration.startDate)}
                </Timeline.Date>
                <Timeline.Date dateTime={education.duration.endDate}>
                  {formatDate(education.duration.endDate)}
                </Timeline.Date>
              </Timeline.DateRange>
            </Timeline.Content>
          </Timeline.Item>
        ))}
      </Timeline>
      <Timeline data-orientation="vertical">
        {experiences.map((experience) => (
          <Timeline.Item key={experience.id}>
            <Timeline.Marker className="p-0.5">
              <BriefcaseBusinessIcon />
            </Timeline.Marker>
            <Timeline.Content>
              <Timeline.Header>
                <Timeline.Title>{experience.position}</Timeline.Title>
              </Timeline.Header>
              <Timeline.Subtitle>
                <Link
                  href={experience.organization.website ?? "#"}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {experience.organization.name}
                </Link>
              </Timeline.Subtitle>
              <Timeline.DateRange onGoing={experience.duration.currentPosition}>
                <Timeline.Date dateTime={experience.duration.startDate}>
                  {formatDate(experience.duration.startDate)}
                </Timeline.Date>
                {experience.duration.endDate && (
                  <Timeline.Date dateTime={experience.duration.endDate}>
                    {formatDate(experience.duration.endDate)}
                  </Timeline.Date>
                )}
              </Timeline.DateRange>
            </Timeline.Content>
          </Timeline.Item>
        ))}
      </Timeline>
    </section>
  )
}
