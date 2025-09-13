<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

definePageMeta({
  layout: "auth",
});

const toast = useToast();

const fields = [
  {
    name: "email",
    type: "text" as const,
    label: "Email",
    placeholder: "Entrer votre email",
  },
];

const schema = z.object({
  email: z.email("Email invalide"),
});

type Schema = z.output<typeof schema>;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  $fetch("/api/auth/request-reset-password", {
    method: "POST",
    body: payload.data,
  });
  await navigateTo("/auth/login");
  toast.add({
    title: "Un e-mail a été envoyé à cette adresse",
    description: payload.data.email,
    color: "info",
    icon: "i-lucide-info",
  });
}
</script>

<template>
  <UAuthForm
    :fields="fields"
    :schema="schema"
    title="Réinitialiser votre mot de passe"
    icon="i-lucide-lock"
    @submit="onSubmit"
    :submit="{
      label: 'Envoyer un lien de connexion',
      color: 'error',
    }"
  >
    <template #description>
      Nous vous enverrons un lien pour modifier votre mot de passe.
    </template>
  </UAuthForm>
</template>
