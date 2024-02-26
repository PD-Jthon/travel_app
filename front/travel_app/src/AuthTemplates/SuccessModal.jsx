import { useNavigate } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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

export default function SuccessModal({
  ModalOpen,
  setModalOpen,
  children,
  isSuccess,
}) {
  const navigate = useNavigate();
  const closeModal = () => {
    if (isSuccess) {
      navigate("/");
    } else {
      navigate("/sign_up/");
    }
    setModalOpen(false);
  };

  if (ModalOpen) {
    return (
      <>
        <Modal
          open={ModalOpen}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, fontSize: "15px" }}
            >
              {children}
            </Typography>
          </Box>
        </Modal>
      </>
    );
  }
}
