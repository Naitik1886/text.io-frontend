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


 // In your useChatStore.js
sendMessage: async (messageInfo) => {
  console.log("1. sendMessage function started.");

  const { selectedUser } = get();
  if (!selectedUser) {
    console.error(" sendMessage aborted: No selected user.");
    return;
  }

  try {
    console.log("2. Sending data to backend:", messageInfo);

    const { data } = await axiosInstance.post(
      `/messages/send/${selectedUser._id}`,
      messageInfo
    );

    console.log("3. Received response from backend:", data);

    // --- Data Validation Step ---
    if (!data || !data._id) {
      console.error("ERROR: The server response is invalid or missing an _id.", data);
      toast.error("Error: Received an invalid response from the server.");
      // Stop execution because the data is bad
      return;
    }

    console.log("4. Attempting to update client state...");

    set((state) => {
      const newMessages = [...(state.messages || []), data];
      console.log("5. New state prepared. Total messages:", newMessages.length);
      return { messages: newMessages };
    });

    console.log("6. State update successful! The UI should now re-render.");

  } catch (error) {
    console.error("7. CRITICAL ERROR caught in sendMessage:", error);
    
    // Log detailed Axios error information if it exists
    if (error.response) {
      console.error("Axios response data:", error.response.data);
      console.error("Axios response status:", error.response.status);
      toast.error(error.response.data?.message || "An error occurred on the server.");
    } else {
      toast.error("An unexpected network error occurred.");
    }
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
