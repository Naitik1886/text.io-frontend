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
    const onlineUsers = useAuthStore.getState().onlineUsers
    try {
      if (!onlineUsers.includes(selectedUser._id)) {
  return toast.error("This user is currently offline.");}
      
      const {data} = await axiosInstance.post(`/messages/send/${selectedUser._id}` , messageInfo)
      set({messages:[...messages, data]})
        
    } catch (error) {
        console.log(error)
        toast.error(error?.data)
        
    }


  },


  listenToMessages : () => {
    const {selectedUser} = get();
    const {messages} = get()
    if(!selectedUser) return ;
    const socket = useAuthStore.getState().socket
    socket.on("newMessages", (newMessage) => {
      if(newMessage.senderId !==  selectedUser._id) return 
      
set({messages:[...messages, newMessage]})
    })
  },

  dontListenToMessages : () => {
const socket = useAuthStore.getState().socket
socket.off("newMessages")
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
