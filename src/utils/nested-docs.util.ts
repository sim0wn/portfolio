import { NestedDocs } from "@/types"

type Key = number | string

class NestedDocsTree<T extends object> {
  private docsMap: Map<Key, NestedDocs<T>>
  private roots: NestedDocs<T>[]

  constructor(
    docs: T[],
    getKey: (doc: T) => Key,
    getParentKey: (doc: T) => Key | null | undefined,
  ) {
    this.docsMap = new Map()
    // Build map and initialize children
    for (const doc of docs) {
      const key = getKey(doc)
      this.docsMap.set(key, { ...doc, children: [] })
    }
    // Link children to parents
    for (const doc of docs) {
      const parentKey = getParentKey(doc)
      if (parentKey != null) {
        const parent = this.docsMap.get(parentKey)
        const child = this.docsMap.get(getKey(doc))
        if (parent && child) {
          parent.children.push(child)
        }
      }
    }
    // Identify root nodes
    this.roots = Array.from(this.docsMap.values()).filter(
      (doc) => getParentKey(doc) == null,
    )
  }

  findById(id: Key): NestedDocs<T> | undefined {
    return this.docsMap.get(id)
  }

  findByPredicate(predicate: (node: T) => boolean): NestedDocs<T> | undefined {
    const stack = [...this.roots]
    while (stack.length) {
      const node = stack.pop()!
      if (predicate(node as T)) {
        return node
      }
      if (node.children && node.children.length) {
        stack.push(...node.children)
      }
    }
    return undefined
  }

  flatten(): T[] {
    const result: T[] = []
    const stack = [...this.roots]
    while (stack.length) {
      const node = stack.pop()!
      result.push(node as T)
      if (node.children && node.children.length) {
        stack.push(...node.children)
      }
    }
    return result
  }

  getNext(currentId: Key, getId: (node: T) => Key): NestedDocs<T> | undefined {
    const flat = this.flatten()
    const idx = flat.findIndex((node) => getId(node) === currentId)
    if (idx >= 0 && idx < flat.length - 1) {
      return this.findById(getId(flat[idx + 1]))
    }
    return undefined
  }

  getPrevious(
    currentId: Key,
    getId: (node: T) => Key,
  ): NestedDocs<T> | undefined {
    const flat = this.flatten()
    const idx = flat.findIndex((node) => getId(node) === currentId)
    if (idx > 0) {
      return this.findById(getId(flat[idx - 1]))
    }
    return undefined
  }

  getRoots(): NestedDocs<T>[] {
    return this.roots
  }

  isAncestor(
    ancestor: NestedDocs<T>,
    descendant: null | T | undefined,
    getId: (node: T) => Key,
  ): boolean {
    if (!descendant) return false
    if (getId(ancestor as T) === getId(descendant)) return true
    if (!ancestor.children || ancestor.children.length === 0) return false
    return ancestor.children.some((child) =>
      this.isAncestor(child, descendant, getId),
    )
  }
}

export { NestedDocsTree }
