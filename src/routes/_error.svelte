<script>
	export let status
	export let error

	const dev = process.env.NODE_ENV === 'development'
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<section class="hero is-fullheight bg">
	<div class="hero-body">
		<div class="container has-text-centered">
			<div class="error-page">
				<h1 class="title is-size-1">{status}</h1>
				<img src="/img/404.gif" alt="Not Found"/>
				<p class="subtitle">{error.message}</p>
			</div>
			{#if dev && error.stack}
				<pre>{error.stack}</pre>
			{/if}
		</div>
	</div>
</section>

<style>
	.bg{
		background: #FCFEFC;
	}
</style>
