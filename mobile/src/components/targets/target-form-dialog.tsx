import DateTimePicker from "@react-native-community/datetimepicker";
import { CalendarDays, X } from "lucide-react-native";
import { useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { Platform, Pressable } from "react-native";
import {
  Button,
  Dialog,
  Fieldset,
  Input,
  Label,
  Text,
  TextArea,
  Unspaced,
  XStack,
  YStack,
} from "tamagui";

import { targetStatusEnum } from "@/schema";
import { TargetFormValues } from "@/types";
import { mutedPlaceholder, primaryColor, primaryPressedColor } from "@/components/targets/constants";
import { formatDate } from "@/components/utils";

const statusOptions = targetStatusEnum;

export function TargetFormDialog({
  form,
  open,
  mode,
  onDelete,
  onOpenChange,
  onSubmit,
}: {
  form: UseFormReturn<TargetFormValues>;
  open: boolean;
  mode: "create" | "edit";
  onDelete?: () => void;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
}) {
  return (
    <Dialog modal open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay key="overlay" backgroundColor="rgba(15,23,42,0.28)" />
        <Dialog.Content
          key="content"
          width="92%"
          maxWidth={440}
          alignSelf="center"
          borderRadius="$7"
          padding="$5"
          gap="$4"
          backgroundColor="#ffffff"
          borderWidth={1}
          borderColor="#e2e8f0"
        >
          <XStack alignItems="center" justifyContent="space-between">
            <Dialog.Title color="#0f172a" fontSize={22} fontWeight="800" letterSpacing={-0.2}>
              {mode === "edit" ? "Edit target" : "New target"}
            </Dialog.Title>
            <Unspaced>
              <Button
                circular
                size="$3"
                chromeless
                icon={<X color="#0f172a" size={18} />}
                onPress={() => onOpenChange(false)}
              />
            </Unspaced>
          </XStack>

          <YStack gap="$3">
            <FormInput form={form} name="name" label="Name" placeholder="Win 10 customers" />
            <DateInput form={form} />
            {mode === "edit" ? <StatusInput form={form} /> : null}
            <DescriptionInput form={form} />
          </YStack>

          <YStack gap="$2">
            <Button backgroundColor={primaryColor} pressStyle={{ backgroundColor: primaryPressedColor }} onPress={onSubmit} borderRadius={999}>
              <Text color="#ffffff" fontWeight="800">
                {mode === "edit" ? "Save changes" : "Create target"}
              </Text>
            </Button>

            {mode === "edit" && onDelete ? (
              <Button
                backgroundColor="#fff1f2"
                borderColor="#fecdd3"
                borderWidth={1}
                pressStyle={{ backgroundColor: "#ffe4e6" }}
                onPress={onDelete}
                borderRadius={999}
              >
                <Text color="#e11d48" fontWeight="800">
                  Delete target
                </Text>
              </Button>
            ) : null}
          </YStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

function StatusInput({ form }: { form: UseFormReturn<TargetFormValues> }) {
  return (
    <Fieldset>
      <Label color="#334155">Status</Label>
      <Controller
        control={form.control}
        name="status"
        render={({ field }) => (
          <XStack gap="$2" flexWrap="wrap">
            {statusOptions.map((status) => {
              const selected = field.value === status;

              return (
                <Pressable key={status} onPress={() => field.onChange(status)}>
                  <YStack
                    borderRadius="$10"
                    paddingHorizontal="$3"
                    paddingVertical="$2"
                    backgroundColor={selected ? primaryColor : "#f1f5f9"}
                    borderWidth={1}
                    borderColor={selected ? primaryColor : "#e2e8f0"}
                  >
                    <Text color={selected ? "#ffffff" : "#475569"} fontSize={12} fontWeight="800">
                      {status}
                    </Text>
                  </YStack>
                </Pressable>
              );
            })}
          </XStack>
        )}
      />
    </Fieldset>
  );
}

function FormInput({
  form,
  name,
  label,
  placeholder,
}: {
  form: UseFormReturn<TargetFormValues>;
  name: "name";
  label: string;
  placeholder: string;
}) {
  const error = form.formState.errors[name]?.message;

  return (
    <Fieldset>
      <Label color="#334155">{label}</Label>
      <Controller
        control={form.control}
        name={name}
        render={({ field }) => (
          <Input
            borderWidth={1}
            borderColor={error ? "#f87171" : "#e2e8f0"}
            backgroundColor="#f8fafc"
            color="#0f172a"
            placeholder={placeholder}
            placeholderTextColor={mutedPlaceholder}
            borderRadius={10}
            value={field.value}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
          />
        )}
      />
      {error ? <Text color="#fca5a5" fontSize={12}>{error}</Text> : null}
    </Fieldset>
  );
}

function DescriptionInput({ form }: { form: UseFormReturn<TargetFormValues> }) {
  return (
    <Fieldset>
      <Label color="#334155">Description</Label>
      <Controller
        control={form.control}
        name="description"
        render={({ field }) => (
          <TextArea
            multiline
            textAlignVertical="top"
            minHeight={92}
            borderWidth={1}
            borderColor="#e2e8f0"
            backgroundColor="#f8fafc"
            color="#0f172a"
            placeholder="Notes, context, next move"
            placeholderTextColor={mutedPlaceholder}
            borderRadius={10}
            value={field.value}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
          />
        )}
      />
    </Fieldset>
  );
}

function DateInput({ form }: { form: UseFormReturn<TargetFormValues> }) {
  const [showPicker, setShowPicker] = useState(false);
  const error = form.formState.errors.targetDate?.message;

  return (
    <Fieldset>
      <Label color="#334155">Target date</Label>
      <Controller
        control={form.control}
        name="targetDate"
        render={({ field }) => {
          const selectedDate = field.value ? new Date(field.value) : new Date();

          return (
            <YStack gap="$2">
              <Button
                height={48}
                justifyContent="flex-start"
                borderRadius="$4"
                borderWidth={1}
                borderColor={error ? "#f87171" : "#e2e8f0"}
                backgroundColor="#f8fafc"
                onPress={() => setShowPicker(true)}
              >
                <XStack alignItems="center" gap="$2">
                  <CalendarDays size={17} color="#475569" />
                  <Text color="#0f172a" fontWeight="700">
                    {formatDate(selectedDate)}
                  </Text>
                </XStack>
              </Button>

              {showPicker ? (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display={Platform.OS === "ios" ? "inline" : "default"}
                  onChange={(_, date) => {
                    if (Platform.OS !== "ios") {
                      setShowPicker(false);
                    }

                    if (date) {
                      field.onChange(date.toISOString().slice(0, 10));
                    }
                  }}
                />
              ) : null}
            </YStack>
          );
        }}
      />
      {error ? <Text color="#fca5a5" fontSize={12}>{error}</Text> : null}
    </Fieldset>
  );
}
