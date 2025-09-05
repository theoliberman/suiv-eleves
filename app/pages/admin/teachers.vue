<script lang="ts" setup>
import type { DropdownMenuItem } from "@nuxt/ui";
import type { text } from "drizzle-orm/gel-core";

definePageMeta({
  name: "Enseignants",
});

const { data: teachers } = await useFetch("/api/users", {
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
  <UDashboardPanel :ui="{ body: 'lg:py-12' }">
    <template #body>
      <div
        class="flex flex-col gap-4 sm:gap-6 lg:gap-12 w-full lg:max-w-2xl mx-auto"
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
            <div class="flex items-center justify-between gap-3 py-3 px-2">
              <UInput
                v-model="q"
                icon="i-lucide-search"
                placeholder="Rechercher..."
                autofocus
                class="w-full"
              />
            </div>
          </template>

          <ul role="list" class="divide-y divide-default">
            <li
              v-for="(teacher, index) in filteredTeachers"
              :key="index"
              class="flex items-center justify-between gap-3 py-3 px-4 sm:px-6"
            >
              <div class="flex items-center gap-3 min-w-0">
                <UAvatar v-bind="{ alt: teacher.name }" size="md" />

                <div class="text-sm">
                  <p class="text-highlighted font-medium truncate">
                    {{ teacher.name }}
                  </p>
                  <p class="text-muted truncate">
                    {{ teacher.email }}
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <UBadge
                  class="capitalize mx-10 min-w-20 justify-center"
                  variant="subtle"
                  :color="teacher.admin ? 'error' : 'success'"
                  :label="teacher.admin ? 'Directeur' : 'Enseignant'"
                />
              </div>
            </li>
          </ul>
        </UPageCard>
      </div>
    </template>
  </UDashboardPanel>
</template>
