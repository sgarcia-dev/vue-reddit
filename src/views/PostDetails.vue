<template>
  <div v-if="post" class="post__details-view">
    <a class="mobile-only" href="#" @click.prevent="backToHome">Back to Home</a>
    <h1>{{ post.title }}</h1>
    <img
      v-if="isImage"
      class="post__media-preview"
      :src="post.url"
      :alt="post.title"
    />
    <img
      v-if="isGfycat"
      class="post__media-preview"
      :src="post.media.oembed.thumbnail_url"
      :alt="post.title"
    />
    <video
      v-if="isRedditVideo"
      :src="post.media.reddit_video.fallback_url"
      class="post__media-preview"
      controls
      autoplay
    ></video>
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
    },
    isImage() {
      return ['jpg', 'gif', 'png', 'jpeg'].some(format =>
        this.post.url.includes(format)
      );
    },
    isRedditVideo() {
      const { media = {} } = this.post;
      return media && media.reddit_video;
    },
    isGfycat() {
      const { media } = this.post;
      return media && media.type === 'gfycat.com';
    }
  },
  methods: {
    backToHome() {
      this.$router.push('/');
    }
  }
};
</script>

<style lang="scss" scoped>
.post__details-view {
  padding: 1em;
}
.post__media-preview {
  max-width: 100%;
}

@media screen and (min-width: 768px) {
  .mobile-only {
    display: none;
  }
}
</style>
