<svelte:head>
	<title>About</title>
</svelte:head>

<h1>About this site</h1>

<p>This is the 'about' page. There's not much here.</p>

<input bind:value />
<button on:click|preventDefault={handle}>Click</button>

<script>
let value;
function handle(){
	value = 'you clicked!'
}
</script>