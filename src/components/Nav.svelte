<script>
  import fetch from "isomorphic-fetch";
  import {onMount} from 'svelte'
  import {stores} from '@sapper/app'
  const {session} = stores()

  export let segment

  let isActive = false
  let message
  let messageType
  let links = []

  const companyName = process.env.APP_NAME

  function toggleNav() {
    isActive = !isActive
  }

  async function logOut() {
    const res = await fetch("/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    })
    if (res) {
      $session.user = null
    }
  }

  onMount(() => {
    document.querySelectorAll('.navbar-item')
      .forEach(link => link.addEventListener('click', () => {
        toggleNav()
      }))
  })

</script>

<nav class="navbar is-info is-mobile" role="navigation" aria-label="main navigation">
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
              {$session.user.username}
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
