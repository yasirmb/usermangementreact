import React, { useState } from "react";
import axios from "axios";
import { addUser } from "../../Redux/setUserData";
import Axios from "../../axios/axios";
import { useSelector, useDispatch } from "react-redux";

const ProfileUploadModal = () => {
  const [imageSelected, setImageSelected] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [prevUrl, setPreveUrl] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.userData;
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handleCloseModal = (e) => {
    if (e.target.id === "popup-modal") {
      setShowModal(false);
    }
  };

  const uploadImage = () => {
    console.log("responseeeeeeeeeeeeeeeeeeeee");
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "ekww8odz");
    axios
      .post("https://api.cloudinary.com/v1_1/dilx5gkkh/image/upload", formData)
      .then((response) => {
        console.log(response?.data?.secure_url, "response");
        const url = response?.data?.secure_url;
        if (url === prevUrl) {
          console.log("image already in data base");
          return false;
        } else {
          const data = {
            userId: user._id,
            url: url,
          };
          setPreveUrl(url);
          Axios.post("/profileupdate", data)
            .then((res) => {
              console.log(res.data, "data iss");
              if (res.data.status === false) {
                return false;
              } else {
                console.log("profile updated");
                toggleModal();
                dispatch(addUser(res.data));
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <img
        src="https://assets.upload.io/website/blog_assets/icons/material/icons/add_a_photo_rounded.svg"
        alt="png"
        className="cursor-pointer"
        onClick={toggleModal}
        title="Upload Image"
      />

      {showModal && (
        <div
          id="popup-modal"
          className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto"
          onClick={handleCloseModal}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="relative w-full max-w-md max-h-full"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          >
            <div className="relative bg-white rounded-lg shadow">
              <button
                // type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                onClick={toggleModal}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="flex justify-center items-center">
                <div className="mb-4 ">
                  <label
                    class="block font-bold text-lg mb-4 mt-3 mx-5"
                    for="profile-photo"
                  >
                    Choose a profile photo:
                  </label>
                  <input
                    class="mb-8"
                    onChange={(e) => {
                      setImageSelected(e.target.files[0]);
                    }}
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                  />
                </div>

                <button
                  class="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  onClick={uploadImage}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileUploadModal;
