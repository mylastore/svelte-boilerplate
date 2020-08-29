<script>
    export let controlType = 'input';
    export let id;
    export let label;
    export let rows = null;
    export let value;
    export let type = "text";
    export let valid = true;
    export let className = '';
    export let validityMessage = "";

    let touched = false;
</script>

<div class="field">
    <label for={id}>{label}</label>
    {#if controlType === 'textarea'}
        <textarea class:textarea="{true}" class:invalid="{!valid && touched}" {rows} {id} bind:value on:blur={() => touched = true} ></textarea>
    {/if}
    {#if controlType === 'input'}
        <input class="input {className} {!valid && touched ? 'error' : ''}" {type} {id} {value} on:input
               on:blur={() => touched = true}/>
    {/if}
    {#if validityMessage && !valid && touched}
        <p class="error-message">{validityMessage}</p>
    {/if}
</div>


<style>
    .invalid {
        border-color: #ffa8a8;
        background: #fde3e3;
    }

    .error-message {
        color: red;
        margin: 0.25rem 0;
    }
</style>
