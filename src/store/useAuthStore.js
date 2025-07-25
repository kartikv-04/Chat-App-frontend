import { create } from "zustand";
import { axiosInstance } from "../lib/axio";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { persist } from "zustand/middleware";



export const useAuthStore = create(
    persist(
        (set, get) => ({
            authUser: null,
            isSignedUp: false,
            isLoggingIn: false,
            isUpdatingProfile: false,
            isCheckingAuth: true,
            onlineUsers: [],
            socket: null,



            checkAuth: async () => {
                try {
                    const res = await axiosInstance.get("/auth/check");

                    set({ authUser: res.data })
                    get().connectSocket();

                }
                catch (error) {
                    set({ authUser: null });
                }
                finally {
                    set({ isCheckingAuth: false });
                }
            },

            signup: async (data) => {
                set({ isSigningUp: true });
                try {
                    const res = await axiosInstance.post("/auth/signup", data);
                    set({ authUser: res.data });
                    toast.success("Account created successfully");
                    get().connectSocket();
                } catch (error) {
                    toast.error(error.response.data.message);
                } finally {
                    set({ isSigningUp: false });
                }
            },

            login: async (data) => {
                set({ isLoggingIn: true });
                try {
                    const res = await axiosInstance.post("/auth/signin", data);
                    set({ authUser: res.data });
                    toast.success("Logged in successfully");

                    get().connectSocket();
                } catch (error) {
                    toast.error(error.response.data.message);
                } finally {
                    set({ isLoggingIn: false });
                }
            },

            logout: async () => {
                try {
                    await axiosInstance.post("/auth/logout");
                    set({ authUser: null });
                    toast.success("Logged out successfully");
                    get().disconnectSocket();
                } catch (error) {
                    toast.error(error.response.data.message);
                }
            },

            updateProfile: async (data) => {
                set({ isUpdatingProfile: true });
                try {
                    const res = await axiosInstance.put("/auth/update-profile", data);
                    set({ authUser: res.data });
                    toast.success("Profile updated successfully");
                } catch (error) {
                    if (error.response && error.response.status === 413) {
                        toast.error("File is too large. Max 5mb allowed.");
                    } else if (error.response?.data?.message) {
                        toast.error(error.response.data.message);
                    } else {
                        toast.error("Something went wrong.");
                    }
                } finally {
                    set({ isUpdatingProfile: false });
                }
            },

            connectSocket: () => {
                const { authUser } = get();
                if (!authUser || get().socket?.connected) return;

                const socket = io(import.meta.env.VITE_SOCKET_URL, {
                    query: {
                        userId: authUser._id,
                    },
                });
                socket.connect();

                set({ socket: socket });

                socket.on("getOnlineUsers", (userIds) => {
                    set({ onlineUsers: userIds });
                });
            },

            disconnectSocket: () => {
                if (get().socket?.connected) get().socket.disconnect();
            },


        }),
        {
            name: "auth-storage",
            partialize: (state) => ({ authUser: state.authUser }),
        }
    ));