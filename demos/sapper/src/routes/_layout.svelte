<script>
	import Nav from '../components/Nav.svelte';
	import { afterUpdate , beforeUpdate} from "svelte";
	// import {useAckeeSapper} from './../ackee.js';
	import {useAckeeSapper} from 'svelte-ackee';

	export let segment;

	useAckeeSapper(beforeUpdate,afterUpdate, {
		server: 'https://example.com',
		domainId: 'hd11f820-68a1-11e6-8047-79c0c2d9bce0'
	}, {
		ignoreLocalhost: false
	})
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>