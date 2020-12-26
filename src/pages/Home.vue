<template>
  <div>
    <hero />
    <section class="posts">
      <div class="container">
        <div class="posts-type">Latest Posts</div>
        <exchange-list :exchanges="exchanges" />
      </div>
    </section>
    <pagination />
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue';
import Pagination from '@/components/Pagination.vue';
import ExchangeList from '@/components/exchange/ExchangeList.vue';

export default {
  components: {
    Hero,
    Pagination,
    ExchangeList,
  },
  computed: {
    exchanges() {
      return this.$store.getters['exchange/items'];
    },
  },
  created() {
    this.$store.dispatch('exchange/bindExchanges');
  },
};
</script>
