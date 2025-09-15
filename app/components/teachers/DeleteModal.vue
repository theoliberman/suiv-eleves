<script lang="ts" setup>
const props = defineProps<{
  teacher: any;
  refresh: Function;
}>();

const open = ref(false);

const toast = useToast();

async function onSubmit() {
  open.value = false;
  $fetch(`/api/users/${props.teacher.id}`, {
    method: "DELETE",
  })
    .then(async (teacher) => {
      await props.refresh();
      toast.add({
        title: "Enseignant supprimé avec succès",
        description: `${teacher?.name} (${teacher?.email})`,
        icon: "i-lucide-trash-2",
        color: "error",
      });
    })
    .catch(() => {
      toast.add({
        title: "Une erreur est survenue",
        color: "error",
        icon: "i-lucide-triangle-alert",
      });
    });
}
</script>

<template>
  <UModal
    v-model:open="open"
    title="Suppression d'un enseignant"
    description="Êtes-vous sûr ? Cette action est définitive"
  >
    <UButton icon="i-lucide-trash-2" variant="ghost" color="error" />
    <template #body>
      <div class="text-sm min-w-0 text-center">
        <span class="text-highlighted font-medium truncate">
          {{ teacher.name }}
        </span>
        <span class="text-muted truncate mx-2"> ({{ teacher.email }}) </span>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-between gap-2 w-full">
        <UButton
          label="Annuler"
          color="neutral"
          variant="subtle"
          @click="open = false"
        />
        <UButton
          label="Supprimer"
          color="error"
          variant="solid"
          loading-auto
          @click="onSubmit"
        />
      </div>
    </template>
  </UModal>
</template>
