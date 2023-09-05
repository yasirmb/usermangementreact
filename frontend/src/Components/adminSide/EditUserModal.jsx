import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "../../axios/axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditUserModal({ rowData, fetch }) {
  console.log(rowData, "propsss");
  const [username, setUserName] = React.useState(rowData?.userName);
  const [useremail, setUserEmail] = React.useState(rowData?.email);
  const [userphone, setUserPhone] = React.useState(rowData?.phone);
  const [errors, setErrors] = React.useState({});
  console.log(username, "username");
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    const editInfo = {
      name: username,
      email: useremail,
      phone: userphone,
      userId: rowData._id,
    };
    console.log(editInfo, "user detailssssssssssss");
    let err = validation(editInfo, rowData);
    console.log(err, "errorss");
    if (Object.keys(err).length === 0) {
      await axios
        .put("/admin/edituser", editInfo)
        .then((res) => {
          console.log(res.data);
          fetch();
          handleClose();
        })
        .catch((err) => {
          console.log(err, "errfound");
          handleClose();
        });
    } else {
      console.log("errors");
      setErrors(err);
    }
  };

  const closeModal = () => {
    handleClose();
  };

  const validation = (data, rowData) => {
    let err = {};
    console.log(rowData, "rowdata");
    console.log(data, "dataaaa");
    const name = data?.name;
    console.log(name);
    const email = data?.email;
    const phone = data?.phone;
    const sameData =
      rowData?.userName === name &&
      rowData?.email === email &&
      rowData?.phone === phone
        ? true
        : false;

    const isFullname = name.includes(" ");
    const nameFormat = /^[a-zA-Z\s]+$/.test(name);
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phonenumberFormat = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(phone);
    if (!data) {
      err.name = "enter the your name";
    } else if (!name || !isFullname) {
      err.name = "enter your full name";
    } else if (name.length < 2 || name.length > 40 || !nameFormat) {
      err.name = "check your name";
    } else if (!email || !emailFormat) {
      err.email = "check your email";
    } else if (phonenumberFormat === false) {
      err.phone = "enter the correct number";
    } else if (sameData) {
      err.data = "re-check the data";
    }
    return err;
  };

  return (
    <div>
      <Button onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit User
          </Typography>
          <form className="flex flex-col gap-4 w:full">
            {errors?.data && (
              <p className="text-sm m-3 text-red-500 text-center">
                {errors?.data}
              </p>
            )}

            <input
              className="mt-1 p-2 rounded-xl border  focus:outline-none"
              type="text"
              name="name"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="enter your full name"
            />

            {errors?.name && (
              <p className="text-sm m-3 text-red-500 text-center">
                {errors?.name}
              </p>
            )}
            <input
              className="mt-1 p-2 rounded-xl border  focus:outline-none"
              type="text"
              name="email"
              value={useremail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="enter your email"
            />
            {errors?.email && (
              <p className="text-sm m-3 text-red-500 text-center">
                {errors?.email}
              </p>
            )}
            <input
              className="mt-1 p-2 rounded-xl border  focus:outline-none"
              type="text"
              value={userphone}
              onChange={(e) => setUserPhone(e.target.value)}
              name="phone"
              placeholder="enter phone number"
            />
            {errors?.phone && (
              <p className="text-sm m-3 text-red-500 text-center">
                {errors?.phone}
              </p>
            )}
            <input
              className="mt-1 p-2 rounded-xl border  focus:outline-none hidden"
              type="text"
              name="userId"
              placeholder="enter phone number"
            />
          </form>
          <Button
            className="bg-[#464B87] text-white py-2 rounded-xl mb-1 shadow-lg hover:scale-105 duration-300"
            onClick={handleSave}
          >
            Save
          </Button>
          <Button onClick={closeModal}>close</Button>
        </Box>
      </Modal>
    </div>
  );
}
