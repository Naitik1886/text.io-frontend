import { X, Image, Send } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useChatStore } from "../store/useChatStore";

const MessageInput = () => {
  const fileInputRef = useRef(null);
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState();
  const { sendMessage } = useChatStore();



  

  const handleImagechange = async (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Plz select an image file only");
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
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!text.trim() && !imagePreview) {
        return;
      }
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.log(error);
    }finally{
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
          </div>
          <button
            onClick={removeImage}
            className=" -top-1.5  -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
            type="button"
          >
            <X className="size-3 " />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            onChange={(e) => setText(e.target.value)}
            type="text"
            value={text}
          
            
            placeholder="type a message..."
            
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/"
            className="hidden"
            onChange={handleImagechange}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            type="button"
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
