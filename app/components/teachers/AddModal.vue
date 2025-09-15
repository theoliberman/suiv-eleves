<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const props = defineProps<{
  refresh: Function;
}>();

const schema = z.object({
  email: z.email("Email invalide"),
});

const open = ref(false);
const tooltip = ref(false);

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  email: undefined,
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  $fetch("/api/users", {
    method: "POST",
    body: event.data,
  })
    .then(async (teacher) => {
      await props.refresh();
      toast.add({
        title: "Nouvel enseignant ajouté avec succès",
        description: `${teacher.name} (${teacher.email})`,
        icon: "i-lucide-user-plus",
        color: "success",
      });
      open.value = false;
      setTimeout(() => Object.assign(state, { email: undefined }), 200);
    })
    .catch(() =>
      toast.add({
        title: "Une erreur est survenue",
        color: "error",
        icon: "i-lucide-triangle-alert",
      }),
    );
}
</script>

<template>
  <UModal
    v-model:open="open"
    title="Nouvel enseignant"
    description="Ajouter un nouvel enseignant"
  >
    <UTooltip text="Ajouter un enseignant" :open="tooltip">
      <UButton
        icon="i-lucide-user-plus"
        @mouseenter="tooltip = true"
        @mouseleave="tooltip = false"
      />
    </UTooltip>

    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" class="w-full" />
        </UFormField>
        <div class="flex justify-between gap-2">
          <UButton
            label="Annuler"
            color="neutral"
            variant="subtle"
            @click="open = false"
          />
          <UButton
            label="Ajouter"
            color="primary"
            variant="solid"
            type="submit"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
