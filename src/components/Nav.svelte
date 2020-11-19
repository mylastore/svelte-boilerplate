<script>
    import {goto, stores} from '@sapper/app'
    import axios from 'axios'
    import {onMount} from 'svelte'

    export let segment;

    let isActive = false
    let message
    let messageType
    let links = []

    const {session} = stores()
    const companyName = process.env.COMPANY_NAME

    function toggleNav() {
        isActive = !isActive
    }

    async function logOut() {
        await axios.post('/user/logout')
        $session.user = null
        goto(`/`)
    }

    onMount(()=>{
        document.querySelectorAll('.navbar-item')
            .forEach(link => link.addEventListener('click', ()=> {
                toggleNav()
            }))
    })

</script>

<nav class="navbar is-info" role="navigation" aria-label="main navigation">
    <div class="container">
        <div class="navbar-brand">
            <a class="navbar-item" href="/">
                {companyName}
            </a>
            <a role="button" class="navbar-burger burger {isActive ? 'is-active' : undefined}"
               on:click|stopPropagation|preventDefault={toggleNav} aria-label="menu" aria-expanded="false"
               data-target="navMenu">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div id="navMenu" class="navbar-menu {isActive ? 'is-active' : undefined}">
            <div class="navbar-start">
                <a class="navbar-item" class:is-active={segment === 'quote'} href="/quote">
                    Quote
                </a>
            </div>
            <div class="navbar-end">
                {#if $session.user}
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                            {#if $session.user.name}
                                {$session.user.name}
                            {:else}
                                {$session.user.email}
                            {/if}
                        </a>
                        <div class="navbar-dropdown is-right">
                            <a class="navbar-item" href="/profile/{$session.user.username}">
                                Profile
                            </a>
                            {#if $session.user.role === "admin"}
                            <a class="navbar-item" href="admin">
                                Admin
                            </a>
                            {/if}
                            <a href="/quote" class="navbar-item">
                                Contact Team LA
                            </a>
                            <hr class="navbar-divider">
                            <a class="navbar-item" on:click|preventDefault={logOut}>
                                Logout
                            </a>
                        </div>
                    </div>
                {:else}
                    <div class="navbar-item">
                        <div class="buttons">
                            <a href="/register" class="button is-success">
                                <strong>Register</strong>
                            </a>
                            <a href="/login" class="button is-light">
                                Login
                            </a>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>

</nav>
