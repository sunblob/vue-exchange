<template>
  <div>
    <div v-if="$slots.openingElement" @click="isOpen = !isOpen">
      <slot name="openingElement" />
    </div>
    <button
      v-else
      @click="isOpen = !isOpen"
      class="button is-primary is-outlined m-t-sm"
    >
      Update Info
    </button>
    <div :class="['modal', { 'is-active': isOpen }]">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ header }}</p>
          <button
            @click="isOpen = false"
            class="delete"
            aria-label="close"
          ></button>
        </header>
        <section class="modal-card-body">
          <slot />
        </section>
        <footer class="modal-card-foot">
          <button
            @click="submitModal"
            :disabled="!isSubmitButtonEnabled"
            class="button is-success"
          >
            {{ submitText }}
          </button>
          <button @click="isOpen = false" class="button">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    onModalSubmit: {
      type: Function,
      required: true,
    },
    header: {
      type: String,
      default: 'Confirmation Window',
    },
    submitText: {
      type: String,
      default: 'Save changes',
    },
    isSubmitButtonEnabled: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    submitModal() {
      this.onModalSubmit();
      this.isOpen = false;
    },
  },
};
</script>

<style></style>
