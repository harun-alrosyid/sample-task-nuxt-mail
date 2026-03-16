import { onMounted, onUnmounted } from "vue";
import { useMailStore } from "~/stores/mail";

interface KeybindingsOptions {
  onEscape?: () => void;
  onR?: () => void;
  onA?: () => void;
}

export const useKeybindings = (options: KeybindingsOptions) => {
  const handleKeydown = (e: KeyboardEvent) => {
    const target = e.target as HTMLInputElement;
    const isTextInput =
      ["TEXTAREA", "SELECT"].includes(target.tagName) ||
      (target.tagName === "INPUT" &&
        !["checkbox", "radio"].includes(target.type)) ||
      target.isContentEditable;

    if (isTextInput) {
      return;
    }

    const key = e.key.toLowerCase();

    if (key === "escape" && options.onEscape) {
      options.onEscape();
    } else if (key === "r" && options.onR) {
      options.onR();
    } else if (key === "a" && options.onA) {
      options.onA();
    }
  };

  onMounted(() => {
    window.addEventListener("keydown", handleKeydown);
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", handleKeydown);
  });
};
