import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import MessageInput from "./MessageInput";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../libs/utils";
import { useRef } from "react";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    listenToMessages,
    dontListenToMessages,
  } = useChatStore();
  const { authUserData } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    listenToMessages();

    return () => dontListenToMessages();
  }, [selectedUser._id, getMessages, listenToMessages, dontListenToMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading)
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
      </div>
    );

  return (
    <div className="flex-1 flex flex-col ">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4  min-h-0">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUserData._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUserData._id
                      ? authUserData.profile || "/avatar.png"
                      : selectedUser.profile || "/avatar.png"
                  }
                  alt="profile"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="image"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}

              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
