<template>
  <app-modal
    :onModalSubmit="submitModal"
    submitText="Confirm"
    :isSubmitButtonEnabled="isAllowedPrice"
  >
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
            <input
              v-model="selectedCredit"
              class="input"
              type="number"
              placeholder="40"
            />
          </div>
        </div>
        <!-- TODO: provide "disabled" class when user IS offering credit -->
        <div class="field" :class="isOfferingCredit ? 'disabled' : ''">
          <label class="label">Exchange</label>
          <div class="control">
            <div class="select">
              <select v-model="selectedExchange">
                <option value="null" disabled>Exchange</option>
                <option
                  v-for="offeredExchange in offeredExchanges"
                  :key="offeredExchange.id"
                  :value="exchange"
                  >{{ exchange.title }}</option
                >
              </select>
            </div>
          </div>
        </div>
        <div v-if="selectedExchange">
          Your price is:
          <span class="deal-hightlight">{{ selectedExchange.price }}$</span>
        </div>
        <div
          :class="`price price-${priceDifferenceClass}`"
          v-if="percentDifference !== null"
        >
          {{ priceDifferenceText }}
        </div>
        <i>Allowed difference is not less than {{ ALLOWED_DIFFERENCE }}%</i>
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
    offeredExchanges: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isOfferingCredit: false,
      selectedExchange: null,
      selectedCredit: null,
      ALLOWED_DIFFERENCE: 20,
    };
  },
  computed: {
    offeredPrice() {
      if (this.isOfferingCredit) {
        return this.selectedCredit;
      }
      return this.selectedExchange && this.selectedExchange.price;
    },
    percentDifference() {
      if (!this.offeredPrice) {
        return null;
      }

      const priceDifference = this.offeredPrice - this.exchange.price;
      const percantageDifference =
        (priceDifference / this.exchange.price) * 100;
      return percantageDifference;
    },
    priceDifferenceText() {
      if (this.percentDifference === null) {
        return '';
      }
      if (this.percentDifference === 0) {
        return 'You are offering the exact same ammount';
      }

      const rounded = Math.round(this.percentDifference * 100) / 100;
      const differenceText = this.percentDifference > 0 ? 'higher' : 'lower';

      return `Offered price is ${rounded}% ${differenceText} than exchange text`;
    },
    isAllowedPrice() {
      if (!this.offeredPrice) {
        return false;
      }
      return this.percentDifference >= -this.ALLOWED_DIFFERENCE;
    },
    priceDifferenceClass() {
      return this.isAllowedPrice ? 'allowed' : 'declined';
    },
  },
  methods: {
    submitModal() {},
  },
};
</script>

<style scoped lang="scss">
.price {
  padding: 7px;

  &-allowed {
    background-color: #cdeacd;
  }

  &-declined {
    background-color: #ffc2c2;
  }
}

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
