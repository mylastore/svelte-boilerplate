<script>
    import {fade} from 'svelte/transition';
    import {createEventDispatcher, onMount} from "svelte";
    export let message;
    export let messageType;
    const dispatch = createEventDispatcher();
</script>

<div class="notification is-{messageType} alert-dismissible">
    {message}
    <button type="button" class="close-button" on:click={()=> dispatch('closeMessageEvent')}>
        <span aria-hidden="true">&times;</span>
    </button>
</div>

<style>
    .notification{
        position: relative;
        padding: 15px 40px 15px 15px;
        margin-bottom: 20px;
        margin-top: 20px;
    }
    .close-button{
        position: absolute;
        right: 0;
        top: 0;
        padding: 0;
        height: 100%;
        border: none;
        background: orange;
        width: 30px;
    }
    .close-button:hover{
        cursor: pointer;
    }
    .close-button span{
        font-size: 20px;
    }
</style>
