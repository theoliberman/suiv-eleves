<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();
const { user } = useUserSession();

const adminLinks = [
  {
    label: "Enseignants",
    icon: "i-lucide-users",
    to: "/admin/teachers",
  },
] satisfies NavigationMenuItem[];

const links = computed<NavigationMenuItem[][]>(() => {
  const res = [
    [
      {
        label: "Accueil",
        icon: "i-lucide-house",
        to: "/",
      },
    ],
  ];

  if (user.value?.admin) res[0]?.push(...adminLinks);
  return res;
});
</script>

<template>
  <UDashboardGroup>
    <UDashboardSidebar
      collapsible
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
          :ui="{
            link: 'text-lg',
          }"
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
        <UserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <UDashboardSearch
      :groups="[
        {
          id: 'links',
          items: links.flat(),
        },
      ]"
    />

    <UDashboardPanel>
      <template #header>
        <UDashboardNavbar :title="route.name?.toString()">
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
