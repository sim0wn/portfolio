import { CollectionConfig } from "payload"

export const ContactSubmissions: CollectionConfig = {
  fields: [
    {
      label: { en: "Full Name", pt: "Nome Completo" },
      name: "fullName",
      required: true,
      type: "text",
    },
    {
      label: { en: "Email", pt: "E-mail" },
      name: "email",
      required: true,
      type: "email",
    },
    {
      admin: {
        description: {
          en: "Optional phone number for contact.",
          pt: "Número de telefone opcional para contato.",
        },
      },
      label: { en: "Phone Number", pt: "Número de Telefone" },
      name: "phoneNumber",
      required: false,
      type: "text",
    },
    {
      admin: {
        description: {
          en: "The message or inquiry from the user.",
          pt: "A mensagem ou consulta do usuário.",
        },
      },
      label: { en: "Message", pt: "Mensagem" },
      name: "message",
      required: true,
      type: "textarea",
    },
    {
      admin: {
        position: "sidebar",
        readOnly: true,
      },
      defaultValue: new Date(),
      name: "createdAt",
      type: "date",
    },
  ],
  slug: "contact-submissions",
}
