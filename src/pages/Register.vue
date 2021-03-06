<template>
  <div class="container has-text-centered">
    <div class="column is-4 is-offset-4">
      <h3 class="title has-text-grey">Register</h3>
      <div class="box">
        <figure class="avatar">
          <img
            src="https://bulma.io/images/placeholders/128x128.png"
            class="image is-128x128 is-rounded"
          />
        </figure>
        <form>
          <div class="field">
            <div class="control">
              <input
                v-model="form.email"
                class="input is-large"
                type="email"
                placeholder="Your Email"
                autocomplete="email"
              />
              <div v-if="$v.form.email.$error" class="form-error">
                <span v-if="!$v.form.email.required" class="help is-danger">
                  Email is required
                </span>
                <span v-if="!$v.form.email.emailValid" class="help is-danger">
                  Email address is not valid
                </span>
              </div>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input
                v-model="form.fullName"
                class="input is-large"
                type="text"
                placeholder="Full Name"
              />
              <div v-if="$v.form.fullName.$error" class="form-error">
                <span class="help is-danger">Name is required</span>
              </div>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input
                v-model="form.avatar"
                class="input is-large"
                type="text"
                placeholder="Avatar Url"
              />
              <div v-if="$v.form.avatar.$error" class="form-error">
                <span v-if="!$v.form.avatar.required" class="help is-danger"
                  >Avatar is required</span
                >
                <span v-if="!$v.form.avatar.url" class="help is-danger"
                  >Avatar url is not valid</span
                >
              </div>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input
                v-model="form.password"
                class="input is-large"
                type="password"
                placeholder="Your Password"
                autocomplete="current-password"
              />
              <div v-if="$v.form.password.$error" class="form-error">
                <span class="help is-danger">Password is required</span>
              </div>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input
                v-model="form.passwordConfirmation"
                class="input is-large"
                type="password"
                placeholder="Confirm Your Password"
                autocomplete="current-password"
              />
              <div
                v-if="$v.form.passwordConfirmation.$error"
                class="form-error"
              >
                <span
                  v-if="!$v.form.passwordConfirmation.required"
                  class="help is-danger"
                >
                  Password is required
                </span>
                <span
                  v-if="!$v.form.passwordConfirmation.sameAsPassword"
                  class="help is-danger"
                >
                  Password confirmation has to be the same as password!
                </span>
              </div>
            </div>
          </div>
          <button
            @click.prevent="onRegister"
            :disabled="!isFormValid && $v.form.$dirty"
            class="button is-block is-info is-large is-fullwidth"
          >
            Sign Up
          </button>
        </form>
      </div>
      <p class="has-text-grey">
        <a>Sign In With Google</a>&nbsp;
        <router-link to="/login">Sign In</router-link>&nbsp;·&nbsp;
        <a href="../">Need Help?</a>
      </p>
    </div>
  </div>
</template>

<script>
import { required, url, sameAs, email } from 'vuelidate/lib/validators';

export default {
  data: () => ({
    form: {
      email: '',
      fullName: '',
      avatar: '',
      password: '',
      passwordConfirmation: '',
    },
  }),
  validations: {
    form: {
      email: {
        required,
        emailValid: email,
      },
      fullName: {
        required,
      },
      avatar: {
        url,
        required,
      },
      password: {
        required,
      },
      passwordConfirmation: {
        required,
        sameAsPassword: sameAs('password'),
      },
    },
  },
  computed: {
    isFormValid() {
      return !this.$v.form.$invalid;
    },
  },
  methods: {
    async handleRegister() {
      try {
        const user = await this.$store.dispatch('auth/signUp', this.form);
        await this.$store.dispatch('auth/createUserProfile', {
          uid: user.uid,
          userProfile: {
            fullName: this.form.fullName,
            avatar: this.form.avatar,
            user: user.uid,
          },
        });
        this.$router.push('/');
        this.$toasted.success('Signed Up!', {
          duration: 3000,
        });
      } catch (error) {
        // alert(error);
        this.$toasted.error(error, {
          duration: 3000,
        });
      }
    },
    onRegister() {
      this.$v.form.$touch();

      if (this.isFormValid) {
        this.handleRegister();
      }
    },
  },
};
</script>

<style scoped>
.hero.is-success {
  background: #f2f6fa;
}
.hero .nav,
.hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.box {
  margin-top: 5rem;
}
.avatar {
  margin-top: -70px;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
}
.avatar img {
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  /* height: 100px;
  /* width: 100%; */
  /* object-fit: none; */
}
input {
  font-weight: 300;
}
p {
  font-weight: 700;
}
p.subtitle {
  padding-top: 1rem;
}
</style>
