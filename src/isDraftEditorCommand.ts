import { DraftEditorCommand } from "draft-js";

export function isDraftEditorCommand(command: string): command is DraftEditorCommand {
  return (
    command === "undo" ||
    command === "redo" ||
    command === "delete" ||
    command === "delete-word" ||
    command === "backspace" ||
    command === "backspace-word" ||
    command === "backspace-to-start-of-line" ||
    command === "bold" ||
    command === "code" ||
    command === "italic" ||
    command === "strikethrough" ||
    command === "underline" ||
    command === "split-block" ||
    command === "transpose-characters" ||
    command === "move-selection-to-start-of-block" ||
    command === "move-selection-to-end-of-block" ||
    command === "secondary-cut" ||
    command === "secondary-paste"
  );
}
