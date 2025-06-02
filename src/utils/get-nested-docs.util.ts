import { NestedDocs } from "@/types"

/**
 * Organizes an array of documents into a hierarchical structure (tree).
 *
 * @param docs - Array of generic documents.
 * @param getKey - Function to extract the unique key for each document.
 * @param getParentKey - Function that extracts the document's parent key.
 *                       Return null or undefined if the document has no parent.
 * @returns An array containing top-level documents (documents with no parent), with the "children" property populated.
 */
export function getNestedDocs<T extends object, K>(
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
