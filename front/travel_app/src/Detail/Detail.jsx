import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Container } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import { LoggedInState } from "../Atom/atom";
import CheckInOut from "../Calendar/CheckInOut";
import { useUserState } from "../Atom/user";
import BasicModal from "./ConfirmResevation";
import { useForm } from "react-hook-form";
import GetCookieValue from "../GetCookie.jsx/GetCookie";

const MyContainer = styled(Container)`
  display: flex;
  justify-content: center;
  margin: 30px;
  margin-top: 30px;
  // margin-top: 400px;
`;

const HoverLink = styled.a`
  text-decoration: none;
  color: #3ca3ba;
  transition: color 0.2s;
  &:hover {
    color: #317585;
  }
`;

const LoginBeforeReservation = () => (
  // todo: loginしている場合はチェックイン・チェックアウトに表示が切り替わる
  <Paper elevation={3} sx={{ padding: 2 }}>
    <Grid container>
      <Grid xs={12} marginBottom={1}>
        予約するには
        <Link to={`/login`} style={{ textDecoration: "none" }}>
          <HoverLink>ログイン</HoverLink>
        </Link>
        が必要がです。
      </Grid>
      <Grid xs={12} justifyContent="center" display="flex">
        <Button variant="contained" sx={{ width: "100%" }} deactive>
          予約する
        </Button>
      </Grid>
    </Grid>
  </Paper>
);

const ReservationForm = ({
  handleDatePicker,
  pk,
  numPeople,
  setReservation,
  submit,
  ModalToggler,
  handleSetRawReservation,
}) => {
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [checkInOutValue, setCheckInOutValue] = useState(null);
  const { user, setUser } = useUserState();
  const [date, setDate] = useState();
  const {
    getValues,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const ConvertDate = (date) => {
    console.log(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const convertedDate = `${year}-${month}-${day}`;
    return convertedDate;
  };

  // 予約確認モーダル開閉用のステート
  // todo: モーダルにpropsで渡して開閉させるためのハンドラーを作成する必要がある

  console.log(numPeople);
  const maxNum = Number(numPeople.replace("人", ""));
  console.log(maxNum);

  const handleTextFieldChange = (e) => {
    console.log(e.target.value);
    setNumberOfPeople(e.target.value);
  };

  const handleCheckInOutChange = (value) => {
    setCheckInOutValue(value);
  };

  const handleReservation = ({ props }) => {
    // numberOfPeople と checkInOutValue を使って何かしらの処理を行う
    console.log("Number of People:", numberOfPeople);
    console.log("Check In/Out Value:", checkInOutValue);
    console.log(checkInOutValue[0], checkInOutValue[1]);
    console.log("user", user);

    const checkIn = ConvertDate(checkInOutValue[0]["$d"]);
    const checkOut = ConvertDate(checkInOutValue[1]["$d"]);

    handleSetRawReservation({
      user: user["pk"],
      hotel: pk,
      num_people: numberOfPeople,
      check_in: checkIn,
      check_out: checkOut,
    });

    const jstOffset = 9 * 60 * 60 * 1000; // 日本時間のオフセット（9時間）
    console.log("checkInOutValue", checkInOutValue);

    axios({
      // url: "http://localhost:8000/top/confirm-reservation/",
      url: `${process.env.REACT_APP_BASE_URL}/top/confirm-reservation/`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": GetCookieValue("csrftoken"),
      },
      data: {
        // user: JSON.parse(user).pk,
        user: user["pk"],
        hotel: pk,
        num_people: numberOfPeople,
        check_in: checkIn,
        check_out: checkOut,
      },
    })
      .then((res) => {
        setReservation(res.data);
        ModalToggler(true);
      })
      .catch((error) => console.log(error));

    // todo: modalで入力値を捕捉してユーザーがokを押した場合にDBにデータを登録するようにする
  };

  return (
    <>
      <Paper elevation={5} sx={{ padding: 2, borderRadius: 2 }}>
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
                fullWidth
                InputProps={{ inputProps: { min: 1, max: `${maxNum}` } }}
                {...register("num_people", {
                  required: {
                    value: true,
                    message: "必須の入力項目です。",
                  },
                })}
                value={numberOfPeople}
                onChange={(e) => handleTextFieldChange(e)}
              />
              {errors.num_people && (
                <span
                  style={{ fontSize: "12px", color: "red", marginLeft: "12px" }}
                >
                  {errors.num_people.message}
                </span>
              )}
            </Grid>
            <Grid xs={12} justifyContent="center" display="flex">
              <Button
                variant="contained"
                sx={{ width: "100%" }}
                onClick={handleSubmit(handleReservation)}
              >
                予約する
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default function Detail() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoggedInState);
  const [detail, setDetail] = useState([]);
  const [date, setDate] = useState();
  const [open, setOpen] = React.useState(false);
  const [reservation, setReservation] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [rawReservation, setRawReservation] = useState([]);

  // 整形後の予約データを格納
  const SetReservation = (reservation) => {
    setReservation(reservation);
  };

  // modalでsubmitを押したときDBに登録する時に整形される前の予約データ
  const handleSetRawReservation = (data) => {
    setRawReservation(data);
  };

  console.log(reservation);

  const handleDatePicker = (props) => {
    console.log(props);
  };

  const pk = useParams()["pk"];

  useEffect(() => {
    const getHotelDetail = () => {
      axios({
        // url: `http://localhost:8000/top/detail/${pk}`,
        url: `${process.env.REACT_APP_BASE_URL}/top/detail/${pk}`,
        method: "GET",
      })
        .then((res) => setDetail(res.data))
        .catch((error) => console.log(error));
    };
    getHotelDetail();
  }, []);

  const headCell = {
    fontWeight: 600,
  };

  const TitleCell = styled(TableCell)`
    @media screen and (min-width: 800px) {
      width: 20%;
      font-weight: 600;
    }
    @media screen and (max-width: 600px) {
      width: 30%;
      font-weight: 600;
    }
    width: 20%;
    padding: 10px;
    font-weight: 600;
  `;

  const ElemCell = styled(TableCell)`
    @media screen and (min-width: 800px) {
      width: 80%;
    }
    @media screen and (max-width: 600px) {
      width: 70%;
    }
    width: 80%;
    padding: 10px;
  `;

  const ModalToggler = () => {
    setOpen((prev) => !prev);
  };

  const handleSubmit = (isSubmit) => {
    setSubmit(isSubmit);
  };

  return (
    <>
      {/* <Header2 /> */}
      {detail.map((elem) => (
        <>
          <Container
            style={{
              display: "flex",
              justifyContent: "center",
              maxWidth: 1000,
              marginTop: 120,
            }}
          >
            <Grid
              container
              direction="column"
              alignCenter="center"
              justifyContent="center"
            >
              <Grid
                item
                marginBottom={5}
                display="flex"
                justifyContent="center"
              >
                <h1>{elem.name}</h1>
              </Grid>
              <Grid item>
                <Card sx={{}}>
                  <CardMedia
                    component="img"
                    height="140"
                    // image={`http://localhost:8000/${elem.photo}`}
                    image={`${process.env.REACT_APP_BASE_URL}/${elem.photo}`}
                    alt="green iguana"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                    }}
                  />
                </Card>
              </Grid>
              <Grid container>
                <Grid item md={8}>
                  <TableContainer style={{ paddingTop: 20 }}>
                    <Table sx={{ maxWidth: "100%" }} aria-label="simple table">
                      <TableBody>
                        <TableRow
                          key=""
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TitleCell
                            component="th"
                            scope="row"
                            align=""
                            style={headCell}
                          >
                            宿名
                          </TitleCell>
                          <ElemCell align="start">{elem.name}</ElemCell>
                        </TableRow>

                        <TableRow
                          key=""
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TitleCell
                            component="th"
                            scope="row"
                            align=""
                            style={headCell}
                          >
                            説明
                          </TitleCell>
                          <ElemCell align="start">{elem.description}</ElemCell>
                        </TableRow>
                        <TableRow
                          key=""
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TitleCell
                            component="th"
                            scope="row"
                            align=""
                            style={headCell}
                          >
                            宿泊料金
                          </TitleCell>
                          <ElemCell align="">{elem.price_range}</ElemCell>
                        </TableRow>
                        <TableRow
                          key=""
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TitleCell
                            component="th"
                            scope="row"
                            align=""
                            style={headCell}
                          >
                            定員
                          </TitleCell>
                          <ElemCell align="">{elem.max_capacity}</ElemCell>
                        </TableRow>
                        <TableRow
                          key=""
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TitleCell
                            component="th"
                            scope="row"
                            align=""
                            style={headCell}
                          >
                            郵便番号
                          </TitleCell>
                          <ElemCell align="">{elem.zip_number}</ElemCell>
                        </TableRow>
                        <TableRow
                          key=""
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TitleCell
                            component="th"
                            scope="row"
                            align=""
                            style={headCell}
                          >
                            住所
                          </TitleCell>
                          <ElemCell align="">{elem.address}</ElemCell>
                        </TableRow>
                        <TableRow
                          key=""
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TitleCell
                            component="th"
                            scope="row"
                            align=""
                            style={headCell}
                          >
                            電話番号
                          </TitleCell>
                          <ElemCell align="">{elem.phone_number}</ElemCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item md={4} xs={12}>
                  {isLoggedIn ? (
                    <>
                      <MyContainer>
                        <ReservationForm
                          pk={pk}
                          numPeople={elem.max_capacity}
                          setReservation={SetReservation}
                          submit={submit}
                          ModalToggler={ModalToggler}
                          handleSetRawReservation={handleSetRawReservation}
                        />
                      </MyContainer>
                    </>
                  ) : (
                    <>
                      <MyContainer>
                        <LoginBeforeReservation />
                      </MyContainer>
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Container>
          {open && (
            <BasicModal
              ModalToggler={ModalToggler}
              reservation={reservation}
              setSubmit={handleSubmit}
              rawReservation={rawReservation}
            ></BasicModal>
          )}
        </>
      ))}
    </>
  );
}
