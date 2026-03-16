export interface Email {
  id: number;
  description: string;
  archived: boolean;
  read: boolean;
}

export type IconName = 'inbox' | 'archive' | 'close' | 'trash' | 'read' | 'logout';
