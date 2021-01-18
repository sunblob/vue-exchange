<template>
  <app-modal :onModalSubmit="submitModal" submitText="Confirm">
    <div class="deal">
      <!-- TODO: replace by actual name -->
      <div class="deal-highlight">{{ exchange.user.fullName }} Offer</div>
      <div class="deal-wrapper">
        <!-- TODO: type of an exchange -->
        <div>{{ exchange.type }}</div>
        <!-- TODO: title of exchange  -->
        <div>"{{ exchange.title }}"</div>
      </div>
      <div class="deal-highlight">Your Offer</div>
      <div class="counter-offer">
        <div class="field">
          Would you prefer to exchange credit ?
          <label class="checkbox is-large">
            <input type="checkbox" v-model="isOfferingCredit" />
            Yes
          </label>
        </div>
        <!-- TODO: provide "disabled" class when user is NOT offering credit -->
        <div class="field" :class="!isOfferingCredit ? 'disabled' : ''">
          <label class="label">How Much Credit ?</label>
          <div class="control">
            <input class="input" type="number" placeholder="40" />
          </div>
        </div>
        <!-- TODO: provide "disabled" class when user IS offering credit -->
        <div class="field" :class="isOfferingCredit ? 'disabled' : ''">
          <label class="label">Exchange</label>
          <div class="control">
            <div class="select">
              <select>
                <option value="service">Service</option>
                <option value="product">Product</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #openingElement>
      <a
        target="_"
        class="button is-fullwidth is-large is-danger is-outlined m-b-sm"
      >
        Make a deal
      </a>
    </template>
  </app-modal>
</template>

<script>
import Modal from '@/components/Modal.vue';

export default {
  components: { AppModal: Modal },
  props: {
    onModalSubmit: {
      type: Function,
      required: true,
    },
    exchange: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      profileToUpdate: { ...this.userProfile },
      isOfferingCredit: false,
    };
  },
  methods: {
    submitModal() {},
  },
};
</script>

<style scoped lang="scss">
.deal-wrapper {
  margin-bottom: 10px;
}
.counter-offer,
.deal-wrapper {
  border: 2px solid grey;
  padding: 10px;
  margin-top: 10px;
  &-title {
    font-size: 21px;
    margin: 5px 0;
    font-weight: bold;
  }
}
.deal {
  font-size: 19px;
  &-highlight {
    font-size: 19px;
    font-weight: bold;
  }
}
.disabled {
  &.field {
    input,
    textarea,
    select {
      pointer-events: none;
      color: grey;
    }
    label {
      color: grey;
    }
  }
}
</style>
