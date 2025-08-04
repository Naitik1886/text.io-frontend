import { X, Image, Send } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useChatStore } from "../store/useChatStore";

const MessageInput = () => {
  const fileInputRef = useRef(null);
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) {
      return;
    }

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message.");
    } finally {
      setText("");
      removeImage();
    }
  };

  return (
    <div className="bg-base-200 p-2 sm:p-3 md:p-4 w-full">
      {/* Image Preview Section */}
      {imagePreview && (
        <div className="mb-2 relative w-20 h-20">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg border border-base-300"
          />
          {/* Moved the remove button inside the relative container for correct positioning */}
          <button
            onClick={removeImage}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-base-300 flex items-center justify-center hover:bg-base-100 transition-all"
            type="button"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2">
          <input
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            onChange={(e) => setText(e.target.value)}
            type="text"
            value={text}
            placeholder="Type a message..."
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          {/* Image button - hidden on extra-small screens */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className={`hidden sm:flex btn btn-sm btn-circle
              ${imagePreview ? "btn-success" : ""}`}
            type="button"
          >
            <Image size={18} />
          </button>
        </div>

        {/* Send button */}
        <button
          type="submit"
          className="btn btn-sm btn-circle btn-primary"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;