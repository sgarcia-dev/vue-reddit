<template>
  <div v-if="post">
    <h1>Details of {{ $route.params.id }}</h1>
    <h4>Post Title: {{ post.title }}</h4>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['posts']),
    routeId() {
      return this.$route.params.id;
    },
    post() {
      const posts = this.posts || [];
      return posts.find(post => {
        return post.id === this.routeId;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
