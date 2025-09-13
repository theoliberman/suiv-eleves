<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

defineProps<{
  collapsed?: boolean;
}>();

const { user, clear } = useUserSession();

async function logout() {
  await clear();
  await navigateTo("/auth/login");
}

const items = computed<DropdownMenuItem[][]>(() => [
  [
    {
      type: "label",
      label: user.value?.name,
      avatar: { alt: user.value?.name },
    },
  ],
  [
    {
      label: "Se déconnecter",
      icon: "i-lucide-log-out",
      onSelect: logout,
    },
  ],
]);
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{
      content: collapsed ? 'w-48' : 'w-(--reka-dropdown-menu-trigger-width)',
    }"
  >
    <UButton
      v-bind="{
        avatar: { alt: user?.name },
        label: collapsed ? undefined : user?.name,
        trailingIcon: collapsed ? undefined : 'i-lucide-ellipsis-vertical',
      }"
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      class="data-[state=open]:bg-elevated"
      :ui="{
        trailingIcon: 'text-dimmed',
      }"
    />
  </UDropdownMenu>
</template>
