<script>
  import {validateRequired, validateEmail} from "@lib/validation";
  import TextInput from "../components/ui/TextInput.svelte";
  import Message from "../components/Message.svelte";
  import * as api from "api";

  let message;
  let email = "";
  let messageType = 'warning';

  $: emailValid = validateEmail(email);
  $: formIsValid = emailValid;

  async function submitForm() {
    const forgotForm = document.getElementById("forgot-form");
    try {
      const res = await api.user.forgotPassword({email: email});
      console.log('res ', res)
      if (res) {
        messageType = 'success';
        message = res.message;
        return forgotForm.reset();
      }
    } catch (err) {
      messageType = 'warning'
      message = err.message
    }
  }

  function closeMessage() {
    message = null;
  }
</script>

<svelte:head>
  <title>Forgot Password</title>
  <meta name="robots" content="noindex, nofollow">
</svelte:head>

<style>
  .la-divider {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: "Brandon Text", "Asap", Verdana, Arial, sans-serif;
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

  .la-card {
    border-radius: 4px;
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.16);
  }

  .la-headline {
    font-weight: bold;
    text-align: center;
    font-size: 30px;
    color: #00828c;
    margin-bottom: 10px;
    text-transform: uppercase;
  }

  .centered {
    margin: 20px 0;
    text-align: center;
  }
</style>

<section class="section">
  <div class="columns is-centered">
    <div class="column is-half">
      <form class="card la-card" id="forgot-form">
        <div class="card-content">
          <h2 class="la-headline">FORGOT PASSWORD</h2>
          <p class="centered">
            Enter your email address below and we'll send you password reset
            instructions.
          </p>
          <div class="la-divider">
            <hr class="la-divider-left"/>
            <p class="la-divider-text">&nbsp;</p>
            <hr class="ua-divider-right"/>
          </div>
          <TextInput
              id="email"
              label="Email"
              valid={emailValid}
              validityMessage="Please enter a valid email."
              value={email}
              className="is-large"
              on:input={event => (email = event.target.value)}/>
          {#if message}
            <Message message={message} messageType={messageType} on:closeMessageEvent={closeMessage}/>
          {/if}
          <div class="is-clearfix">
            <button
                class="button is-primary is-pulled-right"
                on:click|preventDefault={submitForm}
                disabled={!formIsValid}>
              Reset Password
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</section>
