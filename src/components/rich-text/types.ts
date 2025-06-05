import {DefaultNodeTypes, DefaultTypedEditorState, SerializedBlockNode} from "@payloadcms/richtext-lexical";
import {HTMLAttributes} from "react";

type CustomNodeTypes = DefaultNodeTypes | SerializedBlockNode

type RichTextProps = HTMLAttributes<HTMLDivElement> & {
    data: DefaultTypedEditorState
    enableGutter?: boolean
    enableProse?: boolean
}

export type {CustomNodeTypes, RichTextProps}