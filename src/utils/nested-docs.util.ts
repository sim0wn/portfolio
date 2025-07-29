import { NestedDocs } from "@/types"

/**
 * Recursively flattens an array of nested document objects into a single-level array.
 *
 * Each document may contain a `children` property, which is an array of nested documents.
 * This function traverses all levels of nesting and returns a flat array containing all documents.
 *
 * @template T - The type of the document object.
 * @param {NestedDocs<T>[]} docs - The array of nested document objects to flatten.
 * @returns {T[]} A flat array containing all documents from all levels of nesting.
 */
function flattenNestedDocs<T extends object>(docs: NestedDocs<T>[]): T[] {
  return docs.flatMap((doc) => [
    doc,
    ...(doc.children ? flattenNestedDocs(doc.children) : []),
  ])
}

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

export { flattenNestedDocs, getNestedDocs, isAncestor }
