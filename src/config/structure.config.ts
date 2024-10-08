import type { StructureResolver } from "sanity/structure"

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .id("content")
    .title("Content")
    .items([
      S.listItem()
        .title("Blog")
        .child(
          S.list()
            .id("blog")
            .items([
              S.documentTypeListItem("article").title("Articles"),
              S.documentTypeListItem("category").title("Categories"),
              S.documentTypeListItem("author").title("Authors"),
            ]),
        ),
      S.listItem()
        .title("Portfolio")
        .child(
          S.list()
            .id("portfolio")
            .items([
              S.documentTypeListItem("faq").title("FAQs"),
              S.documentTypeListItem("highlight").title("Highlights"),
              S.documentTypeListItem("testimonial").title("Testimonials"),
              S.documentTypeListItem("service").title("Services"),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Other")
        .child(
          S.list()
            .id("other")
            .items([
              ...S.documentTypeListItems().filter(
                (item) =>
                  item.getId() &&
                  ![
                    "article",
                    "author",
                    "category",
                    "faq",
                    "testimonial",
                    "service",
                    "highlight",
                  ].includes(item.getId()!),
              ),
            ]),
        ),
    ])
