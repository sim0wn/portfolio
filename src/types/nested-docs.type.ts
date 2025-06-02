/**
 * Auxiliary type representing nested documents by adding a recursive "children" property.
 */
export type NestedDocs<T extends object> = T & { children: NestedDocs<T>[] }
