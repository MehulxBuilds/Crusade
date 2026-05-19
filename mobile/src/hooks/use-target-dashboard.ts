import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";

import { useTargetStore } from "@/store/targets";
import { Target, targetFormSchema, TargetFormValues } from "@/types";

export const getDefaultTargetFormValues = (): TargetFormValues => ({
  name: "",
  description: "",
  targetDate: new Date().toISOString().slice(0, 10),
  status: "NEW",
});

export function useTargetDashboard() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<Target | null>(null);
  const { targets, fetchTargets, createTarget, updateTarget, deleteTarget } = useTargetStore();

  const form = useForm<TargetFormValues>({
    defaultValues: getDefaultTargetFormValues(),
    resolver: zodResolver(targetFormSchema),
  });

  useEffect(() => {
    fetchTargets();
  }, [fetchTargets]);

  const refreshTargets = useCallback(async () => {
    setRefreshing(true);
    await fetchTargets();
    setRefreshing(false);
  }, [fetchTargets]);

  const sortedTargets = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return [...targets]
      .sort((a, b) => a.targetDate.getTime() - b.targetDate.getTime())
      .filter((target) => {
        if (!normalizedQuery) {
          return true;
        }

        return [target.name, target.description ?? "", target.status]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      });
  }, [query, targets]);

  const analytics = useMemo(() => {
    const completed = targets.filter((target) => target.status === "COMPLETED").length;
    const aborted = targets.filter((target) => target.status === "ABORTED").length;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const missed = targets.filter((target) => {
      const targetDate = new Date(target.targetDate);
      targetDate.setHours(0, 0, 0, 0);

      return target.status === "NEW" && targetDate.getTime() < today.getTime();
    }).length;

    return {
      total: targets.length,
      completed,
      aborted,
      missed,
    };
  }, [targets]);

  const openCreateDialog = () => {
    setSelectedTarget(null);
    form.reset(getDefaultTargetFormValues());
    setOpen(true);
  };

  const openEditDialog = (target: Target) => {
    setSelectedTarget(target);
    form.reset({
      name: target.name,
      description: target.description ?? "",
      targetDate: target.targetDate.toISOString().slice(0, 10),
      status: target.status,
    });
    setOpen(true);
  };

  const closeDialog = () => {
    setSelectedTarget(null);
    form.reset(getDefaultTargetFormValues());
    setOpen(false);
  };

  const onSubmit = form.handleSubmit(async (values) => {
    const payload = {
      id: selectedTarget?.id,
      name: values.name,
      description: values.description || null,
      targetDate: new Date(values.targetDate),
      status: selectedTarget ? values.status : "NEW",
    };

    const response = selectedTarget ? await updateTarget(payload) : await createTarget(payload);

    if (response.success) {
      closeDialog();
    }
  });

  const onDelete = () => {
    if (!selectedTarget?.id) {
      return;
    }

    const targetToDelete = selectedTarget;
    const targetId = selectedTarget.id;

    Alert.alert(
      "Delete target",
      `Delete "${targetToDelete.name}"? This cannot be undone.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const response = await deleteTarget(targetId);

            if (response.success) {
              closeDialog();
            }
          },
        },
      ],
    );
  };

  return {
    analytics,
    form,
    isEditing: Boolean(selectedTarget),
    onDelete,
    open,
    openCreateDialog,
    openEditDialog,
    onSubmit,
    query,
    refreshTargets,
    refreshing,
    setOpen: (nextOpen: boolean) => {
      if (!nextOpen) {
        closeDialog();
        return;
      }
      setOpen(true);
    },
    setQuery,
    sortedTargets,
  };
}

