import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";
import SideBar from "../components/SideBar";
import { useChatStore } from "../store/useChatStore";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    // CHANGE THIS LINE: Use `h-screen` instead of `max-h-screen` to enforce a strict,
    // full-page height, which is a more stable foundation for the child heights.
    <div className="  bg-base-200  flex items-center pt-6 pb-14 justify-center   px-4">
      <div className="absolute inset-14 overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-5 w-32 h-32 bg-gradient-to-br from-success/20 to-accent/20 rounded-3xl rotate-45 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-5 w-24 h-24 bg-gradient-to-br from-info/20 to-primary/20 rounded-full animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
        <div className="absolute top-1/2 right-10 w-16 h-40 bg-gradient-to-b from-accent/10 to-info/10 rounded-full transform -rotate-12"></div>{" "}
      </div>
      <div className="bg-base-100  rounded-2xl z-10  shadow-2xl w-full max-w-6xl h-[calc(100vh-9rem)]">
        {/* The `h-full` here correctly inherits the calculated height from its parent. */}
        <div className="flex h-full rounded-lg">
          <SideBar />
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>{" "}
      <span className="absolute bottom-4 left-1/2 text-sm font-mono  -translate-x-1/2 ">
        Made with ❤️ by Naitik
      </span>
    </div>
  );
};

export default HomePage;
