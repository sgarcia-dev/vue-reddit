<template>
  <div class="posts__main-view">
    <h4 v-if="networkBusy" class="posts__loading-indicator">Loading ...</h4>
    <h4 v-if="networkError" class="posts__network-error">
      Network error, please try again later.
    </h4>
    <div class="posts__layout">
      <div class="posts__layout-col">
        <PostsList :posts="posts" />
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
    ...mapState(['posts', 'networkBusy', 'networkError'])
  }
};
</script>

<style lang="scss" scoped>
.posts__main-view {
  height: 100vh;
}

.posts__loading-indicator {
  animation: 0.2s linear 0s infinite alternate fade-in-out;
}

@keyframes fade-in-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.5;
  }
}

.posts__network-error {
  color: red;
}

.posts__layout {
  display: flex;
  flex-direction: row;
}

.posts__layout-col {
  flex: 0 0 50%;
}
</style>
