<script>
  import generateNavigationOptions from "./generateNavigationOptions";
  import { createEventDispatcher } from "svelte";
  import { PREVIOUS_PAGE, NEXT_PAGE, ELLIPSIS } from "./symbolTypes";

  const dispatch = createEventDispatcher();

  export let totalItems = 0;
  export let pageSize = 1;
  export let currentPage = 1;
  export let limit = null;
  export let showStepOptions = false;
  export const setPage = page => {
    currentPage = page;
  };

  $: options = generateNavigationOptions({
    totalItems,
    pageSize,
    currentPage,
    limit,
    showStepOptions
  });

  $: totalPages = Math.ceil(totalItems / pageSize);

  function handleOptionClick(option) {
    dispatch("setPage", { page: option.value });
  }
</script>

<nav class="pagination" role="navigation" aria-label="pagination">
  {#each options as option}
    {#if option.type === 'symbol' && option.symbol === PREVIOUS_PAGE}
      <slot name="prev">
        <button
        class="pagination-previous button"
        class:pageNumber={option.type === 'number'}
        class:disabled={(option.type === 'symbol' && option.symbol === NEXT_PAGE && currentPage >= totalPages) || (option.type === 'symbol' && option.symbol === PREVIOUS_PAGE && currentPage <= 1)}
        class:prev={option.type === 'symbol' && option.symbol === PREVIOUS_PAGE}
        on:click|preventDefault={() => handleOptionClick(option)}
        disabled={(option.type === 'symbol' && option.symbol === NEXT_PAGE && currentPage >= totalPages) || (option.type === 'symbol' && option.symbol === PREVIOUS_PAGE && currentPage <= 1)}>
        Previous</button>
      </slot>
    {:else if option.type === 'symbol' && option.symbol === NEXT_PAGE}
      <slot name="next">
        <button
        class="pagination-next button"
        class:pageNumber={option.type === 'number'}
        class:disabled={(option.type === 'symbol' && option.symbol === NEXT_PAGE && currentPage >= totalPages) || (option.type === 'symbol' && option.symbol === PREVIOUS_PAGE && currentPage <= 1)}
        class:next={option.type === 'symbol' && option.symbol === NEXT_PAGE}
        disabled={(option.type === 'symbol' && option.symbol === NEXT_PAGE && currentPage >= totalPages) || (option.type === 'symbol' && option.symbol === PREVIOUS_PAGE && currentPage <= 1)}
        on:click|preventDefault={() => handleOptionClick(option)}
        >Next page</button>
      </slot>
    {/if}
  {/each}

  <ul class="pagination-list">
    {#each options as option}
      <li>
        {#if option.type === 'number'}
          <slot name="number" value={option.value}>
            <a
            href="/{option.value}"
            id="{option.value}"
            data-id="{option.value}"
            class="pagination-link"
            class:is-current={option.type === 'number' && option.value === currentPage}
            on:click|preventDefault={() => handleOptionClick(option)}
            >
            {option.value}
            </a>
          </slot>
        {:else if option.type === 'symbol' && option.symbol === ELLIPSIS}
          <slot name="ellipsis">
            <span class="pagination-ellipsis">&hellip;</span>
          </slot>
        {/if}
      </li>
    {/each}
  </ul>
</nav>

<style>
  .ellipsis{
    cursor: not-allowed;
    pointer-events: none;
  }
  .disabled{
    background: lightgray;
    cursor: not-allowed;
  }
  .pagination{
    padding: 40px 0;
    width: 100%;
  }
</style>
