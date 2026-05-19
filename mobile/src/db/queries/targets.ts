import "react-native-get-random-values";

import { CreateAndUpdateTarget } from "@/types";
import { db } from "@/db";
import { targets } from "@/schema";
import { eq } from "drizzle-orm";
import { v4 as uuid } from "uuid";

export const createTarget = async ({
    name,
    targetDate,
    description,
    status,
}: CreateAndUpdateTarget) => {
    try {
        await db.insert(targets).values({
            id: uuid(),
            name,
            targetDate,
            description,
            status,
        });

        return {
            success: true,
            message: "Target created successfully",
        };
    } catch (e) {
        return {
            success: false,
            message: "Failed to create target",
        }
    }
};

export const updateTarget = async (
    {
        id,
        name,
        targetDate,
        description,
        status,
    }: CreateAndUpdateTarget
) => {
    try {
        await db
            .update(targets)
            .set({
                name,
                targetDate,
                description,
                status,
                updatedAt: new Date(),
            })
            .where(eq(targets.id, id ?? ""));

        return {
            success: true,
            message: "Target updated successfully",
        };
    } catch (e) {
        return {
            success: false,
            message: "Failed to update target",
        }
    }
};

export const getTargets = async () => {
    try {
        const tagets = await db.select().from(targets);
        return {
            success: true,
            message: "Targets retrieved successfully",
            data: tagets,
        };
    } catch (e) {
        return {
            success: false,
            message: "Failed to retrieve targets",
            data: [],
        };
    }
};

export const getTargetById = async (id: string) => {
    try {
        const target = await db
            .select()
            .from(targets)
            .where(eq(targets.id, id));

        if (!target.length) {
            return {
                success: false,
                message: "Target not found",
                data: null,
            };
        }

        return {
            success: true,
            message: "Target retrieved successfully",
            data: target[0],
        };
    } catch (e) {
        return {
            success: false,
            message: "Failed to retrieve target",
            data: null,
        };
    }
};

export const deleteTarget = async (id: string) => {
    try {
        await db.delete(targets).where(eq(targets.id, id));

        return {
            success: true,
            message: "Target deleted successfully",
        };
    } catch (e) {
        return {
            success: false,
            message: "Failed to delete target",
        };
    }
};