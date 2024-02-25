import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import { ButtonGroup, TableBody, TableContainer } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { alertState } from "../Alert/Alert";
import SuccessModal from "../AuthTemplates/SuccessModal";
import { useRecoilState } from "recoil";

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

export default function BasicModal({
  ModalToggler,
  reservation,
  setSubmit,
  handleSetRawReservation,
  rawReservation,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [alert, setAlert] = useRecoilState(alertState);

  const handleSaveReservation = () => {
    console.log(rawReservation);
    axios({
      // url: "http://localhost:8000/top/reservation/",
      url: `${process.env.REACT_APP_BASE_URL}/top/reservation/`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: rawReservation,
    })
      .then((res) => {
        console.log('51', res.data);
        ModalToggler(false);
        setAlert({
          severity: "success",
          message: "予約しました。",
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div id="overlay" onClick={() => ModalToggler()}>
        <div
          id="content"
          onClick={(e) => e.stopPropagation()}
          style={{ border: "2px solid rgb(0 0 0)", maxWidth: 600 }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3>予約確認</h3>
          </div>
          <Box>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ fontWeight: 600 }}>
                      宿泊者氏名
                    </TableCell>
                    <TableCell>{reservation.user_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: 600 }}>宿名</TableCell>
                    <TableCell>{reservation.hotel_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: 600 }}>宿泊日</TableCell>
                    <TableCell>
                      {reservation.check_in} - {reservation.check_out}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: 600 }}>人数</TableCell>
                    <TableCell>{reservation.num_people}人</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 15,
              }}
            >
              <ButtonGroup
                disableElevation
                variant="contained"
                aria-label="Disabled elevation buttons"
              >
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    ModalToggler(false);
                    setSubmit(false);
                  }}
                >
                  キャンセル
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleSaveReservation()}
                >
                  予約する
                </Button>
              </ButtonGroup>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
}
