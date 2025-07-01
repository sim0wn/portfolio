import { Book, NestedDocs, Page } from "@/types"

/**
 * Organizes an array of documents into a hierarchical structure (tree).
 *
 * @param docs - Array of generic documents.
 * @param getKey - Function to extract the unique key for each document.
 * @param getParentKey - Function that extracts the document's parent key.
 *                       Return null or undefined if the document has no parent.
 * @returns An array containing top-level documents (documents with no parent), with the "children" property populated.
 */
function getNestedDocs<T extends object, K>(
  docs: T[],
  getKey: (doc: T) => K,
  getParentKey: (doc: T) => K | null | undefined,
): NestedDocs<T>[] {
  const docsMap = new Map<K, NestedDocs<T>>()

  // Create a map associating each document with its unique key and initialize the children list.
  for (const doc of docs) {
    const key = getKey(doc)
    docsMap.set(key, { ...doc, children: [] })
  }

  // Iterate over the documents to associate each child with its respective parent.
  for (const doc of docs) {
    const parentKey = getParentKey(doc)
    if (parentKey != null) {
      const parentDoc = docsMap.get(parentKey)
      if (parentDoc) {
        const currentDoc = docsMap.get(getKey(doc))
        if (currentDoc) {
          parentDoc.children.push(currentDoc)
        }
      }
    }
  }

  // Filter and return only the top-level documents (documents without a parent).
  return Array.from(docsMap.values()).filter((doc) => getParentKey(doc) == null)
}

/**
 * Generates the URL for a given page within a book context.
 *
 * @param page - A partial Page object containing at least breadcrumbs and optionally a book reference.
 * @param book - (Optional) A Book object, its slug as a string, or null. If not provided, the function attempts to use the book from the page object.
 * @returns The constructed URL string for the page within the book.
 */
function getPageURL(
  page: Pick<Page, "book" | "breadcrumbs">,
  book?: Book | null | string,
): string {
  const bookSlug = resolveBookSlug(book, page)
  if (!bookSlug) {
    throw new Error("Book slug is required to generate the page URL.")
  }
  const lastBreadcrumbUrl = page.breadcrumbs?.at(-1)?.url ?? ""
  return `/books/${bookSlug}${lastBreadcrumbUrl}`
}

/**
 * Checks if a given `ancestor` node is an ancestor (or self) of a `descendant` node
 * within a tree structure, using customizable accessors for children and unique IDs.
 *
 * This function is generic and agnostic to the underlying tree structure.
 * It traverses the tree recursively, comparing node IDs using the provided `getId` accessor.
 *
 * @template T - The base node type (should match the generic of NestedDocs).
 *
 * @param ancestor - The node from which to start the ancestor check. Typically a root or subtree node.
 * @param descendant - The node to check for ancestry. If `null` or `undefined`, returns `false`.
 * @param getChildren - Function to retrieve the children of a node in the NestedDocs tree.
 * @param getId - Function to retrieve the unique identifier for a node.
 *
 * @returns `true` if `ancestor` is the same node as `descendant` (by ID) or if the `ancestor`
 *          contains the `descendant` node somewhere in its descendants (recursively). Returns `false` otherwise.
 *
 * @example
 * ```ts
 * isAncestor(rootNode, currentNode, node => node.children, node => node.id)
 * ```
 */
function isAncestor<T extends object>(
  ancestor: NestedDocs<T>,
  descendant: null | T | undefined,
  getChildren: (node: NestedDocs<T>) => NestedDocs<T>[] | undefined,
  getId: (node: T) => number | string,
): boolean {
  if (!descendant) return false
  if (getId(ancestor) === getId(descendant)) return true

  const children = getChildren(ancestor)
  if (!children || children.length === 0) return false

  return children.some((child) =>
    isAncestor(child, descendant, getChildren, getId),
  )
}

/**
 * Resolves a book slug from a Book object, string, or (optionally) from the Page object.
 */
function resolveBookSlug(
  book: Book | null | string | undefined,
  page: Partial<Page>,
): string | undefined {
  if (typeof book === "string") return book
  if (book && typeof book === "object") return book.slug
  if (page.book && typeof page.book === "object") return page.book.slug
  return undefined
}

export { getNestedDocs, getPageURL, isAncestor }
