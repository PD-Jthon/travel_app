import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  ButtonGroup,
  TableBody,
  TableContainer,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { useUserState } from "../Atom/user";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CheckInOut from "../Calendar/CheckInOut";
import dayjs from "dayjs";
import GetCookieValue from "../GetCookie.jsx/GetCookie";
import { useAlert } from "../Alert/Alert";
import CancelModal from "./CancelModal";

const columns = [
  { id: "created_at", label: "作成日" },
  { id: "check-inout", label: "チェックイン / アウト" },
  {
    id: "hotel-name",
    label: "宿名",
  },
];

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

function ConvertDate(date) {
  let temp1 = date.replace("年", "-");
  let temp2 = temp1.replace("月", "-");
  let temp3 = temp2.replace("日", "");
  return temp3;
}

// 予約変更用の入力フォームを表示するためのモーダル
function ChildModal({
  handleChildModal,
  childModal,
  modalElem,
  setReservation,
  setOpen,
}) {
  const [checkInOutValue, setCheckInOutValue] = useState("");
  const [capacity, setCapacity] = useState();
  const [num, setNum] = useState();
  const { user, setUser } = useUserState();
  const { alert, setAlert } = useAlert();

  const handleCheckInOutChange = (value) => {
    setCheckInOutValue(value);
  };

  useEffect(() => {
    const checkIn = dayjs(ConvertDate(modalElem.check_in));
    const checkOut = dayjs(ConvertDate(modalElem.check_out));
    setNum(modalElem.num_people);

    handleCheckInOutChange([checkIn, checkOut]);
  }, []);

  // 宿の情報を取得して定員を以上を登録できないようにする
  useEffect(() => {
    axios({
      // url: `http://localhost:8000/top/get-hotel-info/${modalElem.hotel_name}`,
      url: `${process.env.REACT_APP_BASE_URL}/top/get-hotel-info/${modalElem.hotel_name}`,
      method: "GET",
    })
      .then((res) => {
        const maxCapacity = res.data[0].max_capacity;
        const tempCapacity = Number(maxCapacity.split("人")[0]);
        setCapacity(tempCapacity);
      })
      .catch((error) => console.log(error));
  }, []);

  const dateFormatter = (date) => {
    console.log(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const convertedDate = `${year}-${month}-${day}`;
    return convertedDate;
  };

  const handleSubmit = () => {
    const checkIn = dateFormatter(checkInOutValue[0]["$d"]);
    const checkOut = dateFormatter(checkInOutValue[1]["$d"]);
    const id = modalElem.id;
    axios({
      url: `${process.env.REACT_APP_BASE_URL}/top/change-reservation/${id}`,
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": GetCookieValue("csrftoken"),
      },
      method: "POST",
      data: {
        num_people: num,
        check_in: checkIn,
        check_out: checkOut,
      },
    })
      .then((res) => {
        setAlert({
          severity: "success",
          message: "予約を更新しました。",
        });
        handleChildModal();
        setOpen((prev) => !prev);

        const id = JSON.parse(user).pk;
        axios({
          url: `${process.env.REACT_APP_BASE_URL}/top/get-reservation/${id}`,
          method: "GET",
        })
          .then((res) => {
            setReservation(res.data);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error);
        setAlert({
          severity: "error",
          message: "予約の更新に失敗しました。",
        });
        handleChildModal();
        setOpen((prev) => !prev);
      });
  };

  const handleChangeNum = (e) => {
    const tempNum = Number(e.target.value);
    setNum(tempNum);
  };

  return (
    <React.Fragment>
      <Modal
        open={childModal}
        onClose={() => handleChildModal()}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <Grid container>
            <Grid xs={12} marginBottom={2}>
              チェックイン・チェックアウト
              <CheckInOut
                id="check_inout"
                name="check_inout"
                handleCheckInOutChange={handleCheckInOutChange}
                checkInOutValue={checkInOutValue}
              />
            </Grid>
            <Grid xs={12}>
              <Grid item marginBottom={1}>
                人数
              </Grid>
              <Grid item marginBottom={2}>
                <TextField
                  id="num_people"
                  name="num_people"
                  type="number"
                  size="small"
                  defaultValue={num}
                  fullWidth
                  InputProps={{
                    inputProps: { min: 1, max: capacity },
                  }}
                  onChange={(e) => handleChangeNum(e)}
                />
              </Grid>
              <Grid xs={12} justifyContent="center" display="flex">
                <Button
                  variant="contained"
                  sx={{ width: "100%" }}
                  onClick={() => handleSubmit()}
                >
                  決定
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function Reservation() {
  const { user, setUser } = useUserState();
  const [reservation, setReservation] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [modalElem, setModalElem] = useState();
  const [childModal, setChildModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [id, setID] = useState(0);
  const [deleteId, setDeleteId] = useState(0);

  // 子モーダルの開閉
  const handleChildModal = () => {
    setChildModal((prev) => !prev);
  };

  const handleCancelModal = () => {
    setCancelModal((prev) => !prev);
  };

  useEffect(() => {
    let myId = 0;
    if (!user) {
      // ここでユーザーの情報を紹介してsetUserでuserにデータを登録している
      axios({
        url: `${process.env.REACT_APP_BASE_URL}/dj-rest-auth/user/`,
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          setUser(res.data);
          const data = JSON.stringify(res.data);
          document.cookie = `user_info=${data}`;
          myId = JSON.parse(data).pk;
          setID(myId);
        })
        .catch((error) => console.log(error));
    } else {
      const getReservation = () => {
        const data = JSON.parse(GetCookieValue("user_info"));
        const id = data["pk"];
        axios({
          url: `${process.env.REACT_APP_BASE_URL}/top/get-reservation/${id}`,
          method: "GET",
        })
          .then((res) => {
            setReservation(res.data);
          })
          .catch((error) => console.log(error));
      };
      getReservation();
    }
  }, []);

  const MyTableRow = styled(TableRow)({
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "rgb(245, 245, 245)",
    },
  });

  const handleReservation = (elem) => {
    setModalElem({
      id: elem.id,
      created_at: elem.created_at,
      user_name: elem.user_name,
      check_in: elem.check_in,
      check_out: elem.check_out,
      hotel_name: elem.hotel_name,
      num_people: elem.num_people,
    });
    handleOpen();
  };

  return (
    <Container sx={{ marginTop: 13 }} maxWidth="md">
      <h1>予約一覧</h1>
      <TableContainer>
        <Table>
          <TableHead style={{ maxHeight: 30 }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell style={{ fontWeight: 600 }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {reservation.map((elem) =>
              deleteId !== elem.id ? (
                <>
                  <MyTableRow
                    id={elem.id}
                    hover
                    onClick={(e) => handleReservation(elem, e)}
                  >
                    <TableCell>
                      {elem.updated_at ? elem.updated_at : elem.created_at}
                    </TableCell>
                    <TableCell>
                      {elem.check_in} ~ {elem.check_out}
                    </TableCell>
                    <TableCell>{elem.hotel_name}</TableCell>
                  </MyTableRow>
                </>
              ) : null
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {open && (
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell style={{ fontWeight: 600 }}>
                          宿泊者氏名
                        </TableCell>
                        <TableCell id="user-name">
                          {modalElem.user_name}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ fontWeight: 600 }}>宿名</TableCell>
                        <TableCell id="hotel-name">
                          {modalElem.hotel_name}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ fontWeight: 600 }}>
                          宿泊日
                        </TableCell>
                        <TableCell id="check-inout">
                          {modalElem.check_in} ~ {modalElem.check_out}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ fontWeight: 600 }}>人数</TableCell>
                        <TableCell id="num_people">
                          {modalElem.num_people}人
                        </TableCell>
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
                        handleCancelModal();
                      }}
                    >
                      キャンセル
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleChildModal()}
                    >
                      変更する
                    </Button>
                  </ButtonGroup>
                </div>
                <ChildModal
                  handleChildModal={handleChildModal}
                  childModal={childModal}
                  modalElem={modalElem}
                  setReservation={setReservation}
                  setOpen={setOpen}
                />
                <CancelModal
                  handleCancelModal={handleCancelModal}
                  cancelModal={cancelModal}
                  reservation={reservation}
                  modalElem={modalElem}
                  setOpen={setOpen}
                  setReservation={setReservation}
                  deleteId={deleteId}
                  setDeleteId={setDeleteId}
                />
              </Box>
            </Fade>
          </Modal>
        </div>
      )}
    </Container>
  );
}
