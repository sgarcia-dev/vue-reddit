<template>
  <div class="posts__main-view">
    <transition name="loading">
      <h4 v-if="networkBusy" class="posts__loading-indicator">
        Loading ...
      </h4>
    </transition>
    <h4 v-if="networkError" class="posts__network-error">
      Network error, please try again later.
    </h4>
    <div
      class="posts__layout"
      :class="{ 'is-on-preview': pageName === 'post' }"
    >
      <div class="posts__layout-col">
        <PostsList />
      </div>
      <div class="posts__layout-col">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PostsList from '@/components/PostsList';

export default {
  components: { PostsList },
  created() {
    this.$store.dispatch('getPosts');
  },
  computed: {
    ...mapState(['posts', 'networkBusy', 'networkError']),
    pageName() {
      return this.$route.name;
    }
  }
};
</script>

<style lang="scss" scoped>
.posts__main-view {
  height: 100vh;
}

@media screen and (max-width: 600px) {
  .posts__main-view {
    overflow-x: hidden;
  }

  .posts__layout {
    width: 200vw;
    transition: transform 0.5s ease-in-out;
    &.is-on-preview {
      transform: translateX(-100vw);
    }
  }
}

.posts__loading-indicator {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  padding: 0.5em;
  margin: 0;
  background-color: darkorange;
  color: white;
  text-align: center;
  opacity: 1;
  transition: opacity 0.5s;
}

.loading-enter,
.loading-leave-to {
  opacity: 0;
}

.loading-enter-active,
.loading-leave-active {
  transition: opacity 1s;
}

.posts__network-error {
  color: red;
}

.posts__layout {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.posts__layout-col {
  flex: 0 0 50%;
  max-height: 100%;
  overflow-y: scroll;
}
</style>
