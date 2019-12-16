<template>
  <div>
    <h1>Posts View</h1>
    <h4 v-if="networkBusy" class="posts__loading-indicator">Loading ...</h4>
    <h4 v-if="networkError" class="posts__network-error">
      Network error, please try again later.
    </h4>
    <PostsList :posts="posts" />
    <router-view />
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
</style>
