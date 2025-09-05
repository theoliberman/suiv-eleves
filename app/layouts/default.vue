<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const { user, clear } = useUserSession();

async function logout() {
  await clear();
  await navigateTo("/login");
}

const links = computed(() => {
  return [
    [
      {
        label: "Accueil",
        icon: "i-lucide-house",
        to: "/",
      },
    ],
    user.value?.admin
      ? [
          {
            label: "Enseignants",
            icon: "i-lucide-users",
            to: "/admin/teachers",
          },
        ]
      : [],
  ] satisfies NavigationMenuItem[][];
});

const groups = computed(() => [
  {
    id: "links",
    label: "Aller à",
    items: links.value.flat(),
  },
]);
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="default"
      collapsible
      resizable
      class="bg-elevated/25"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
      <template #header="{ collapsed }">
        <Logo :collapsed="collapsed" />
      </template>

      <template #default="{ collapsed }">
        <UDashboardSearchButton
          :collapsed="collapsed"
          class="bg-transparent ring-default"
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[0]"
          orientation="vertical"
          tooltip
          popover
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[1]"
          orientation="vertical"
          tooltip
          class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <UserMenu :collapsed="collapsed" :name="user?.name" :logout="logout" />
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="groups" />

    <UDashboardPanel
      :ui="{
        body: 'sm:p-0 p-0',
      }"
    >
      <template #header>
        <UDashboardNavbar
          :title="$route.name?.toString()"
          :ui="{ right: 'gap-3' }"
        >
          <template #leading>
            <UDashboardSidebarCollapse />
          </template>

          <template #right>
            <UColorModeButton />
          </template>
        </UDashboardNavbar>
      </template>

      <template #body>
        <slot />
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
