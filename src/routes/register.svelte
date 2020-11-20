<script context="module">
  export async function preload(page, session) {
    if (session.user) {
      this.redirect(302, `/`)
    }
  }
</script>
<script>
  import {goto, stores} from '@sapper/app'
  import axios from 'axios'
  import Message from '../components/Message.svelte'
  import TextInput from '../components/ui/TextInput.svelte'
  import {validateRequired, validateEmail, validatePassword} from '@lib/validation.js'

  const {session} = stores()

  let user = {email: '', password: ''}
  let passwordConfirmation = ''
  let message
  let messageType

  $: emailValid = validateEmail(user.email)
  $: passwordValid = validatePassword(user.password)
  $: passwordConfirmValid = user.password === passwordConfirmation
  $: formIsValid = emailValid && passwordValid && passwordConfirmValid

  async function submitForm() {
    try {
      const response = await axios.post('/user/register', user)
      $session.user = response.data
      message = null
      user = {username: '', password: ''}
      goto('/profile')

    } catch (err) {
      messageType = 'warning'
      if(err.response.status === 503){
        return message = 'Network Connection Error, Please try again later.'
      }
      return  message = err.response.data.message
    }
  }

  function handleKeyDown(event) {
    if (formIsValid && event.keyCode === 13) {
      submitForm()
    }
  }

  function closeMessage() {
    message = null
  }
</script>

<svelte:window on:keydown={handleKeyDown}/>

<svelte:head>
  <title>Register</title>
</svelte:head>

<section class="section">
  <div class="container">
    <div class="column is-8 is-offset-2">
      <div class="card la-card">
        <div class="card-content clearfix">
          <h2 class="la-headline primary-color">REGISTER</h2>
          <p class="is-centered">We're happy you're here!</p>
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
                value={user.email}
                className="is-large"
                on:input={event => (user.email = event.target.value)}/>
            <TextInput
                id="password"
                label="Password"
                type="password"
                valid={passwordValid}
                validityMessage="Please enter a valid password."
                value={user.password}
                className="is-large"
                on:input={event => (user.password = event.target.value)}/>
            <TextInput
                id="passwordConfirmation"
                label="Password Confirmation"
                type="password"
                valid={passwordConfirmValid}
                validityMessage="Passwords did not match"
                value={passwordConfirmation}
                className="is-large"
                on:input={event => (passwordConfirmation = event.target.value)}/>
            <p class="help">Password minimum length 8, must have 1 capital letter, 1 number and 1 special character.</p>
            <button
                class="button is-success is-pulled-right"
                on:click|preventDefault={submitForm}
                disabled={!formIsValid}>
              Register
            </button>
          </form>
        </div>
        <footer class="card-footer primary-bg">
          <a href="login" class="card-footer-item">Already have an account?</a>
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

  .card-footer {
    margin-top: 5px;
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

  .clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: ' ';
    clear: both;
    height: 0;
  }
</style>
