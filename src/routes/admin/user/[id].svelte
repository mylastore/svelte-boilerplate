<script context="module">
  let token
  export async function preload(page, session) {
    if (session.user.role !== 'admin') {
      this.redirect(302, `/`)
    }
    token = session.token
  }
</script>

<script>
  import {api} from "@lib/api"
  import Message from "../../../components/Message.svelte"
  import {onMount} from 'svelte'
  import timeAgo from '@lib/timeAgo'
  import {stores} from '@sapper/app'
  const {session, page} = stores()

  let userId
  let userEmail = ""
  let userAvatar = ""
  let userName = ""
  let name = ""
  let userRole = ""
  let userWebsite = ""
  let userLocation = ""
  let userGender = ""
  let memberSince
  let isLoading = true
  let message
  let messageType

  async function getUser() {
    try {
      const res = await api('GET', `admin/user/${$page.params.id}`,  {}, token)
      if (res.status >= 400) {
        isLoading = false
        messageType = 'warning'
        throw new Error(res.message)
      }
      isLoading = false
      userEmail = res.email
      userAvatar = res.avatar
      userRole = res.role
      name = res.name
      userName = res.username
      userWebsite = res.website
      userLocation = res.location
      userGender = res.gender

      memberSince = timeAgo(res.createdAt)

    } catch (err) {
      messageType = 'warning'
      isLoading = false;
      return message = err.message;
    }
  }

  onMount(() => {
    getUser();
  })

  function closeMessage() {
    message = null;
  }

</script>

<section class="section">
  {#if message}
    <Message
        message={message}
        on:closeMessageEvent={closeMessage}
        messageType={messageType}/>
  {/if}

  <div class="card profile">
    <div class="card-header">
      <h1 class="card-header-title">User Profile Info</h1>
      <div class="card-header-icon">:::</div>
    </div>
    <div class="card-content">
      {#if name}<p><b>Name: </b> <span>{name}</span></p>{/if}
      <p><b>Email: </b> <span>{userEmail}</span></p>
      {#if userGender}<p><b>Gender: </b> <span>{userGender}</span></p>{/if}
      {#if userLocation}<p><b>Location: </b> <span>{userLocation}</span></p>{/if}
      <p><b>Role: </b> <span class="capitalize">{userRole}</span></p>
      {#if userWebsite}<p><b>Website: </b> <span>{userWebsite}</span></p>{/if}
      <br>
      <img class="center" src={userAvatar} alt="user image"/>
      <div class="has-text-centered">@{userName}</div>
      <div class="has-text-centered">Member Since: {memberSince}</div>
    </div>
  </div>
</section>

<style>
  .capitalize {
    text-transform: capitalize;
  }

  .center {
    margin: 20px auto;
    display: block;
  }

  .card-content p {
    clear: both;
  }

  .card-content b {
    text-align: left;
    float: left;
  }

  .card-content span {
    text-align: left;
    float: right;
  }

  .profile {
    width: 100%;
    max-width: 360px;
    margin: auto;
  }
</style>
