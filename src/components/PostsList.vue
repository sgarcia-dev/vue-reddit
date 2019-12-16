<template>
  <ul class="posts-list__container">
    <div v-for="post in postsOnPage" :key="post.id" class="post__container">
      <div class="post__thumbnail" v-if="post.thumbnail !== 'default'">
        <img :src="post.thumbnail" alt="" />
      </div>
      <div class="post__preview">
        <h5 class="post__title" :class="{ read: isRead(post.id) }">
          <router-link :to="`/${post.id}`" @click.native="markAsRead(post.id)">
            {{ post.title }}
            <span class="post__author">| By {{ post.author }}</span>
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
        <a href="#" @click.prevent="dismissPost(post.id)">Dismiss</a>
      </div>
    </div>
  </ul>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState(['posts', 'readPosts']),
    ...mapGetters(['postsOnPage'])
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
  },
  methods: {
    isRead(id) {
      return this.readPosts.includes(id);
    },
    markAsRead(id) {
      this.$store.commit('SET_POST_AS_READ', { id });
    },
    dismissPost(id) {
      this.$store.commit('SET_POST_AS_DISMISSED', { id });
    }
  }
};
</script>

<style lang="scss" scoped>
.posts-list__container {
  list-style: none;
  padding: 1em;
  margin: 0;
}

.post__container {
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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

.post__thumbnail {
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 1em;
  & > img {
    width: 80px;
    height: 80px;
  }
}

.post__preview {
  flex: 1 1 0;
}

.post__title,
.post__author {
  margin: 0;
  display: inline-block;
}

.post__title.read a {
  color: gray;
}

.post__author {
  color: #616161;
  margin-left: 0.5em;
}
</style>
