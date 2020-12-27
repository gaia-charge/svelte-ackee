import HMR from '@roxi/routify/hmr'
import App from './App.svelte';

let segment = window.location.pathname;

const app = HMR(App, { target: document.body, props:{segment} }, 'routify-app')

export default app;