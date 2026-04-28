import { forwardRef, useCallback } from "react"

// --- Hooks ---
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"

// --- Lib ---
import { parseShortcutKeys } from "@/lib/tiptap-utils"

// --- Tiptap UI ---
import type { UseSeparatorConfig } from "@/components/tiptap-ui/separator-button"
import {
  SEPARATOR_SHORTCUT_KEY,
  useSeparator,
} from "@/components/tiptap-ui/separator-button"

// --- UI Primitives ---
import type { ButtonProps } from "@/components/tiptap-ui-primitive/button"
import { Button } from "@/components/tiptap-ui-primitive/button"
import { Badge } from "@/components/tiptap-ui-primitive/badge"

// --- Icons ---
import { HorizontalRuleIcon } from "@/components/tiptap-icons/horizontal-rule-icon"

export interface SeparatorButtonProps
  extends Omit<ButtonProps, "type">, UseSeparatorConfig {
  /**
   * Optional text to display alongside the icon.
   */
  text?: string
  /**
   * Optional show shortcut keys in the button.
   * @default false
   */
  showShortcut?: boolean
}

export function SeparatorShortcutBadge({
  shortcutKeys = SEPARATOR_SHORTCUT_KEY,
}: {
  shortcutKeys?: string
}) {
  return <Badge>{parseShortcutKeys({ shortcutKeys })}</Badge>
}

/**
 * Button component for inserting a separator/horizontal rule in a Tiptap editor.
 *
 * For custom button implementations, use the `useSeparator` hook instead.
 */
export const SeparatorButton = forwardRef<
  HTMLButtonElement,
  SeparatorButtonProps
>(
  (
    {
      editor: providedEditor,
      text,
      hideWhenUnavailable = false,
      onInserted,
      showShortcut = false,
      onClick,
      children,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor)
    const { isVisible, canInsert, handleInsert, label } = useSeparator({
      editor,
      hideWhenUnavailable,
      onInserted,
    })

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        event.stopPropagation()
        handleInsert()
        onClick?.(event)
      },
      [handleInsert, onClick]
    )

    if (!isVisible) {
      return null
    }

    return (
      <Button
        ref={ref}
        variant="ghost"
        disabled={!canInsert}
        onClick={handleClick}
        title={label}
        {...buttonProps}
      >
        {children || (
          <>
            <HorizontalRuleIcon className="tiptap-button-icon" />
            {text && <span>{text}</span>}
          </>
        )}
      </Button>
    )
  }
)

SeparatorButton.displayName = "SeparatorButton"
