// main.js
import App from './App.svelte';
import { Router, Route } from 'svelte-routing';
import AddCourse from './components/AddCourse.svelte';

const app = new App({
  target: document.body,
  props: {},
});

new Router({
  target: document.body,
  routes: [
    {
      path: '/',
      component: app,
    },
    {
      path: '/add-course',
      component: AddCourse,
    },
  ],
});
