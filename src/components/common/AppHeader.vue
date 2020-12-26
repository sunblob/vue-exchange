<template>
  <header class="header">
    <nav class="navbar" :class="$route.path === '/' ? '' : 'with-background'">
      <div class="container">
        <div class="navbar-brand">
          <a
            class="navbar-item has-text-white is-size-2 has-text-weight-bold"
            href="#"
          >
            {{ brandName }}
          </a>
          <span
            role="button"
            tabindex="0"
            class="navbar-burger burger has-text-white"
            data-target="navbar-menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbar-menu" class="navbar-menu">
          <div class="navbar-end">
            <!-- Loop through the navigation items -->
            <!-- <a class="navbar-item nav-home" href="#">Home</a>
            <a class="navbar-item nav-style-guide" href="#">About</a>
            <a class="navbar-item nav-features" href="#">FAQ</a>
            <a class="navbar-item nav-tech" href="#">Login</a>
            <a class="navbar-item nav-web" href="#">Register</a> -->
            <router-link
              v-for="item in items"
              :key="item.text"
              class="navbar-item nav-home"
              :to="item.link"
              >{{ item.text }}
            </router-link>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  props: {
    brandName: {
      type: String,
      default: 'App Name',
    },
    items: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped></style>
