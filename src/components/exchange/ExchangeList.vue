<template>
  <div class="columns is-multiline">
    <div
      v-for="exchange in exchanges"
      :key="exchange.id"
      class="column is-12-mobile is-6-tablet is-4-widescreen is-6-desktop"
    >
      <div class="item post-card bottom-border">
        <router-link
          class="item-link"
          :to="{ name: 'exchange-detail-page', params: { id: exchange.id } }"
        >
          <figure
            class="image is-2by1 item-figure background-img"
            :style="{
              'background-image': `url(${exchange.image})`,
            }"
            alt="image"
          ></figure>
          <div class="item-featured">
            <div class="exchange-icon">
              <font-awesome-icon icon="star" />
            </div>
          </div>
        </router-link>
        <div class="item-tags">
          <a
            v-for="tag in exchange.tags"
            :key="tag"
            class="button is-rounded"
            href="#"
            title="Some Title"
            >#{{ tag }}</a
          >
        </div>
        <h2 class="title item-title is-size-4 has-text-weight-extra-bold">
          <a class="item-link" href="#">{{ exchange.title }}</a>
        </h2>
        <div class="level">
          <div class="level-left">
            <div class="item-author">Filip Jerga</div>
          </div>
          <div class="level-right">
            27th December 2019
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="column is-12-mobile is-6-tablet is-4-widescreen is-6-desktop">
      <div class="item post-card has-border">
        <a class="item-link" href="#">
          <div class="item-featured">
            Icon
          </div>
        </a>
        <div class="item-tags">
          <a class="button is-rounded" href="#" title="Some Title">#Art</a>
        </div>
        <h2 class="title item-title is-size-4 has-text-weight-extra-bold">
          <a class="item-link" href="#">Some Title</a>
        </h2>
        <div class="item-description">
          Aaaaaaa
        </div>
        <div class="level">
          <div class="level-left">
            <div class="item-author">Filip Jerga</div>
          </div>
          <div class="level-right">
            27th December 2019
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    exchanges: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.exchange-icon {
  height: 25px;
  width: 25px;
  color: #ffbc8c;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
