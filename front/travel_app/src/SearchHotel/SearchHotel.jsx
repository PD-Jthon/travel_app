import axios from "axios";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  CardActionArea,
  Container,
  FormLabel,
  Grid,
  ListSubheader,
  Paper,
  TextField,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { SearchAtom } from "../Atom/SearchResultAtom";
import { useRecoilState } from "recoil";
import { SearchQuery } from "../Atom/SeachQuery";
import GetCookieValue from "../GetCookie.jsx/GetCookie.jsx";
import BasicPagination from "./Pagination";

const MyCard = styled(Card)`
  height: 300px;

  @media screen and (max-width: 600px) {
    display: block;
  }

  @media screen and (min-width: 601px) {
    display: flex;
  }
`;

const MyCardMedia = styled(CardMedia)`
  @media screen and (max-width: 600px) {
    width: 100%;
    height: 50%;
    fit-content: cover;
  }

  @media screen and (min-width: 601px) {
    width: 40% !important;
    fit-content: cover;
  }
`;

const MyBox = styled(Box)`
  @media screen and (max-width: 600px) {
    width: 100%;
    height: 50%;
  }

  @media screen and (min-width: 601px) {
    width: 60%;
  }
`;

const areaOptions = {
  1: "北海道",
  2: "青森県",
  3: "岩手県",
  4: "茨城県",
  5: "栃木県",
  6: "群馬県",
  7: "埼玉県",
  8: "千葉県",
  9: "東京都",
  10: "神奈川県",
  11: "新潟県",
  12: "山梨県",
  13: "長野県",
  14: "富山県",
  15: "石川県",
  16: "福井県",
  17: "岐阜県",
  18: "静岡県",
  19: "愛知県",
  20: "三重県",
  21: "滋賀県",
  22: "京都府",
  23: "大阪府",
  24: "兵庫県",
  25: "奈良県",
  26: "和歌山県",
  27: "鳥取県",
  28: "島根県",
  29: "岡山県",
  30: "広島県",
  31: "山口県",
  32: "徳島県",
  33: "香川県",
  34: "愛媛県",
  35: "高知県",
  36: "福岡県",
  37: "佐賀県",
  38: "長崎県",
  39: "熊本県",
  40: "大分県",
  41: "宮崎県",
  42: "鹿児島県",
  43: "沖縄県",
};

const priceOption = {
  1: 6000,
  2: 7000,
  3: 8000,
  4: 9000,
  5: 10000,
};

export default function SearchHotel() {
  const [word, setWord] = useState([]);
  const [query, setQuery] = useRecoilState(SearchQuery);
  const inputRef = useRef(null);
  const { state } = useLocation();
  const [search, setSearch] = useRecoilState(SearchAtom); // top画面の検索文字列が格納されている
  const [pref, setPref] = useState();
  const [prefValue, setPrefValue] = useState(); // ブラウザバックした時に検索の履歴を記憶しておく
  const [numOfQuery, setNumOfQuery] = useState(); // クエリの数を表示するために使用するステート
  const [priceValue, setPriceValue] = useState();
  const [rawPrice, setRawPrice] = useState();

  // 検索結果があるかどうかを確認するためにsessionに検索結果を保持している
  const session = JSON.parse(sessionStorage.getItem("searchResult"));

  useEffect(() => {
    if (search && !session) {
      axios({
        url: `${process.env.REACT_APP_BASE_URL}/top/search-word/${search}`,
        method: "GET",
      })
        .then((res) => {
          setQuery(res.data);
          setNumOfQuery(res.data.length);
          sessionStorage.setItem("searchWord", JSON.stringify(search));
          sessionStorage.setItem("searchResult", JSON.stringify(res.data));
        })
        .catch((error) => console.log(error));
    }
    return;
  }, [search]);

  // 詳細画面から帰ってきたとき検索していたレコードを復元するための処理
  useEffect(() => {
    const searchItem = JSON.parse(sessionStorage.getItem("searchResult"));
    let searchWord = sessionStorage.getItem("searchWord");
    if (searchItem) {
      setQuery(searchItem);
      setNumOfQuery(searchItem.length)
      setWord(searchWord);
    }
  }, []);

  // { state }トップページの検索ボタン押下時にここに検索ボックスの文字列が格納される
  useEffect(() => {
    if (state && !session) {
      const temp = state.state;
      setWord(state.state);
      axios({
        url: `${process.env.REACT_APP_BASE_URL}/top/search-word/${temp}`,
        method: "GET",
      })
        .then((res) => {
          setQuery(res.data);
          setNumOfQuery(res.data.length);
          sessionStorage.setItem("searchResult", JSON.stringify(res.data));
          sessionStorage.setItem("searchWord", JSON.stringify(search));
        })
        .catch((error) => console.log(error));
    }
    return;
  }, []);

  // 検索画面の検索ボックスのサブミット時の処理(enter押下時、submitボタン押下時どちらにも対応)
  const handleSubmit = () => {
    let value = inputRef.current.value;
    if (value === "") {
      value = "undefined";
    }
    sessionStorage.setItem("searchWord", JSON.stringify(value));
    axios({
      url: `${process.env.REACT_APP_BASE_URL}/top/search-word/${value}`,
      method: "GET",
    })
      .then((res) => {
        setQuery(res.data);
        setNumOfQuery(res.data.length);
        sessionStorage.setItem(
          "searchResult",
          JSON.stringify(res.data)
        );
      })
      .catch((error) => console.log(error));
  };

  // 日本語入力が終わったかどうかを判断するためのステート群
  const [composing, setComposition] = useState(false);
  const startComposition = () => setComposition(true);
  const endComposition = () => setComposition(false);

  const onKeydown = (key) => {
    switch (key) {
      case "Enter":
        if (composing) break;
        handleSubmit();
        break;
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const prefecture = areaOptions[value];
    document.cookie = `pref=${value}`;
    setPref(prefecture);
  };

  // 予算から探すの部分に対応している
  // selectの番号をセットしている(setPriceValueステートにセットしている)
  const handlePriceChange = (e) => {
    const price = priceOption[e.target.value];
    setRawPrice(price);
    setPriceValue(e.target.value);
    sessionStorage.setItem("price", price);
  };

  const handlePriceSearch = () => {
    axios({
      url: `${process.env.REACT_APP_BASE_URL}/top/search-price/${rawPrice}`,
      method: "GET",
    })
      .then((res) => {
        setQuery(res.data);
        setNumOfQuery(res.data.length);
        sessionStorage.setItem("searchResult", JSON.stringify(res.data));
      })
      .catch((error) => console.log(error));
  };

  const handlePrefSearch = () => {
    axios({
      url: `${process.env.REACT_APP_BASE_URL}/top/search/${pref}`,
      method: "GET",
    })
      .then((res) => {
        setQuery(res.data);
        setNumOfQuery(res.data.length);
        sessionStorage.setItem("searchResult", JSON.stringify(res.data));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const cookiePref = GetCookieValue("pref");
    if (cookiePref) {
      setPrefValue(pref);
    }
  }, []);

  return (
    <>
      <Container style={{ marginTop: 200 }}>
        <Grid container spacing={4}>
          <Grid item md={4} xs={12}>
            <Grid container style={{ marginBottom: 20 }}>
              <Grid md={9} xs={8}>
                <TextField
                  size="small"
                  placeholder="民宿名・目的地"
                  sx={{ width: "100%" }}
                  inputRef={inputRef}
                  inputProps={{ sx: { borderRadius: "5px 0 0 5px" } }}
                  onCompositionStart={startComposition}
                  onCompositionEnd={endComposition}
                  onKeyPress={(key) => {
                    if (key.key === "Enter") {
                      onKeydown(key.key);
                    }
                  }}
                  defaultValue={word}
                />
              </Grid>
              <Grid md={3} xs={4}>
                <Button
                  variant="contained"
                  style={{
                    width: "100%",
                    fontSize: "16px",
                    height: 39,
                    alignItems: "center",
                    borderRadius: "0 5px 5px 0",
                  }}
                  onClick={() => handleSubmit()}
                  alignItems="center"
                >
                  検索
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={8} xs={12} sx={{ marginBottom: 2 }}>
            検索結果 : {numOfQuery ? numOfQuery : 0}件
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item md={4} xs={12}>
            <Paper
              sx={{
                padding: 2,
                borderRadius: "5px 5px 5px 5px",
                marginBottom: 2,
              }}
              elevation={3}
            >
              <Box sx={{}}>
                <Grid>
                  <Grid item md={12}>
                    <FormControl fullWidth size="small">
                      <FormLabel sx={{ marginBottom: 2 }}>
                        エリアから探す
                      </FormLabel>
                      <InputLabel id="demo-simple-select-label" />
                      <Select
                        sx={{ marginBottom: 2 }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={handleChange}
                        value={prefValue}
                      >
                        <ListSubheader>北海道</ListSubheader>
                        <MenuItem value={1}>北海道</MenuItem>
                        <ListSubheader>東北</ListSubheader>
                        <MenuItem value={2}>青森県</MenuItem>
                        <MenuItem value={3}>岩手県</MenuItem>
                        <ListSubheader>北関東</ListSubheader>
                        <MenuItem value={4}>茨城県</MenuItem>
                        <MenuItem value={5}>栃木県</MenuItem>
                        <MenuItem value={6}>群馬県</MenuItem>
                        <ListSubheader>首都圏</ListSubheader>
                        <MenuItem value={7}>埼玉県</MenuItem>
                        <MenuItem value={8}>千葉県</MenuItem>
                        <MenuItem value={9}>東京都</MenuItem>
                        <MenuItem value={10}>神奈川県</MenuItem>
                        <ListSubheader>甲信越</ListSubheader>
                        <MenuItem value={11}>新潟県</MenuItem>
                        <MenuItem value={12}>山梨県</MenuItem>
                        <MenuItem value={13}>長野県</MenuItem>
                        <ListSubheader>北陸</ListSubheader>
                        <MenuItem value={14}>富山県</MenuItem>
                        <MenuItem value={15}>石川県</MenuItem>
                        <MenuItem value={16}>福井県</MenuItem>
                        <ListSubheader>東海</ListSubheader>
                        <MenuItem value={17}>岐阜県</MenuItem>
                        <MenuItem value={18}>静岡県</MenuItem>
                        <MenuItem value={19}>愛知県</MenuItem>
                        <MenuItem value={20}>三重県</MenuItem>
                        <ListSubheader>近畿</ListSubheader>
                        <MenuItem value={21}>滋賀県</MenuItem>
                        <MenuItem value={22}>京都府</MenuItem>
                        <MenuItem value={23}>大阪府</MenuItem>
                        <MenuItem value={24}>兵庫県</MenuItem>
                        <MenuItem value={25}>奈良県</MenuItem>
                        <MenuItem value={26}>和歌山県</MenuItem>
                        <ListSubheader>山陽・山陰</ListSubheader>
                        <MenuItem value={27}>鳥取県</MenuItem>
                        <MenuItem value={28}>島根県</MenuItem>
                        <MenuItem value={29}>岡山県</MenuItem>
                        <MenuItem value={30}>広島県</MenuItem>
                        <MenuItem value={31}>山口県</MenuItem>
                        <ListSubheader>四国</ListSubheader>
                        <MenuItem value={32}>徳島県</MenuItem>
                        <MenuItem value={33}>香川県</MenuItem>
                        <MenuItem value={34}>愛媛県</MenuItem>
                        <MenuItem value={35}>高知県</MenuItem>
                        <ListSubheader>九州</ListSubheader>
                        <MenuItem value={36}>福岡県</MenuItem>
                        <MenuItem value={37}>佐賀県</MenuItem>
                        <MenuItem value={38}>長崎県</MenuItem>
                        <MenuItem value={39}>熊本県</MenuItem>
                        <MenuItem value={40}>大分県</MenuItem>
                        <MenuItem value={41}>宮崎県</MenuItem>
                        <MenuItem value={42}>鹿児島県</MenuItem>
                        <ListSubheader>沖縄</ListSubheader>
                        <MenuItem value={43}>沖縄県</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      style={{
                        fontSize: "20px",
                        height: 39,
                        alignItems: "center",
                      }}
                      alignItems="center"
                      onClick={() => handlePrefSearch()}
                    >
                      検索
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
            <Paper
              sx={{ padding: 2, borderRadius: "5px 5px 5px 5px" }}
              elevation={3}
            >
              <Box>
                <Grid>
                  <Grid item md={12}>
                    <FormControl fullWidth size="small">
                      <FormLabel sx={{ marginBottom: 2 }}>
                        予算から探す
                      </FormLabel>
                      <InputLabel id="demo-simple-select-label" />
                      <Select
                        sx={{ marginBottom: 2 }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={priceValue}
                        onChange={(e) => handlePriceChange(e)}
                      >
                        <MenuItem value={1}>6,000円以内</MenuItem>
                        <MenuItem value={2}>7,000円以内</MenuItem>
                        <MenuItem value={3}>8,000円以内</MenuItem>
                        <MenuItem value={4}>9,000円以内</MenuItem>
                        <MenuItem value={5}>10,000円以内</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      style={{
                        fontSize: "20px",
                        height: 39,
                        alignItems: "center",
                      }}
                      alignItems="center"
                      onClick={() => handlePriceSearch()}
                    >
                      検索
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          <Grid item md={8} xs={12} sx={{ width: "100%", height: "100%" }}>
            {query.map((elem) => (
              <>
                <CardActionArea sx={{ marginBottom: 3 }}>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/top/detail/${elem.id}`}
                  >
                    <MyCard
                      elevation={5}
                      style={{ border: "1px solid rgba(0, 0, 0, 0.3)" }}
                    >
                      <MyCardMedia
                        component="img"
                        image={`${process.env.REACT_APP_BASE_URL}/${elem.photo}`}
                        alt="Live from space album cover"
                      />
                      <MyBox>
                        <CardContent sx={{ flex: "1 0 auto" }}>
                          <Typography component="div" variant="h6">
                            {elem.name}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                            sx={{ fontSize: "13px", marginBottom: 0.5 }}
                          >
                            {elem.description}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                            sx={{ fontSize: "13px" }}
                          >
                            {elem.address}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                            sx={{ fontSize: "13px", marginBottom: 1 }}
                          >
                            {elem.price_range}/泊
                          </Typography>
                        </CardContent>
                      </MyBox>
                    </MyCard>
                  </Link>
                </CardActionArea>
              </>
            ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
