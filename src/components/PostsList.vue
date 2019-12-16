<template>
  <ul class="posts__list-container">
    <div v-for="post in posts" :key="post.id">
      <router-link :to="`/${post.id}`">
        <h3>{{ post.title }}</h3>
      </router-link>
    </div>
  </ul>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
.posts__list-container {
  list-style: none;
  padding-left: 0;
}
</style>
