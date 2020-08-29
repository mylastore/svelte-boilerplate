<script>
    import Nav from '../components/Nav.svelte'
    import Footer from '../components/Footer.svelte'
    import LoadingBar from '../components/LoadingBar.svelte'

    export let segment;

</script>

<div class="site">
    <LoadingBar/>

    <Nav {segment}/>

    <main class="site-content">
        <slot></slot>
    </main>

    <Footer/>
</div>
