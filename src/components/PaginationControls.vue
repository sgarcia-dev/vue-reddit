<template>
  <div class="pagination__controls">
    <div class="pagination__prev" v-if="canGoBack">
      <a href="#" @click.prevent="prevPage()">Prev</a>
    </div>
    <div class="pagination__info">
      {{ this.pageNumber }} of {{ this.pageTotal }}
    </div>
    <div class="pagination__next" v-if="canGoNext">
      <a href="#" @click.prevent="nextPage()">Next</a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex';

export default {
  created() {
    const currentPage = parseInt(this.$route.query.page);
    if (currentPage && parseInt(this.pageNumber) !== currentPage) {
      this.setPageNumber(currentPage);
    }
  },
  computed: {
    ...mapState(['pageNumber']),
    ...mapGetters(['pagedPosts']),
    pageTotal() {
      return this.pagedPosts.length;
    },
    canGoBack() {
      return this.pageNumber > 1;
    },
    canGoNext() {
      return this.pageNumber < this.pageTotal;
    }
  },
  methods: {
    ...mapMutations({
      setPageNumber: 'SET_PAGE_NUMBER'
    }),
    prevPage() {
      const newPage = this.pageNumber - 1;
      this.setPageNumber({ page: newPage });
      this.$router.push({ path: '/', query: { page: newPage } });
      window.scrollTo(0, 0);
    },
    nextPage() {
      const newPage = this.pageNumber + 1;
      this.setPageNumber({ page: newPage });
      this.$router.push({ path: '/', query: { page: newPage } });
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination__controls {
  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.1);
  background-color: white;
  border-top: gray;
  color: black;
  width: 100%;
  padding: 1em;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>
