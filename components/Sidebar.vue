<script setup lang="ts">
import { useMailStore } from '~/stores/mail'
import type { IconName } from '~/types/mail'

const mailStore = useMailStore()
const route = useRoute()

interface NavItem {
  name: string
  path: string
  icon: IconName
  countKey: 'totalInbox' | 'totalArchived'
}

const navItems: NavItem[] = [
  { name: 'Inbox', path: '/inbox', icon: 'inbox', countKey: 'totalInbox' },
  { name: 'Archive', path: '/archived', icon: 'archive', countKey: 'totalArchived' }
]
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__logo">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="20" viewBox="0 0 40 20" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M1.87665 17.5784C-0.625583 15.0981 -0.625543 11.0769 1.87673 8.59664L8.673 1.8602C10.7883 -0.236476 14.0146 -0.560742 16.4736 0.887405C17.2342 1.33533 17.2275 2.36286 16.602 2.98293C15.9764 3.603 14.9552 3.54963 14.1061 3.30347C13.0188 2.98825 11.796 3.25565 10.9384 4.10564L4.14212 10.8421C2.891 12.0822 2.89098 14.0928 4.14208 15.333C5.39324 16.5732 7.4218 16.5732 8.67296 15.333L22.2654 1.86029C24.7676 -0.619962 28.8246 -0.61997 31.3269 1.86026L38.1232 8.59664C40.6256 11.0769 40.6256 15.0982 38.1233 17.5784C35.621 20.0587 31.564 20.0587 29.0617 17.5784L26.7963 15.333L23.9645 18.1398C21.8492 20.2365 18.6229 20.5608 16.1639 19.1126C15.4034 18.6647 15.41 17.6371 16.0356 17.0171C16.6612 16.397 17.6823 16.4504 18.5314 16.6965C19.6188 17.0118 20.8415 16.7444 21.6991 15.8944L24.6118 13.0073C25.8182 11.8115 27.7743 11.8115 28.9807 13.0073L31.3271 15.333C32.5782 16.5731 34.6067 16.5731 35.8579 15.333C37.109 14.0929 37.109 12.0822 35.8579 10.8421L29.0616 4.10572C27.8104 2.86562 25.7819 2.86562 24.5308 4.10576L10.9384 17.5785C8.43604 20.0588 4.37892 20.0588 1.87665 17.5784Z"
          fill="black" />
      </svg>
    </div>

    <nav class="sidebar__nav">
      <NuxtLink v-for="item in navItems" :key="item.path" :to="item.path" class="nav-item"
        :class="{ 'nav-item--active': route.path === item.path }">
        <div class="nav-item__content">
          <AppIcon :name="item.icon" />
          <span class="nav-item__name">{{ item.name }}</span>
        </div>
        <span class="nav-item__count">{{ mailStore[item.countKey as 'totalInbox' | 'totalArchived'] }}</span>
      </NuxtLink>
    </nav>

    <div class="sidebar__footer">
      <button class="nav-item nav-item--logout">
        <div class="nav-item__content">
          <AppIcon name="logout" />
          <span class="nav-item__name">Logout</span>
        </div>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 260px;
  background-color: var(--sidebar-bg);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  padding: 24px 12px;

}

.sidebar__logo {
  padding: 0 12px 32px;
}

.sidebar__nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sidebar__footer {
  margin-top: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  border-radius: 54px;
  transition: all 0.2s ease;
  color: var(--text-secondary);
  font-weight: 500;
  height: 48px;
  fill: var(--text-secondary);
}

.nav-item:hover {
  background-color: var(--sidebar-hover);
  color: var(--text-primary);
  fill: var(--text-primary);
}

.nav-item--active {
  background-color: var(--active-blue);
  color: var(--text-primary);
  fill: var(--text-primary);
}

.nav-item--logout {
  width: 100%;
}

.nav-item__content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-item__name {
  font-size: 16px;
}

.nav-item__count {
  font-size: 16px;
}
</style>
