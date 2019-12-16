import Vue from 'vue';
import Vuex from 'vuex';
import redditService from '@/services/Reddit.js';
import { get, set } from '@/services/LocalStorage.js';

Vue.use(Vuex);

export const SET_POSTS = 'SET_POSTS';
export const SET_NETWORK_STATE = 'SET_NETWORK_STATE';
export const SET_NETWORK_ERROR = 'SET_NETWORK_ERROR';
export const SET_POST_AS_READ = 'SET_POST_AS_READ';
export const SET_POST_AS_DISMISSED = 'SET_POST_AS_DISMISSED';
export const SET_PAGE_NUMBER = 'SET_PAGE_NUMBER';

const VUEX_CACHE_NAME = 'VUE_REDDIT_CACHE';
const cache = set.bind(this, VUEX_CACHE_NAME);
const cachedState = get(VUEX_CACHE_NAME) || {};

let initialState = {
  posts: cachedState.posts || [],
  readPosts: cachedState.readPosts || [],
  dismissedPosts: cachedState.dismissedPosts || [],
  networkBusy: false,
  networkError: null,
  pageSize: 10,
  pageNumber: cachedState.pageNumber || 1
};

export default new Vuex.Store({
  state: initialState,
  getters: {
    visiblePosts: state => {
      return state.posts.filter(({ id }) => {
        return state.dismissedPosts.indexOf(id) === -1;
      });
    },
    pagedPosts: (state, getters) => {
      const pagedPosts = [];
      getters.visiblePosts.forEach((post, i) => {
        if (i % state.pageSize === 0) pagedPosts.push([]);
        pagedPosts[pagedPosts.length - 1].push(post);
      });
      return pagedPosts;
    },
    postsOnPage: (state, getters) => {
      return getters.pagedPosts[state.pageNumber - 1];
    }
  },
  mutations: {
    [SET_POSTS](state, { posts }) {
      Vue.set(state, 'posts', posts);
      cache(state);
    },
    [SET_NETWORK_ERROR](state, { message }) {
      Vue.set(state, 'networkError', message);
    },
    [SET_NETWORK_STATE](state, { isBusy }) {
      Vue.set(state, 'networkBusy', isBusy);
    },
    [SET_POST_AS_READ](state, { id }) {
      if (!state.readPosts.includes(id)) {
        state.readPosts.push(id);
        cache(state);
      }
    },
    [SET_POST_AS_DISMISSED](state, { id }) {
      if (!state.dismissedPosts.includes(id)) {
        state.dismissedPosts.push(id);
        cache(state);
      }
    },
    [SET_PAGE_NUMBER](state, { page }) {
      Vue.set(state, 'pageNumber', page);
      cache(state);
    }
  },
  actions: {
    async getPosts({ commit }) {
      commit(SET_NETWORK_STATE, { isBusy: true });
      commit(SET_NETWORK_ERROR, { message: '' });
      try {
        const posts = await redditService.getTopPosts();
        commit(SET_POSTS, { posts });
      } catch (err) {
        const { message } = err;
        commit(SET_NETWORK_ERROR, { message });
      } finally {
        commit(SET_NETWORK_STATE, { isBusy: false });
      }
    }
  },
  modules: {}
});
