import React from "react";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { ButtonGroup } from "@mui/material";
import axios from "axios";
import { useAlert } from "../Alert/Alert";
import GetCookieValue from "../GetCookie.jsx/GetCookie";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CancelModal({
  handleCancelModal,
  cancelModal,
  modalElem,
  setOpen,
  setReservation,
}) {
  console.log(modalElem);
  const { alert, hideAlert, setAlert } = useAlert();

  const getReservation = () => {
    const data = JSON.parse(GetCookieValue("user_info"));
    console.log(data);
    const id = data["pk"];
    axios({
      url: `http://localhost:8000/top/get-reservation/${id}`,
      method: "GET",
    })
      .then((res) => {
        setReservation(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  const hanldeDeleteReservation = () => {
    const id = modalElem.id;
    axios({
      url: `http://localhost:8000/top/delete-reservation/${id}`,
      method: "GET",
    })
      .then((res) => {
        setAlert({
          severity: "success",
          message: "予約をキャンセルしました。",
        });
        getReservation();
        handleCancelModal();
        setOpen((prev) => !prev);
      })
      .catch((error) => console.log(error));
  };

  return (
    <React.Fragment>
      {/* <Button>Open Child Modal</Button> */}
      <Modal
        open={cancelModal}
        onClose={() => handleCancelModal()}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <Grid container>
            <Grid xs={12} marginBottom={2}>
              この予約をキャンセルしますか？
            </Grid>
            <Grid xs={12}>
              <Grid item marginBottom={2}></Grid>
              <Grid xs={12} justifyContent="center" display="flex">
                <ButtonGroup sx={{ width: "100%" }}>
                  <Button
                    variant="contained"
                    sx={{ width: "50%" }}
                    onClick={() => handleCancelModal()}
                  >
                    戻る
                  </Button>
                  <Button
                    variant="contained"
                    s
                    color="error"
                    sx={{ width: "50%" }}
                    onClick={() => hanldeDeleteReservation()}
                  >
                    決定
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
