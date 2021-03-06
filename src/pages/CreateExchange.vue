<template>
  <div class="container">
    <div class="form-container">
      <form @submit.prevent>
        <div class="field">
          <label class="label">Type</label>
          <div class="control">
            <div class="select">
              <select v-model="form.type">
                <option value="service">Service</option>
                <option value="product">Product</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input
              @blur="$v.form.title.$touch"
              v-model="form.title"
              class="input"
              type="text"
              placeholder="Some nice product"
            />
            <div v-if="$v.form.title.$error" class="form-error">
              <span v-if="!$v.form.title.required" class="help is-danger">
                Title is required
              </span>
              <!-- <span v-if="!$v.form.title.minLength" class="help is-danger">
                Min length of title is 10 characters!
              </span> -->
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <textarea
              @blur="$v.form.description.$touch"
              v-model="form.description"
              class="textarea"
              placeholder="Description"
            ></textarea>
            <div v-if="$v.form.description.$error" class="form-error">
              <span v-if="!$v.form.description.required" class="help is-danger">
                Description is required
              </span>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">Image Link</label>
          <div class="control">
            <input
              @blur="$v.form.image.$touch"
              v-model="form.image"
              class="input"
              type="text"
              placeholder="Product image"
            />
            <div v-if="$v.form.image.$error" class="form-error">
              <span v-if="!$v.form.image.url" class="help is-danger">
                Image must be a valid url!
              </span>
              <span
                v-if="!$v.form.image.supportedFileTypes"
                class="help is-danger"
              >
                Provided image extension is not supported!
              </span>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">Price</label>
          <div class="control">
            <input
              @blur="$v.form.price.$touch"
              v-model="form.price"
              class="input"
              type="number"
              placeholder="100"
            />
            <div v-if="$v.form.price.$error" class="form-error">
              <span v-if="!$v.form.price.required" class="help is-danger">
                Price is required
              </span>
              <span v-if="!$v.form.price.minValue" class="help is-danger">
                Minimum price is 5 dollars!
              </span>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">Country</label>
          <div class="control">
            <input
              @blur="$v.form.country.$touch"
              v-model="form.country"
              class="input"
              type="text"
              placeholder="Russia"
            />
            <div v-if="$v.form.country.$error" class="form-error">
              <span v-if="!$v.form.country.required" class="help is-danger">
                Country is required
              </span>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">City</label>
          <div class="control">
            <input
              @blur="$v.form.city.$touch"
              v-model="form.city"
              class="input"
              type="text"
              placeholder="Moscow"
            />
            <div v-if="$v.form.city.$error" class="form-error">
              <span v-if="!$v.form.city.required" class="help is-danger">
                City is required
              </span>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label">Tags</label>
          <div class="control">
            <input
              @keydown.enter.prevent="handleTags"
              class="input"
              type="text"
              placeholder="programming"
            />
            <div
              v-for="(tag, i) in form.tags"
              :key="`t-${tag}`"
              class="tag is-primary is-medium"
            >
              {{ tag }} <span @click="removeTag(i)">&times;</span>
            </div>
          </div>
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button @click.prevent="createExchange" class="button is-link">
              Submit
            </button>
          </div>
          <div class="control">
            <button class="button is-text">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, url, minValue } from 'vuelidate/lib/validators';
import { supportedFileTypes } from '@/helpers/validators';

export default {
  data: () => ({
    form: {
      title: '',
      description: '',
      type: 'service',
      image: '',
      price: null,
      country: '',
      city: '',
      tags: [],
    },
  }),
  computed: {
    isFormValid() {
      return !this.$v.form.$invalid;
    },
  },
  methods: {
    createExchange() {
      this.$v.form.$touch();

      if (this.isFormValid) {
        this.$store
          .dispatch('exchange/createExchange', { ...this.form })
          .then(() => {
            this.$router.push({ name: 'profile-page' });
          });
      }
    },
    handleTags(e) {
      const { value } = e.target;

      if (value && value.trim().length > 1) {
        this.form.tags.push(value);
        e.target.value = '';
      }
    },
    removeTag(index) {
      this.form.tags.splice(index, 1);
    },
  },
  validations: {
    form: {
      title: {
        required,
        // minLenght: minLength(10),
      },
      description: {
        required,
      },
      image: {
        url,
        supportedFileTypes,
      },
      price: {
        required,
        minValue: minValue(5),
      },
      country: {
        required,
      },
      city: {
        required,
      },
    },
  },
};
</script>

<style>
.form-container {
  max-width: 960px;
  margin: 0 auto;
  padding-bottom: 50px;
}

.tag {
  margin: 3px;
  transition: all 0.3s ease-in-out;
}

.tag:hover {
  color: white !important;
}

.tag span {
  display: inline-block;
  margin-left: 5px;
}

.tag span:hover {
  cursor: pointer;
  color: white !important;
}
</style>
