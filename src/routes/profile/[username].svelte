<script>
  import timeAgo from '@lib/timeAgo'
  import Message from '../../components/Message.svelte'
  import {api} from '@lib/api'
  import { validateEmail, validatePassword } from '@lib/validation'
  import TextInput from '../../components/ui/TextInput.svelte'
  import LoadingSpinner from '../../components/ui/LoadingSpinner.svelte'
  import {onMount} from 'svelte'
  import {goto} from '@sapper/app'
  import {getCookie, logout} from '@lib/auth'

  let role = ''
  let _id
  let avatar = ''
  let email = ''
  let name = ''
  let username = ''
  let location = ''
  let website = ''
  let gender = ''
  let password = ''
  let passwordConfirmation = ''
  let about = ''
  let createdAt

  let unsubscribe
  let message
  let messageType = 'warning'
  let isLoading = true;

  onMount(()=>{
    (async () => {
      try {
        const res = await api('POST', 'user/account', {}, getCookie('token'))
        if (res) {
          isLoading = false
          username = res.username
          email = res.email
          name = res.name
          gender = res.gender
          website = res.website
          location = res.location
          role = res.role
          avatar = res.avatar
          about = res.about
          createdAt = timeAgo(res.createdAt)
          _id = res._id
        }
      } catch (err) {
        isLoading = false
        messageType = 'warning'
        return message = err.message
      }
    })()
  })

  $: emailValid = validateEmail(email)
  $: formIsValid = emailValid

  $: passwordValid = validatePassword(password)
  $: passwordConfirmValid = password === passwordConfirmation
  $: passwordFormIsValid = passwordValid && passwordConfirmValid

  async function updateUser() {
    try {
      isLoading = true
      const userObject = {
        name,
        website,
        location,
        gender,
        _id,
        username,
        about,
      }
      const res = await api('PATCH', `user/account/${username}`, userObject, getCookie('token'))
      if (res) {
        messageType = 'success'
        message = 'User profile was updated successfully!'
        isLoading = false
        return window.scrollTo(0, 0)
      }

    } catch (err) {
      isLoading = false
      messageType = 'warning'
      return message = err.message
    }
  }

  async function deleteUser() {
    const result = confirm(
      'Are you sure you want to delete your account?',
    )
    if (result) {
      try {
        isLoading = true
        const res = await api('POST', 'user/delete', {_id: _id}, getCookie('token'))
        window.scrollTo(0, 0)
        messageType = 'success'
        message = res
        return setTimeout(async function () {
          const res = await api('POST', 'user/logout', {})
          if (res) {
            isLoading = false
            logout()
            return goto(`/`)
          }
        }, 1500)
      } catch (err) {
        isLoading = false
        messageType = 'warning'
        return message = err.message
      }
    }
  }

  async function updatePassword() {
    try {
      const passwordForm = document.getElementById('password-reset-form')
      const userObject = {
        _id: _id,
        password: password
      }
      const res = await api.user.passwordUpdate(userObject, getCookie('token'))
      window.scrollTo(0, 0)
      passwordForm.reset()
      messageType = 'success'
      return message = res
    } catch (err) {
      isLoading = 'false'
      messageType = 'warning'
      return message = err
    }
  }

  function closeMessage() {
    message = null
  }

</script>


<svelte:head>
  <title>Profile Page</title>
  <meta name="robots" content="noindex, nofollow"/>
</svelte:head>

{#if isLoading}
  <LoadingSpinner/>
{/if}

<section class="section">
  <div class="container">
    {#if message}
      <Message {message} {messageType} on:closeMessageEvent={closeMessage}/>
    {/if}
    {#if getCookie('token')}
      <div class="columns">
        <div class="column is-half">
          <div class="card profile is-clearfix">
            <header class="card-header">
              <div class="card-header-title">Profile Information</div>
              <div class="card-header-icon">:::</div>
            </header>
            <div class="card-image">
              <figure class="image is-4by3">
                {#if avatar}
                  <img
                      class="default-img"
                      src={avatar}
                      alt="User Image"/>
                {:else}
                  <img
                      class="default-img"
                      src='img/default-image.jpg'
                      alt="User Image"/>
                {/if}
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  {#if name}
                    <p class="is-4">
                      <strong>Name:</strong>
                      {name}
                    </p>
                  {/if}
                  <p class="is-6">
                    <strong>Email:</strong>
                    {email}
                  </p>
                  {#if website}
                    <p class="is-4">
                      <strong>Website:</strong>
                      {website}
                    </p>
                  {/if}
                  {#if location}
                    <p class="is-4">
                      <strong>Location:</strong>
                      {location}
                    </p>
                  {/if}
                  {#if gender}
                    <p class="is-4">
                      <strong>Gender:</strong>
                      {gender}
                    </p>
                  {/if}
                  <div class="member-since">
                    <strong>Member Since:</strong>
                    <time>{createdAt}</time>
                    <br/>
                    <strong>Role:</strong>
                    <span class="capitalize">{role}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-half">
          <div class="content center-form">

            <form class="card edit-user-form">
              <TextInput
                  id="username"
                  label="Username"
                  value={username}
                  on:input={event => (username = event.target.value)}/>
              <TextInput
                  id="name"
                  label="Name"
                  value={name}
                  on:input={event => (name = event.target.value)}/>
              <div class="field">
                <label for="email">Email</label>
                <input class="input" id="email" type="email" value="{email}" disabled>
                <p class="help">Email can not be updated.</p>
              </div>

              <TextInput
                  id="email"
                  label="Email"
                  valid={emailValid}
                  validityMessage="Please enter a valid email."
                  value={email}
                  on:input={event => (email = event.target.value)}/>
              <TextInput
                  id="about"
                  label="About"
                  value={about}
                  on:input={event => (about = event.target.value)}/>
              <TextInput
                  id="website"
                  label="Website"
                  value={website}
                  on:input={event => (website = event.target.value)}/>
              <TextInput
                  id="location"
                  label="Location"
                  value={location}
                  on:input={event => (location = event.target.value)}/>

              <div class="field is-horizontal">
                <div class="field-label">
                  <label class="label">Gender</label>
                </div>
                <div class="field-body">
                  <div class="field is-narrow">
                    <div class="control">
                      <label class="radio">
                        <input
                            type="radio"
                            bind:group={gender}
                            value="Male"/>
                        Male
                      </label>
                      <label class="radio">
                        <input
                            type="radio"
                            bind:group={gender}
                            value="Female"/>
                        Female
                      </label>
                      <label class="radio">
                        <input
                            type="radio"
                            bind:group={gender}
                            value="Other"/>
                        Other
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <button
                  class="button is-pulled-right is-primary"
                  on:click|preventDefault={updateUser}
                  disabled={!formIsValid}>
                Save
              </button>
            </form>

            <form class="card" id="password-reset-form">
              <TextInput
                  id="password"
                  label="Password"
                  type="password"
                  valid={passwordValid}
                  validityMessage="Please enter a valid password."
                  value={password}
                  on:input={event => (password = event.target.value)}/>
              <TextInput
                  id="passwordConfirmation"
                  label="Password Confirmation"
                  type="password"
                  valid={passwordConfirmValid}
                  validityMessage="Passwords did not match"
                  value={passwordConfirmation}
                  on:input={event => (passwordConfirmation = event.target.value)}/>
              <p class="help">Password minimum characters length 8, must have 1 capital letter, 1 number and 1 special
                character.</p>
              <button
                  class="button is-pulled-right is-primary"
                  on:click|preventDefault={updatePassword}
                  disabled={!passwordFormIsValid}>
                Update Password
              </button>
            </form>

            <form>
              <div class="control is-clearfix">
                <button
                    class="button is-danger is-pulled-right"
                    on:click|preventDefault={deleteUser}>
                  Delete Account
                </button>
              </div>
              <br/>
              <p class="help is-pulled-right">
              <span class="tag is-warning">
                Warning! Deleting your account is irreversible.
              </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
    .capitalize {
        text-transform: capitalize;
    }

    .card .field-label {
        flex-grow: 0;
        flex-shrink: 0;
        margin-right: 1rem;
        text-align: left;
    }

    .member-since {
        color: gray;
        font-size: 12px;
        margin-top: 2em;
    }

    .member-since strong {
        color: gray;
    }

    .center-form {
        max-width: 600px;
    }

    .center-form form {
        padding: 2em 2em 5em 2em;
    }

    .profile {
        max-width: 360px;
        width: 360px;
        margin: auto;
    }

    img.default-img {
        width: 150px;
        height: 150px;
        margin: auto;
    }

    .edit-user-form {
        margin-bottom: 60px;
    }
</style>
