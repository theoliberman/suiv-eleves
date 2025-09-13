<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

definePageMeta({
  layout: "auth",
});

const { fetch: refreshSession } = useUserSession();

const toast = useToast();

const fields = [
  {
    name: "email",
    type: "text" as const,
    label: "Email",
    placeholder: "Entrer votre email",
  },
  {
    name: "password",
    label: "Mot de passe",
    type: "password" as const,
    placeholder: "Entrer votre mot de passe",
  },
];

const schema = z.object({
  email: z.email("Email invalide"),
  password: z
    .string({ message: "Entrer votre mot de passe" })
    .min(1, "Entrer votre mot de passe"),
});

type Schema = z.output<typeof schema>;

function onSubmit(payload: FormSubmitEvent<Schema>) {
  $fetch("/api/auth/login", {
    method: "POST",
    body: payload.data,
  })
    .then(async () => {
      await refreshSession();
      await navigateTo("/");
      toast.add({
        title: "Authentification réussie !",
        color: "success",
        icon: "i-lucide-user-check",
      });
    })
    .catch(() =>
      toast.add({
        title: "Echec de l'authentification !",
        color: "error",
        icon: "i-lucide-triangle-alert",
      }),
    );
}
</script>

<template>
  <UAuthForm
    :fields="fields"
    :schema="schema"
    title="Bienvenue"
    icon="i-lucide-user"
    @submit="onSubmit"
    :submit="{
      label: 'Se connecter',
    }"
  >
    <template #description>
      Connectez-vous à
      <span class="text-primary font-medium">SuivEleves</span>.
    </template>

    <template #password-hint>
      <ULink
        class="text-primary font-medium"
        tabindex="-1"
        to="/auth/request-reset-password"
      >
        Mot de passe oublié ?
      </ULink>
    </template>
  </UAuthForm>
</template>
