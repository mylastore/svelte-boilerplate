<script>
  import TextInput from "../components/ui/TextInput.svelte";
  import {validateRequired, validateEmail} from "@lib/validation";
  import * as api from "api";
  import Message from "../components/Message.svelte";

  let name = ""
  let email = ""
  let site = ""
  let tel = ""
  let msg = ""
  let message
  let messageType

  $: nameValid = !validateRequired(name)
  $: emailValid = validateEmail(email);
  $: companyValid = !validateRequired(site)
  $: contentValid = !validateRequired(msg)
  $: formIsValid = nameValid && companyValid && emailValid && contentValid

  async function submitQuote() {
    try {
      const userData = {
        name: name,
        email: email,
        msg: msg,
        site: site,
        tel: tel
      };
      const res = await api.user.submitQuote(userData)
      if (res) {
        messageType = "success";
        message = 'Your quote was sent successfully!';
        return document.getElementById("my-form").reset();
      }
    } catch (err) {
      messageType = 'warning'
      return message = err.message
    }
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      submitQuote();
    }
  }

  function closeMessage() {
    message = null;
  }

</script>

<svelte:window on:keydown={handleKeyDown}/>

<svelte:head>
  <title>Get Quote</title>
  <meta name="robots" content="noindex, nofollow">
</svelte:head>

<section class="section">
  <div class="container">
    <div class="columns is-mobile">
      <div class="column is-10 is-offset-1">
        <div class="card">
          <div class="card-content is-clearfix">
            <h1 class="lg">Tell us about your project</h1>
            <form id="my-form">
              <TextInput
                  id="name"
                  label="Name *"
                  valid={nameValid}
                  validityMessage="Please enter a valid name."
                  value={name}
                  className="is-large"
                  on:input={e => (name = e.target.value)}/>
              <TextInput
                  id="email"
                  label="Email *"
                  valid={emailValid}
                  validityMessage="Please enter a valid email."
                  value={email}
                  className="is-large"
                  on:input={e => (email = e.target.value)}/>
              <TextInput
                  id="company"
                  label="Company Name *"
                  type="text"
                  valid={companyValid}
                  validityMessage="Please enter a valid company name."
                  value={site}
                  className="is-large"
                  on:input={e => (site = e.target.value)}/>
              <TextInput
                  id="phone"
                  label="Phone Number(optional)"
                  type="text"
                  className="is-large"
                  value={tel}
                  on:input={e => (tel = e.target.value)}/>

              <TextInput
                  id="content"
                  label="Message *"
                  controlType="textarea"
                  valid={contentValid}
                  validityMessage="Message is required"
                  className="is-large"
                  bind:value={msg}
              />
              {#if message}
                <Message message={message} messageType={messageType}
                         on:closeMessageEvent={closeMessage}/>
              {/if}

              <button
                  class="button is-primary is-pulled-right"
                  on:click|preventDefault={submitQuote}
                  disabled={!formIsValid}>
                Submit Quote
              </button>

            </form>
            <p>
              Generally, we are able to respond to inquiries within same business day.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .lg {
    font-size: 2em;
    margin-bottom: .3em;
  }
</style>
