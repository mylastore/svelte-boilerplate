<script context="module">
  export async function preload(page, session) {
    if (session.user.role !== 'admin') {
      this.redirect(302, `/`)
    }
  }
</script>

<script>
  import {goto, stores} from '@sapper/app'
  import * as api from "api";
  import Message from "./../../../components/Message.svelte";
  import {formatDate} from "@lib/utils";
  import {paginate, PaginationNav} from "./../../../components/paginate";
  import Tabs from './../../../components/Tabs.svelte'
  import {onDestroy} from 'svelte'
  import LoadingSpinner from './../../../components/ui/LoadingSpinner.svelte'

  const {session, page} = stores()

  let isLoading = true
  let memberSince
  let isAdmin
  let pageSize
  let totalItems
  let items = []
  let users = []
  let message
  let messageType = "warning"
  let currentPage
  let urlPage
  let unsubscribe
  let pageNumber = $page.params.p
  let serverError

  async function getAllUsers(pageNumber) {
    try {
      const res = await api.user.getUsers(pageNumber, {}, $session.user.token)
      isLoading = false
      pageSize = res.perPage
      items = res.users
      totalItems = res.totalItems
      return users = res.users

    } catch (err) {
      isLoading = false
      messageType = 'warning'
      return message = err.message
    }
  }

  if (typeof window !== "undefined" && typeof document !== "undefined") {
    unsubscribe = page.subscribe(({path}) => {
      urlPage = path.split('/').pop()
      currentPage = parseInt(urlPage)
      getAllUsers(urlPage)
    })
  }

  $: paginatedItem = paginate({items, pageSize, currentPage})

  function handleSetPage(e) {
    currentPage = e.detail.page
    goto(`/admin/users/${e.detail.page}`)
  }

  function closeMessage() {
    message = null;
  }

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe()
    }
  })

</script>

<svelte:head>
  <title>Admin Panel</title>
  <meta name="robots" content="noindex, nofollow"/>
</svelte:head>

<Tabs/>

{#if isLoading}
<LoadingSpinner />
{/if}

{#if serverError}
  <Message {message} {messageType} on:closeMessageEvent={closeMessage}/>
{/if}

<section class="section">
  <div class="container">
    {#if message}
      <Message {message} {messageType} on:closeMessageEvent={closeMessage}/>
    {/if}
    <div class="card">
      <header class="card-header">
        <div class="card-header-title">&nbsp;</div>
        <div class="card-header-icon">:::</div>
      </header>
      <div class="card-content">
          <div class="table-container">
            <table class="table is-fullwidth">
              <thead>
              <tr>
                <th>
                  <abbr title="Role">Role</abbr>
                </th>
                <th>
                  <abbr title="User Porfolio Image">Image</abbr>
                </th>
                <th>
                  <abbr title="Email">Email</abbr>
                </th>
                <th>
                  <abbr title="User Name">Name</abbr>
                </th>
                <th>
                  <abbr title="Gender">Gender</abbr>
                </th>
                <th>
                  <abbr title="Website">Website</abbr>
                </th>
                <th>
                  <abbr title="Location">Location</abbr>
                </th>
                <th>
                  <abbr title="Customer Since">Customer Since</abbr>
                </th>
                <th>
                  <abbr title="Action Button">Action</abbr>
                </th>
              </tr>
              </thead>
              <tbody>
              {#each users as user, i}
                <tr>
                  <td>{user.role}</td>
                  <td>
                    {#if user.avatar}
                      <img class="default-img" src={user.avatar} alt="User Image"/>
                    {:else}
                      <img class="default-img" src="img/default-image.jpg" alt="User Image"/>
                    {/if}
                  </td>
                  <td>
                    <span data-id={user._id}>{user.email}</span>
                  </td>
                  <td>{user.profile.name}</td>
                  <td>{user.profile.gender}</td>
                  <td>{user.profile.website}</td>
                  <td>{user.profile.location}</td>
                  <td>{formatDate(user.createdAt)}</td>
                  <td>
                    <a class="link" href="admin/user/{user._id}">
                      <i class="fas fa-link"></i>
                    </a>
                  </td>
                </tr>
              {/each}
              </tbody>
            </table>
          </div>
          <PaginationNav
              {totalItems}
              {pageSize}
              {currentPage}
              limit={1}
              showStepOptions={true}
              on:setPage="{(e) => handleSetPage(e) }"/>
      </div>
    </div>
  </div>
</section>

<style>
  li.active a {
    color: #00818b;
  }
  .default-img {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
  }
  .link {
    background: #fdac17;
    padding: 12px;
    float: right;
    color: white;
  }

  .link:hover {
    opacity: 0.9;
  }
</style>
