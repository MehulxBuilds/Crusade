import { TargetStatusType } from "@/schema";

export interface CreateAndUpdateTarget {
    id?: string;
    name: string;
    description?: string | null;
    targetDate: Date; // timestamp in milliseconds
    status?: TargetStatusType;
}

export interface Target extends CreateAndUpdateTarget {
    status: TargetStatusType;
    createdAt: Date; // timestamp in milliseconds
    updatedAt: Date; // timestamp in milliseconds
}

export interface Response<T> {
    success: boolean;
    message: string;
    data?: T;
}

export type TargetDashboardProps = {
  mode: "home" | "targets";
};
