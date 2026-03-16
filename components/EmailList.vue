<script setup lang="ts">
import { useMailStore } from '~/stores/mail'
import type { Email } from '~/types/mail'

const props = defineProps<{
  title: string
  emails: Email[]
}>()

const mailStore = useMailStore()

const toggleAll = () => {
  if (mailStore.selectedIds.length === props.emails.length) {
    mailStore.deselectAll()
  } else {
    mailStore.selectAll(props.emails.map(e => e.id))
  }
}

const isAllSelected = computed(() => {
  return props.emails.length > 0 && mailStore.selectedIds.length === props.emails.length
})

const archiveSelected = () => {
  mailStore.archiveSelected()
}

const markSelectedAsRead = () => {
  mailStore.markSelectedAsRead()
}
</script>

<template>
  <div class="email-list">
    <header class="email-list__header">
      <h1 class="email-list__title">{{ title }}</h1>
      <div class="email-list__selection-actions">
        <div class="email-list__header-control">
          <input type="checkbox" :checked="isAllSelected" @change="toggleAll" class="email-list__header-checkbox">
          <span class="email-list__selection-count">Email Selected ({{ mailStore.selectedIds.length }})</span>
        </div>

        <div class="email-list__actions">
          <button @click="markSelectedAsRead" class="action-btn" title="Mark as read">
            <AppIcon name="read" size="18" />
            <span>Mark as read (r)</span>
          </button>
          <button @click="archiveSelected" class="action-btn" title="Archive">
            <AppIcon name="trash" size="18" />
            <span>Archive (a)</span>
          </button>
        </div>
      </div>
    </header>

    <main class="email-list__content">
      <div v-for="email in emails" :key="email.id" class="email-item" :class="{
        'email-item--selected': mailStore.selectedIds.includes(email.id),
        'email-item--read': email.read,
        'email-item--unread': !email.read
      }" @click="mailStore.setActiveEmail(email.id)">
        <div class="email-item__selection" @click.stop>
          <input type="checkbox" :checked="mailStore.selectedIds.includes(email.id)"
            @change="mailStore.toggleSelection(email.id)">
        </div>
        <div class="email-item__content">
          <p class="email-item__description">{{ email.description }}</p>
        </div>
      </div>

      <div v-if="emails.length === 0" class="email-list__empty-state">
        <p>No emails here</p>
      </div>
    </main>
  </div>
</template>

<style scoped>
.email-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--white);
  overflow-y: auto;
}

.email-list__header {
  padding: 24px;
}

.email-list__title {
  font-size: 32px;
  margin-bottom: 24px;
}

.email-list__selection-actions {
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: space-between;
}

.email-list__header-control {
  display: flex;
  align-items: center;
  gap: 16px;
}

.email-list__header-checkbox,
.email-item__selection input[type="checkbox"] {
  appearance: none;
  width: 20px;
  height: 20px;
  cursor: pointer;
  border: 1.5px solid #CBD5E1;
  border-radius: 5px;
  position: relative;
  transition: all 0.2s ease;
  background-color: var(--white);
}

.email-list__header-checkbox:checked,
.email-item__selection input[type="checkbox"]:checked {
  background-color: var(--primary-blue);
  border-color: var(--primary-blue);
}

.email-list__header-checkbox:checked::after,
.email-item__selection input[type="checkbox"]:checked::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 6px;
  width: 4px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.email-list__selection-count {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

.email-list__actions {
  display: flex;
  gap: 16px;
}

.email-list__content {
  display: flex;
  flex-direction: column;
}

.email-list__empty-state {
  padding: 48px;
  text-align: center;
  color: var(--text-secondary);
}

.email-item {
  display: flex;
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);
  cursor: pointer;
  transition: background-color 0.1s;
}

.email-item:hover {
  background-color: #D1E2FF;
}

.email-item--selected {
  background-color: var(--active-blue) !important;
}

.email-item--unread {
  background-color: #F3F6FB;
}

.email-item--read {
  opacity: 0.5;
}

.email-item__selection {
  margin-right: 24px;
  display: flex;
  align-items: center;
}

.email-item__content {
  flex: 1;
  overflow: hidden;
}

.email-item__description {
  font-size: 14px;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
}

.action-btn:hover {
  background-color: var(--sidebar-bg);
  color: var(--text-primary);
}
</style>
