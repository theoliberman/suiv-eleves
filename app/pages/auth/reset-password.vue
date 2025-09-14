<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

definePageMeta({
  layout: "auth",
});

const toast = useToast();

const fields = [
  {
    name: "password",
    type: "password" as const,
    label: "Mot de passe",
    placeholder: "Entrer votre mot de passe",
  },
  {
    name: "confirm",
    type: "password" as const,
    label: "Confirmation",
    placeholder: "Confirmer votre mot de passe",
  },
];

const schema = z
  .object({
    password: z
      .string({ message: "Entrer votre mot de passe" })
      .min(1, "Entrer votre mot de passe"),
    confirm: z
      .string({ message: "Confirmer votre mot de passe" })
      .min(1, "Confirmer votre mot de passe"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirm"],
  });

type Schema = z.output<typeof schema>;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  $fetch("/api/auth/reset-password", {
    method: "POST",
    body: { token: useRoute().query.token, ...payload.data },
  })
    .then(async () => {
      await navigateTo("/auth/login");
      toast.add({
        title: "Votre mot de passe a été modifié",
        color: "success",
        icon: "i-lucide-lock",
      });
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
  <UAuthForm
    :fields="fields"
    :schema="schema"
    title="Réinitialisation de votre mot de passe"
    icon="i-lucide-lock"
    @submit="onSubmit"
    :submit="{
      label: 'Modifier votre mot de passe',
    }"
  >
  </UAuthForm>
</template>
