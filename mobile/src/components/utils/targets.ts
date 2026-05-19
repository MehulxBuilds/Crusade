import { TargetStatusType } from "@/schema";

export function getStatusColor(status: TargetStatusType) {
  switch (status) {
    case "COMPLETED":
      return { background: "#dcfce7", foreground: "#166534" };
    case "ABORTED":
      return { background: "#fee2e2", foreground: "#991b1b" };
    default:
      return { background: "#ede9fe", foreground: "#5b21b6" };
  }
}

export function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(value);
}
