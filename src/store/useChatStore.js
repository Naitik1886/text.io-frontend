import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "../libs/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set ,get) => ({
  users: [],
  messages: [],
  isUsersLoading: false,
  isMessagesLoadng: false,
  selectedUser: null,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const { data } = await axiosInstance.get("/messages/users");
      set({ users: data });
    } catch (error) {
      console.log(error);
      toast.error(error?.data);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (id) => {
    set({ isMessagesLoadng: true });
    try {
      const { data } = await axiosInstance.get(`/messages/${id}`);
      set({ messages: data });
    } catch (error) {
      console.log(error);
      toast.error(error?.data);
    } finally {
      set({ isMessagesLoadng: false });
    }
  },


  sendMessage: async (messageInfo) => {
  const { selectedUser } = get(); // We only need the selectedUser here
  try {
    const { data } = await axiosInstance.post(
      `/messages/send/${selectedUser._id}`,
      messageInfo
    );

    // This functional form is robust and prevents stale state issues.
    // It gets the most current state and appends the new message.
    // In sendMessage function...
set((state) => ({
  // This ensures state.messages is always an array before spreading
  messages: [...(state.messages || []), data],
}));

  } catch (error) {
    console.log(error);
    toast.error(error?.data?.message || "Failed to send message.");
  }
},

// In your useChatStore.js
listenToMessages : () => {
  const socket = useAuthStore.getState().socket;
  if (!socket) return;

  socket.on("newMessages", (newMessage) => {
    // This checks if the message is for the currently open chat
    if (newMessage.senderId !== get().selectedUser?._id) return;
    
    // This correctly uses the current state to append the new message
    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  });
},

  dontListenToMessages : () => {
const socket = useAuthStore.getState().socket
socket.off("newMessages")
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
