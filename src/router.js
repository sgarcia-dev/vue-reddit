import Vue from 'vue';
import VueRouter from 'vue-router';
import About from '@/views/About.vue';
import Posts from '@/views/Posts.vue';
import PostDetails from '@/views/PostDetails.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/',
    name: 'home',
    component: Posts,
    children: [
      {
        path: ':id',
        name: 'post',
        component: PostDetails
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
