<script>
  import jwt_decode from 'jwt-decode'
  import {api} from '@lib/api'
  import {goto, stores} from '@sapper/app'
  import Message from "../../../components/Message.svelte"

  const {page} = stores();
  let {token} = $page.params
  let email = ''
  let message
  let messageType = 'warning'

  if (token) {
    const decoded = jwt_decode(token)
    email = decoded.email
  }

  const activateAccount = async () => {
    try {
      const res = await api('POST', 'user/register', {token})
      if (res.status >= 400) {
        return message = res.message
      }
      messageType = 'success'
      return message = res.message
    } catch (err) {
      messageType = 'warning'
      return message = err.message
    }
  }

  function closeMessage() {
    message = null
    return goto('login')
  }
</script>

<section class="section">
  <div class="container">
    <div class="column is-8 is-offset-2">
    {#if !message}
      <div class="content">
        <h4>Activate account for {email}</h4>
      </div>
    <hr/>
    <button class="button is-primary is-large" on:click="{activateAccount}">Activate Account</button>
      {:else}
      <Message message={message} messageType={messageType} on:closeMessageEvent={closeMessage}/>
    {/if}
    </div>
  </div>
</section>