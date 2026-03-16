import { defineStore } from "pinia";
import type { Email } from "~/types/mail";
import { INITIAL_EMAILS } from "~/utils/initialData";

export const useMailStore = defineStore("mail", () => {
  const emails = ref<Email[]>([...INITIAL_EMAILS]);
  const selectedIds = ref<number[]>([]);
  const activeEmailId = ref<number | null>(null);

  const inboxEmails = computed(() => emails.value.filter((e) => !e.archived));
  const archivedEmails = computed(() => emails.value.filter((e) => e.archived));
  const totalInbox = computed(() => inboxEmails.value.length);
  const totalArchived = computed(() => archivedEmails.value.length);
  const selectedEmails = computed(() =>
    emails.value.filter((e) => selectedIds.value.includes(e.id)),
  );

  function toggleSelection(id: number) {
    const index = selectedIds.value.indexOf(id);
    if (index > -1) {
      selectedIds.value.splice(index, 1);
    } else {
      selectedIds.value.push(id);
    }
  }

  function selectAll(ids: number[]) {
    selectedIds.value = [...ids];
  }

  function deselectAll() {
    selectedIds.value = [];
  }

  function archiveSelected() {
    emails.value.forEach((e) => {
      if (selectedIds.value.includes(e.id)) {
        e.archived = true;
      }
    });
    selectedIds.value = [];
  }

  function markSelectedAsRead() {
    emails.value.forEach((e) => {
      if (selectedIds.value.includes(e.id)) {
        e.read = true;
      }
    });
    selectedIds.value = [];
  }

  function archiveEmail(id: number) {
    const email = emails.value.find((e) => e.id === id);
    if (email) email.archived = true;
  }

  function markAsRead(id: number) {
    const email = emails.value.find((e) => e.id === id);
    if (email) email.read = true;
  }

  function setActiveEmail(id: number | null) {
    activeEmailId.value = id;
    if (id) {
      const email = emails.value.find((e) => e.id === id);
      if (email) email.read = true;
    }
  }

  return {
    emails,
    selectedIds,
    activeEmailId,
    inboxEmails,
    archivedEmails,
    totalInbox,
    totalArchived,
    selectedEmails,
    toggleSelection,
    selectAll,
    deselectAll,
    archiveSelected,
    markSelectedAsRead,
    archiveEmail,
    markAsRead,
    setActiveEmail,
  };
});
