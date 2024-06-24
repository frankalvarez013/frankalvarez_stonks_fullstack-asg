import { Json } from "@/types/supabase";
import { create } from "zustand";

export type Imessage = {
  created_at: string;
  id: string;
  "is-edit": boolean;
  send_by: string;
  sent_from: string;
  text: string;
  users: {
    avatar_url: string | null;
    created_at: string;
    email: string;
    following: Json[] | null;
    id: string;
    name: string;
    online: boolean;
    username: string | null;
  } | null;
};

interface MessageState {
  messages: Imessage[];
  addMessage: (message: Imessage) => void;
  optimisticIds: string[];
  setOptimisticIds: (id: string) => void;
}

export const useMessage = create<MessageState>()((set) => ({
  messages: [],
  optimisticIds: [],
  setOptimisticIds: (id: string) =>
    set((state) => ({ optimisticIds: [...state.optimisticIds, id] })),
  addMessage: (newMessages) =>
    set((state) => ({
      messages: [...state.messages, newMessages],
    })),
}));
