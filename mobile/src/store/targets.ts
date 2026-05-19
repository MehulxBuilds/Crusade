import { create } from "zustand";
import { CreateAndUpdateTarget, Response, Target } from "@/types";
import { createTarget, getTargets, updateTarget, getTargetById, deleteTarget } from "@/db/queries";

interface TargetState {
    targets: Target[];
    createTarget: (data: CreateAndUpdateTarget) => Promise<Response<undefined>>;
    updateTarget: (data: CreateAndUpdateTarget) => Promise<Response<undefined>>;
    getTargetById: (id: string) => Promise<Response<Target | null>>;
    fetchTargets: () => Promise<Response<Target[]>>;
    deleteTarget: (id: string) => Promise<Response<undefined>>;
}

export const useTargetStore = create<TargetState>((set, get) => ({
    targets: [],
    createTarget: async (data) => {
        const response = await createTarget(data);

        if (response.success) {
            await get().fetchTargets();
        }

        return response;
    },
    updateTarget: async (data) => {
        const response = await updateTarget(data);

        if (response.success) {
            await get().fetchTargets();
        }

        return response;
    },
    fetchTargets: async () => {
        const response = await getTargets();

        if (response.success && response.data) {
            set({ targets: response.data });
        }

        return response;
    },
    getTargetById: async (id) => {
        const response = await getTargetById(id);

        return response;
    },
    deleteTarget: async (id) => {
        const response = await deleteTarget(id);

        if (response.success) {
            await get().fetchTargets();
        }

        return response;
    }
}));
