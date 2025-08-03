import { Camera, Mail, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

const ProfilePage = () => {
  const { authUserData, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profile: base64Image });
    };
  };

  return (
    <div className="flex-grow bg-gradient-to-br from-base-300 via-base-200 to-base-100 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden -z-0">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-success/20 to-accent/20 rounded-3xl rotate-45 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-info/20 to-primary/20 rounded-full animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
        <div className="absolute top-1/2 right-10 w-16 h-40 bg-gradient-to-b from-accent/10 to-info/10 rounded-full transform -rotate-12"></div>
        <div className="absolute top-1/3 left-10 w-20 h-20 bg-gradient-to-br from-secondary/15 to-accent/15 rounded-2xl rotate-12 animate-pulse"></div>
      </div>

      <div className="card bg-base-100/5 backdrop-blur-2xl border border-base-content/20 shadow-2xl shadow-black/20 hover:shadow-success/10 transition-all duration-500 max-w-md w-full relative z-10 overflow-y-auto">
        <div className="card-body p-6 space-y-4">
          <div className="text-center mb-4 relative z-10">
            <h1 className="card-title text-2xl font-bold text-base-content mb-2 tracking-tight justify-center">
              Profile
            </h1>
          </div>

          <div className="flex flex-col items-center space-y-4 relative z-10">
            <div className="relative group">
              <div className="avatar">
                <div className="w-24 rounded-full border border-base-content/50 shadow-xl hover:scale-105 transition-transform duration-300 bg-base-200/40">
                  <img
                    src={
                      selectedImage || authUserData?.profile || "/avatar.png"
                    }
                    alt="profile"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <label
              htmlFor="profile-upload"
              className="absolute translate-y-14 translate-x-9 cursor-pointer bg-gradient-to-r from-success via-accent to-info hover:from-success w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200"
            >
              <Camera className="size-4 text-base-100 relative z-10" />
            </label>

            <input
              id="profile-upload"
              accept="image/*"
              onChange={handleProfileUpload}
              disabled={isUpdatingProfile}
              type="file"
              className="hidden"
            />

            <p className="text-xs text-base-content/60 mt-2">
              {isUpdatingProfile
                ? "Uploading..."
                : "click on the camera icon to upload"}
            </p>
          </div>

          <div className="space-y-3 pt-2 relative z-10">
            <div className="card compact bg-base-200/40 border border-base-content/50 hover:bg-base-200/60 hover:border-base-content/70 transition-all duration-200">
              <div className="card-body flex-row items-center space-x-3 p-3">
                <User className="size-4 text-success flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-xs font-medium text-base-content/60 mb-1">
                    Full Name
                  </div>
                  <p className="text-base-content text-sm font-medium">
                    {authUserData?.fullName}
                  </p>
                </div>
              </div>
            </div>

            <div className="card compact bg-base-200/40 border border-base-content/50 hover:bg-base-200/60 hover:border-base-content/70 transition-all duration-200">
              <div className="card-body flex-row items-center space-x-3 p-3">
                <Mail className="size-4 text-accent flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-xs font-medium text-base-content/60 mb-1">
                    Email Address
                  </div>
                  <p className="text-base-content text-sm font-medium break-all">
                    {authUserData?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 relative z-10">
            <div>
              <h2 className="card-title text-lg font-bold text-base-content mb-3 tracking-tight">
                Account info
              </h2>

              <div className="space-y-3">
                <div className="card compact bg-base-200/40 border border-base-content/50 hover:bg-base-200/60 hover:border-base-content/70 transition-all duration-200">
                  <div className="card-body flex-row items-center justify-between p-3">
                    <span className="text-sm font-medium text-base-content/70">
                      Member Since
                    </span>
                    <span className="text-base-content text-sm font-medium">
                      {new Date(authUserData?.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="card compact bg-base-200/40 border border-base-content/50 hover:bg-base-200/60 hover:border-base-content/70 transition-all duration-200">
                  <div className="card-body flex-row items-center justify-between p-3">
                    <span className="text-sm font-medium text-base-content/70">
                      Account Status
                    </span>
                    <span className="badge badge-lg bg-gradient-to-r from-success via-accent to-info text-base-100 border-none font-semibold">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ProfilePage;
