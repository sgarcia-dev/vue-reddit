<template>
  <ul class="posts__list-container">
    <div v-for="post in posts" :key="post.id">
      {{ post.title }}
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

<style lang="scss" scoped></style>
