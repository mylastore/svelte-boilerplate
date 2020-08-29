<script>
    import {stores} from '@sapper/app'

    const {page} = stores()
</script>

<div class="tabs is-centered">
    <ul>
        <li class:is-active={$page.path === "/admin"} ><a href="admin">Panel</a></li>
        <li class:is-active={$page.path.startsWith("/admin/users")} ><a href="admin/users/1">Users</a></li>
        <li class:is-active={$page.path === "/admin/settings"} ><a href="admin/settings">Settings</a></li>
    </ul>
</div>
