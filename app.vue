<script setup lang="ts">
import { computed } from 'vue'
import '~/assets/css/main.css'
import { useMailStore } from '~/stores/mail'
import { useKeybindings } from '~/composables/useKeybindings'

const mailStore = useMailStore()

const closeDetail = () => {
  mailStore.setActiveEmail(null)
}

const activeEmail = computed(() => {
  return mailStore.emails.find(e => e.id === mailStore.activeEmailId)
})

const archiveEmail = () => {
  if (mailStore.activeEmailId) {
    mailStore.archiveEmail(mailStore.activeEmailId)
    mailStore.setActiveEmail(null)
  }
}

const markAsRead = () => {
  if (mailStore.activeEmailId) {
    mailStore.markAsRead(mailStore.activeEmailId)
  }
}

useKeybindings({
  onEscape: closeDetail,
  onR: () => {
    if (mailStore.activeEmailId) {
      markAsRead()
    } else if (mailStore.selectedIds.length > 0) {
      mailStore.markSelectedAsRead()
    }
  },
  onA: () => {
    if (mailStore.activeEmailId) {
      archiveEmail()
    } else if (mailStore.selectedIds.length > 0) {
      mailStore.archiveSelected()
    }
  }
})
</script>

<template>
  <div class="app-wrapper">
    <NuxtPage />

    <Transition name="fade">
      <div v-if="mailStore.activeEmailId && activeEmail" class="email-detail" @click="closeDetail">
        <div class="email-detail__modal" @click.stop>
          <header class="email-detail__header">
            <button class="email-detail__close-btn" @click="closeDetail">
              <AppIcon name="close" size="16" />
              <span>Close (Esc)</span>
            </button>
            <div class="email-detail__actions">
              <button @click="markAsRead" class="action-btn">
                <AppIcon name="read" size="18" />
                <span>Mark as read (r)</span>
              </button>
              <button @click="archiveEmail" class="action-btn">
                <AppIcon name="trash" size="18" />
                <span>Archive (a)</span>
              </button>
            </div>
          </header>
          <div class="email-detail__content">
            <h2 class="email-detail__title">{{ activeEmail.description }}</h2>
            <div class="email-detail__body">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.</p>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.app-wrapper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.email-detail {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #4C5764CC;
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
}

.email-detail__modal {
  width: 752px;
  height: 100%;
  background-color: var(--white);
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.email-detail__header {
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.email-detail__close-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
}

.email-detail__actions {
  display: flex;
  gap: 16px;
}

.email-detail__content {
  padding: 32px;
  flex: 1;
  overflow-y: auto;
}

.email-detail__title {
  font-size: 20px;
  margin-bottom: 24px;
  line-height: 1.4;
}

.email-detail__body {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.email-detail__body p {
  margin-bottom: 16px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
  transition: color 0.2s ease;
}

.action-btn:hover,
.email-detail__close-btn:hover {
  color: var(--text-primary);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active .detail-modal,
.fade-leave-active .detail-modal {
  transition: transform 0.3s ease;
}

.fade-enter-from .detail-modal,
.fade-leave-to .detail-modal {
  transform: translateX(100%);
}
</style>
