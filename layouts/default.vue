<template>
  <section class="grid">
      <LayoutSidebar />
      <div>
          <slot/>
      </div>
  </section>
</template>

<script lang="ts" setup>


  
</script>

<style scoped>
  .grid {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1fr 5fr;
  }
</style>