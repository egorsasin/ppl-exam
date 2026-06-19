import type { QuestionStatus } from "../../types";

export interface QuestionMapProps {
  /** Status of every question in deck order. */
  statuses: QuestionStatus[];
  /** Index of the question currently shown, or -1 when none. */
  currentIndex: number;
  /** Whether the drawer is open. */
  open: boolean;
  /** Closes the drawer. */
  onClose: () => void;
  /** When set, tiles are clickable and call this with the target index. */
  onSelect?: (index: number) => void;
}
