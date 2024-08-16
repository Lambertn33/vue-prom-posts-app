import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { ref, watch, computed } from "vue";

export function useAuthForm(
  schema: yup.ObjectSchema<any>,
  action: "login" | "register"
) {
  const store = useStore();

  const { handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const { value: email } = useField("email");
  const { value: password } = useField("password");

  const isLoading = computed(() => store.state.auth.loading);
  const error = computed(() => store.state.auth.error);

  const localError = ref<string | null>(null);

  watch(error, (newError) => {
    localError.value = newError;
  });

  const submitForm = handleSubmit(async (formData) => {
    await store.dispatch(`auth/${action}`, formData);

    if (!store.state.auth.error && store.state.auth.token) {
      window.location.href = "/";
    }
  });

  return {
    email,
    password,
    errors,
    isLoading,
    localError,
    submitForm,
  };
}
