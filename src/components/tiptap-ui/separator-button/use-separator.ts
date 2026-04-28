"use client"

import { useCallback, useEffect, useState } from "react"
import { type Editor } from "@tiptap/react"

// --- Hooks ---
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"

// --- Lib ---
import { isNodeInSchema } from "@/lib/tiptap-utils"

// --- Icons ---
import { HorizontalRuleIcon } from "@/components/tiptap-icons/horizontal-rule-icon"

export const SEPARATOR_SHORTCUT_KEY = "mod+shift+h"

/**
 * Configuration for the separator functionality
 */
export interface UseSeparatorConfig {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor | null
  /**
   * Whether the button should hide when separator is not available.
   * @default false
   */
  hideWhenUnavailable?: boolean
  /**
   * Callback function called after a successful separator insert.
   */
  onInserted?: () => void
}

/**
 * Checks if separator can be inserted in the current editor state
 */
export function canInsert(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false
  return isNodeInSchema("horizontalRule", editor) && editor.can().setHorizontalRule()
}

/**
 * Inserts a separator/horizontal rule in the editor
 */
export function insertSeparator(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false
  if (!canInsert(editor)) return false

  try {
    editor.commands.setHorizontalRule()
    return true
  } catch (error) {
    console.error("Failed to insert separator:", error)
    return false
  }
}

/**
 * Hook for managing separator button state and actions
 */
export function useSeparator({
  editor: providedEditor,
  hideWhenUnavailable = false,
  onInserted,
}: UseSeparatorConfig = {}) {
  const { editor } = useTiptapEditor(providedEditor)
  const [canSeparator, setCanSeparator] = useState(false)

  // Update state based on editor
  useEffect(() => {
    if (!editor) {
      setCanSeparator(false)
      return
    }

    const updateState = () => {
      setCanSeparator(canInsert(editor))
    }

    // Update on selection change
    editor.on("selectionUpdate", updateState)
    editor.on("update", updateState)
    editor.on("focus", updateState)

    // Initial state
    updateState()

    return () => {
      editor.off("selectionUpdate", updateState)
      editor.off("update", updateState)
      editor.off("focus", updateState)
    }
  }, [editor])

  const handleInsert = useCallback(() => {
    if (insertSeparator(editor)) {
      onInserted?.()
    }
  }, [editor, onInserted])

  return {
    isVisible: !hideWhenUnavailable || canSeparator,
    canInsert: canSeparator,
    handleInsert,
    label: "Insert separator",
    shortcutKeys: SEPARATOR_SHORTCUT_KEY,
    Icon: HorizontalRuleIcon,
  }
}
