import { create } from "zustand";
import axiosInstance from "../libs/axios";
import { toast } from "react-hot-toast";
import {io} from "socket.io-client"
const API_BASE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:8005" 
  : import.meta.env.VITE_API_URL;





export const useAuthStore = create((set, get) => ({
  authUserData: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  onlineUsers:[],
  socket:null,


  checkAuth: async () => {
    try {
      const { data } = await axiosInstance.get("/auth/check");
      set({ authUserData: data });
      
      get().connectSocket();

    } catch (error) {
      console.log("❌ Error checking authentication:", error);
      
      set({ authUserData: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async function (info) {
    try {
      set({ isSigningUp: true });

      const { data } = await axiosInstance.post("/auth/signup", info);

      if (data.error) {
        toast.error(data.error);
      } else {
        set({ authUserData: data });
        get().connectSocket();
        console.log("✅ Signup successful, authUserData set:", data);
        toast.success("Registered successfully!");
      }
    } catch (error) {
      console.log("Response:", error?.data);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async function (info) {
    try {
      set({ isLoggingIn: true });

      const { data } = await axiosInstance.post("/auth/login", info);

      if (data.error) {
        toast.error(data.error);
      } else {
        set({ authUserData: data });
        get().connectSocket();
        console.log("✅ Login successful, authUserData set:", data);
        toast.success("Logged In successfully!");
      }
    } catch (error) {
      console.log("Response:", error?.data);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async function () {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUserData: null });
      get().disconnectSocket();
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Logout failed. Please try again.");
    }
  },

  updateProfile: async function (pic) {
    try {
      set({ isUpdatingProfile: true });
      const { data } = await axiosInstance.put("/auth/update-Profile", pic );
      if(data.error){
        toast.error(data.error)
      }else{

        set({ authUserData: data });
        toast.success("Your Profile  got updated");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, plz try again");
    }
    finally{
      set({isUpdatingProfile:false});
    }
  },


  connectSocket: () => {
    const {authUserData} = get()
    if(!authUserData || get().socket?.connected) return ;
    const socket = io(API_BASE_URL,{
      query:{
        userId : authUserData._id,
      },
    })
    socket.connect()
    set({socket:socket})

    socket.on("getOnlineUsers", (userIds) => {
      set({onlineUsers:userIds});
    })

  },

  disconnectSocket : () =>{
    
const {socket} = get()
    if(socket?.connected) 
    socket.disconnect()
    },
}));
