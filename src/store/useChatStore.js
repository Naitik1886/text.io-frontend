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
    const {messages , selectedUser } = get();
    try {
      
      
      const {data} = await axiosInstance.post(`/messages/send/${selectedUser._id}` , messageInfo)
      set({messages:[...messages, data]})
        
    } catch (error) {
        console.log(error)
        toast.error(error?.data)
        
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
