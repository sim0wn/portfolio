import {SerializedLinkNode} from "@payloadcms/richtext-lexical";
import {JSXConvertersFunction, LinkJSXConverter} from "@payloadcms/richtext-lexical/react";

import {Page} from "@/types";

import {CustomNodeTypes} from "./types";

function internalDocToHref({ linkNode }: { linkNode: SerializedLinkNode }) {
    const doc = linkNode.fields.doc!;
    if (typeof doc?.value !== "object") {
        throw new Error("Expected value to be an object");
    }

    const { relationTo, value } = doc;

    if (relationTo === "pages") {
        const { book, breadcrumbs, slug } = value as unknown as Page;
        const match = breadcrumbs?.find(breadcrumb => breadcrumb.url?.endsWith(slug));
        const bookSlug = typeof book === "object" ? book.slug : book;
        return `/books/${bookSlug}${match?.url || slug}`;
    }

    return `/${relationTo}/${value.id}`;
}

const jsxConverters: JSXConvertersFunction<CustomNodeTypes> = ({defaultConverters,}) => ({
    ...defaultConverters,
    ...LinkJSXConverter({internalDocToHref}),
})

export {internalDocToHref, jsxConverters}