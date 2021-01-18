<template>
  <app-modal :onModalSubmit="submitModal" header="Update Profile">
    <form>
      <div class="field">
        <label class="title">Full Name</label>
        <input class="input" v-model="profileToUpdate.fullName" />
      </div>
      <div class="field">
        <label class="title">Address</label>
        <input class="input" v-model="profileToUpdate.address" />
      </div>
      <div class="field">
        <label class="title">Country</label>
        <input class="input" v-model="profileToUpdate.country" />
      </div>
      <div class="field">
        <label class="title">Phone</label>
        <input class="input" v-model="profileToUpdate.phone" />
      </div>
      <div class="field">
        <label class="title">Avatar</label>
        <input class="input" v-model="profileToUpdate.avatar" />
      </div>
      <div class="field">
        <label class="title">Info about user</label>
        <input class="input" v-model="profileToUpdate.info" />
      </div>
    </form>
  </app-modal>
</template>

<script>
import Modal from '@/components/Modal.vue';

export default {
  components: { AppModal: Modal },
  props: {
    userProfile: {
      required: true,
      type: Object,
    },
    onModalSubmit: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      profileToUpdate: { ...this.userProfile },
    };
  },
  methods: {
    submitModal() {
      this.onModalSubmit({ ...this.profileToUpdate });
    },
  },
};
</script>

<style></style>
