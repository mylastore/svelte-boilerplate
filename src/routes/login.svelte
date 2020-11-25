<script context="module">
  export async function preload(page, session) {
    if (session.user) {
      this.redirect(302, `/`)
    }
  }
</script>
<script>
  import Message from '../components/Message.svelte'
  import TextInput from '../components/ui/TextInput.svelte'
  import {validateEmail, validatePassword} from '@lib/validation.js'
  import {stores} from '@sapper/app'
  const {session} = stores()
  import fetch from "isomorphic-fetch"

  let email = "me@me.com"
  let password = "Password#1"
  let message
  let messageType
  let keyCode

  $: emailValid = validateEmail(email)
  $: passwordValid = validatePassword(password)
  $: formIsValid = emailValid && passwordValid

  async function submitForm() {
    try {
      const response = await fetch("/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const res = await response.json();

      if (res && res.status >= 400) {
        throw new Error(res.message)
      }
        $session.user = res
        message = null
       email = ''
       password = ''
      return window.location.href=`/profile/${res.username}`

    } catch (err) {
      messageType = 'warning'
      return  message = err.message
     }
  }

  function closeMessage() {
    message = null
  }

  function handleKeyDown(event) {
    event.stopPropagation()
    if (event.keyCode === 13) {
      submitForm()
    }
  }
</script>

<svelte:window on:keydown={handleKeyDown}/>

<svelte:head>
  <title>Login</title>
</svelte:head>

<section class="section">
  <div class="container">
    <div class="column is-8 is-offset-2">
      <article class="message is-info">
        <div class="message-header">
          <p>Test Users</p>
       </div>
        <div class="message-body">
          <h3><strong>Admin:</strong> me@me.com Password#1</h3>
          <h3><strong>Customer:</strong> me1@me.com Password#1</h3>
        </div>
      </article>


      <br>
      <div class="card la-card">
        <div class="card-content clearfixed">
          <h2 class="la-headline primary-color">HI, THERE</h2>
          <p class="is-centered">
            You can log in to your {process.env.APP_NAME} account here.
          </p>
          <div class="is-centered">
          </div>
          <div class="la-divider">
            <hr class="la-divider-left"/>
            <p class="la-divider-text"><i class="fas fa-shield-alt"></i></p>
            <hr class="ua-divider-right"/>
          </div>
          {#if message}
            <Message message={message} messageType={messageType} on:closeMessageEvent={closeMessage}/>
          {/if}
          <form>
              <TextInput
                id="email"
                label="Email"
                valid={emailValid}
                validityMessage="Please enter a valid email."
                value={email}
                className="is-large"
                on:input={event => (email = event.target.value)}/>
            <TextInput
                id="password"
                label="Password"
                type="password"
                valid={passwordValid}
                validityMessage="Please enter a valid password."
                value={password}
                className="is-large"
                on:input={event => (password = event.target.value)}/>
            <p class="help">Password minimum length 8, must have 1 capital letter, 1 number and 1 special
              character.</p>
          </form>
          <div class="clearfixed is-center">
            <a href="/forgot">Forgot Password?</a>
          </div>
          <button
              class="button is-success is-pulled-right"
              on:click|preventDefault={submitForm}
              disabled={!formIsValid}>
            Login
          </button>
        </div>
        <footer class="card-footer primary-bg">
          <a href="register" class="card-footer-item">
            Don't have an account?
          </a>
        </footer>
      </div>
    </div>
  </div>
</section>

<style>
  .fa-shield-alt {
    font-size: 2em !important;
    color: #f0f0f0f0
  }

  .is-center {
    text-align: center;
    display: block;
    margin: 20px 0;
  }

  button {
    padding-right: 60px;
    padding-left: 60px;
  }

  .card-footer {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .card-footer a {
    color: white;
  }

  .la-divider {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'Brandon Text', 'Asap', Verdana, Arial, sans-serif;
    color: #5c5c5c;
    font-weight: bold;
    width: 90%;
    margin: 0 auto;
  }

  .la-divider hr {
    flex-grow: 3;
    height: 2px;
    border: none;
    background-color: #f2f2f2;
  }

  .la-divider .la-divider-text {
    flex-grow: 1;
    text-align: center;
  }

  .is-centered {
    margin: 20px 0;
    text-align: center;
  }

  .la-google-btn {
    border: 2px solid #e6e7f0;
    line-height: 1;
  }

  .la-google-btn span {
    margin-right: 30px;
  }

  .la-card {
    border-radius: 4px;
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.16);
  }

  .la-headline {
    font-weight: bold;
    text-align: center;
    font-size: 30px;
    margin-bottom: 10px;
    text-transform: uppercase;
  }

  .clearfixed:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: ' ';
    clear: both;
    height: 0;
  }
</style>
