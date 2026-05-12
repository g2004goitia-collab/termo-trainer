<script>
  import { onMount, afterUpdate } from 'svelte'
  import katex from 'katex'

  export let tex = ''
  export let displayMode = false
  let el

  function render() {
    if (!el || !tex) return
    katex.render(tex, el, { throwOnError: false, displayMode })
  }

  onMount(render)
  afterUpdate(render)
</script>

<span bind:this={el} class="katex-wrap" class:display={displayMode}></span>

<style>
  .katex-wrap { line-height: 1.2; }
  .katex-wrap.display { display: block; margin: 1rem 0; }
</style>
