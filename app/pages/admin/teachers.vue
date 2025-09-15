<script lang="ts" setup>
definePageMeta({
  name: "Enseignants",
});

const { data: teachers, refresh } = await useFetch("/api/users", {
  default: () => [],
});

const q = ref("");

const filteredTeachers = computed(() => {
  return teachers.value.filter((teacher) => {
    return (
      teacher.name.search(new RegExp(q.value, "i")) !== -1 ||
      teacher.email.search(new RegExp(q.value, "i")) !== -1
    );
  });
});
</script>

<template>
  <div
    class="flex flex-col gap-4 sm:gap-6 lg:gap-12 w-full lg:max-w-2xl mx-auto lg:py-12"
  >
    <UPageCard
      variant="subtle"
      :ui="{
        container: 'p-0 sm:p-0 gap-y-0',
        wrapper: 'items-stretch',
        header: 'p-4 mb-0 border-b border-default',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between gap-3 px-2">
          <UInput
            v-model="q"
            icon="i-lucide-search"
            placeholder="Rechercher..."
            autofocus
            class="w-full"
          />
          <TeachersAddModal :refresh="refresh" />
        </div>
      </template>

      <ul role="list" class="divide-y divide-default">
        <li
          v-for="(teacher, index) in filteredTeachers"
          :key="index"
          class="flex items-center justify-between gap-3 py-3 px-4 sm:px-6"
        >
          <div class="flex items-center gap-3 min-w-0 justify-between">
            <UAvatar v-bind="{ alt: teacher.name }" size="md" />

            <div class="text-sm min-w-0 w-50">
              <p class="text-highlighted font-medium truncate">
                {{ teacher.name }}
              </p>
              <p class="text-muted truncate">
                {{ teacher.email }}
              </p>
            </div>

            <div>
              <UBadge
                variant="subtle"
                :color="teacher.admin ? 'error' : 'success'"
              >
                {{ teacher.admin ? "Directeur" : "Enseignant" }}
              </UBadge>
              <UBadge
                variant="subtle"
                color="warning"
                class="mx-2"
                v-if="!teacher.activated"
              >
                Non activé
              </UBadge>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <TeachersDeleteModal
              :teacher="teacher"
              :refresh="refresh"
              v-if="!teacher.admin"
            />
          </div>
        </li>
      </ul>
    </UPageCard>
  </div>
</template>
