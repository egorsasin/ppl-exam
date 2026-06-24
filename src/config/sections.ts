import type { Question } from "../types";
import pl040Data from "../../data/PL040.json";
import pl100Data from "../../data/PL100.json";

export interface Section {
  id: string;
  title: string;
  examSize: number;
  questions: Question[];
}

export const sections: Section[] = [
  {
    id: "PL100",
    title: "Prawo Lotnicze",
    examSize: 28,
    questions: pl100Data as Question[],
  },
  {
    id: "PL040",
    title: "Człowiek — Możliwości i Ograniczenia",
    examSize: 12,
    questions: pl040Data as Question[],
  },
];

export function getSectionById(id: string): Section | undefined {
  return sections.find((s) => s.id === id);
}
