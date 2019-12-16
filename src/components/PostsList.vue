<template>
  <ul class="posts__list-container">
    <div v-for="post in posts" :key="post.id" class="posts__post-container">
      <div class="posts__post-thumbnail" v-if="post.thumbnail !== 'default'">
        <img :src="post.thumbnail" alt="" />
      </div>
      <div class="posts__post-preview">
        <h5 class="posts__post-title">
          <router-link :to="`/${post.id}`">
            {{ post.title }}
            <span class="posts__post-author">| By {{ post.author }}</span>
          </router-link>
        </h5>
        <h5>
          Created at {{ post.created_utc | toDateString }} |
          {{ post.created_utc | toHoursAgo }}
        </h5>
        <h5>
          {{ post.num_comments }} Comments | Score
          {{ post.score | toSimplifiedScore }}
        </h5>
      </div>
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
  },
  filters: {
    toDateString(value) {
      const d = new Date(value * 1000);
      return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
    },
    toHoursAgo(value) {
      const d = new Date(value * 1000);
      const now = new Date();
      const hours = Math.floor(Math.abs(d - now) / 36e5);
      return hours > 1 ? `${hours} hours ago` : `${hours} hour ago`;
    },
    toSimplifiedScore(value) {
      return value > 1000 ? Math.floor(value / 1000) + 'K' : value;
    }
  }
};
</script>

<style lang="scss" scoped>
.posts__list-container {
  list-style: none;
  padding: 1em;
  margin-top: 0;
  max-height: 100vh;
  overflow-y: scroll;
  box-sizing: border-box;
  margin-bottom: 0;
}

.posts__post-container {
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.posts__post-container {
  background: #fff;
  border-radius: 2px;
  position: relative;
  padding: 1em;
  margin-bottom: 1em;
  transition: box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12),
    0 2px 1px -1px rgba(0, 0, 0, 0.09), 0 1px 3px 0 rgba(0, 0, 0, 0.15);

  &:hover {
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.12),
      0 1px 10px 0 rgba(0, 0, 0, 0.09), 0 2px 4px -1px rgba(0, 0, 0, 0.15);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
    margin-bottom: 0.5em;
  }
}

.posts__post-thumbnail {
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 1em;
  & > img {
    width: 80px;
    height: 80px;
  }
}

.posts__post-preview {
  flex: 1 1 0;
}

.posts__post-title,
.posts__post-author {
  margin: 0;
  display: inline-block;
}

.posts__post-author {
  color: #616161;
  margin-left: 0.5em;
}
</style>
