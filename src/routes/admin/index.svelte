<script context="module">
  export async function preload(page, session) {
    if (!session.user || session.user.role !== 'admin') {
      this.redirect(302, `/`)
    }
  }
</script>

<script>
  import {stores} from '@sapper/app'
  import Tabs from '../../components/Tabs.svelte'
  import * as api from 'api'
  import LoadingSpinner from "../../components/ui/LoadingSpinner.svelte";
  import Message from '../../components/Message.svelte'

  const {session} = stores()

  let isLoading = true
  let user
  let unsubscribe
  let userId
  let messageType
  let message
  let userCount


  (async () => {
    const res = await api.user.getUserCount({}, $session.user.token)
    isLoading = false
    return userCount = Number(res)

  })().catch(err => {
    isLoading = false
    messageType = 'warning'
    return message = err.message
  })
  function closeMessage(){
    message = null
  }

</script>

<svelte:head>
  <title>Admin</title>
</svelte:head>


  <Tabs/>
  {#if isLoading}
    <LoadingSpinner />
    {:else}
    <section class="section">
      <div class="container">
        {#if message}
        <Message {message} messageType="{messageType}" on:click={closeMessage}/>
        {/if}
        <div class="columns">
          <div class="column is-12">
            <section class="info-tiles">
              <div class="tile is-ancestor has-text-centered">
                <div class="tile is-parent">
                  <article class="tile is-child box">
                    <p class="title">{userCount}</p>
                    <p class="subtitle">Users</p>
                  </article>
                </div>
                <div class="tile is-parent">
                  <article class="tile is-child box">
                    <p class="title">59k</p>
                    <p class="subtitle">Products</p>
                  </article>
                </div>
                <div class="tile is-parent">
                  <article class="tile is-child box">
                    <p class="title">3.4k</p>
                    <p class="subtitle">Open Orders</p>
                  </article>
                </div>
                <div class="tile is-parent">
                  <article class="tile is-child box">
                    <p class="title">19</p>
                    <p class="subtitle">Exceptions</p>
                  </article>
                </div>
              </div>
            </section>

            <div class="columns">
              <div class="column is-6">
                <div class="card events-card">
                  <header class="card-header">
                    <p class="card-header-title">Events</p>
                    <a
                        href="#"
                        class="card-header-icon"
                        aria-label="more options">
                  <span class="icon">
                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                  </span>
                    </a>
                  </header>
                  <div class="card-table">
                    <div class="content">
                      <table class="table is-fullwidth is-striped">
                        <tbody>
                        <tr>
                          <td width="5%">
                            <i class="fa fa-bell-o"></i>
                          </td>
                          <td>Lorum ipsum dolem aire</td>
                          <td class="level-right">
                            <a
                                class="button is-small is-primary"
                                href="#">
                              Action
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td width="5%">
                            <i class="fa fa-bell-o"></i>
                          </td>
                          <td>Lorum ipsum dolem aire</td>
                          <td class="level-right">
                            <a
                                class="button is-small is-primary"
                                href="#">
                              Action
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td width="5%">
                            <i class="fa fa-bell-o"></i>
                          </td>
                          <td>Lorum ipsum dolem aire</td>
                          <td class="level-right">
                            <a
                                class="button is-small is-primary"
                                href="#">
                              Action
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td width="5%">
                            <i class="fa fa-bell-o"></i>
                          </td>
                          <td>Lorum ipsum dolem aire</td>
                          <td class="level-right">
                            <a
                                class="button is-small is-primary"
                                href="#">
                              Action
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td width="5%">
                            <i class="fa fa-bell-o"></i>
                          </td>
                          <td>Lorum ipsum dolem aire</td>
                          <td class="level-right">
                            <a
                                class="button is-small is-primary"
                                href="#">
                              Action
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td width="5%">
                            <i class="fa fa-bell-o"></i>
                          </td>
                          <td>Lorum ipsum dolem aire</td>
                          <td class="level-right">
                            <a
                                class="button is-small is-primary"
                                href="#">
                              Action
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td width="5%">
                            <i class="fa fa-bell-o"></i>
                          </td>
                          <td>Lorum ipsum dolem aire</td>
                          <td class="level-right">
                            <a
                                class="button is-small is-primary"
                                href="#">
                              Action
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td width="5%">
                            <i class="fa fa-bell-o"></i>
                          </td>
                          <td>Lorum ipsum dolem aire</td>
                          <td class="level-right">
                            <a
                                class="button is-small is-primary"
                                href="#">
                              Action
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td width="5%">
                            <i class="fa fa-bell-o"></i>
                          </td>
                          <td>Lorum ipsum dolem aire</td>
                          <td class="level-right">
                            <a
                                class="button is-small is-primary"
                                href="#">
                              Action
                            </a>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <footer class="card-footer">
                    <a href="#" class="card-footer-item">View All</a>
                  </footer>
                </div>
              </div>
              <div class="column is-6">
                <div class="card">
                  <header class="card-header">
                    <p class="card-header-title">Inventory Search</p>
                    <a
                        href="#"
                        class="card-header-icon"
                        aria-label="more options">
                  <span class="icon">
                    <i class="fa fa-angle-down" aria-hidden="true"/>
                  </span>
                    </a>
                  </header>
                  <div class="card-content">
                    <div class="content">
                      <div class="control has-icons-left has-icons-right">
                        <input
                            class="input is-large"
                            type="text"
                            placeholder=""/>
                        <span class="icon is-medium is-left">
                      <i class="fa fa-search"/>
                    </span>
                        <span class="icon is-medium is-right">
                      <i class="fa fa-check"/>
                    </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <header class="card-header">
                    <p class="card-header-title">User Search</p>
                    <a
                        href="#"
                        class="card-header-icon"
                        aria-label="more options">
                  <span class="icon">
                    <i class="fa fa-angle-down" aria-hidden="true"/>
                  </span>
                    </a>
                  </header>
                  <div class="card-content">
                    <div class="content">
                      <div class="control has-icons-left has-icons-right">
                        <input
                            class="input is-large"
                            type="text"
                            placeholder=""/>
                        <span class="icon is-medium is-left">
                      <i class="fa fa-search"/>
                    </span>
                        <span class="icon is-medium is-right">
                      <i class="fa fa-check"/>
                    </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  {/if}


