<script setup lang="ts">
import { useMailStore } from '~/stores/mail'

const mailStore = useMailStore()
</script>

<template>
  <div class="page-layout">
    <Sidebar />
    <EmailList 
      title="Inbox" 
      :emails="mailStore.inboxEmails" 
    />
  </div>
</template>

<style scoped>
.page-layout {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
