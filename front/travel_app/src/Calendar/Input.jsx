import React, { useState } from "react";
import { Input as BaseInput } from "@mui/base/Input";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { SearchAtom } from "../Atom/SearchResultAtom";
import { useRecoilState } from "recoil";

const Input = React.forwardRef(function CustomInput(props, inputRef) {
  return (
    <BaseInput slots={{ input: InputElement }} {...props} ref={inputRef} />
  );
});

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const InputElement = styled("input")(
  ({ theme }) => `

  @media screen and (max-width: 600px) {
    width: 70vw;
  }
  @media screen and (min-width: 800px) {
    width: 40vw;
  }
  @media screen and (min-width: 1200px) {
    width: 30vw;
  }
  width: 80vw;

  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 15px;
  font-weight: 400;
  // line-height: 1.5;
  padding: 10px 10px 10px 10px;
  border-radius: 8px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  border-radius: 5px 0 0 5px;
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[600] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

const Submit = ({ onClick, inputValue }) => (
  <Stack direction="row">
    <Link to={"/top/search-word"} state={{ state: inputValue }}>
      <Button
        onClick={onClick}
        variant="contained"
        style={{
          fontSize: "20px",
          height: 45,
          alignItems: "center",
          borderRadius: "0 5px 5px 0",
        }}
      >
        検索
      </Button>
    </Link>
  </Stack>
);

export default function UnstyledInputIntroduction() {
  const navigate = useNavigate();
  const [hotel, setHotel] = useState([]);
  const [inputValue, setInputValue] = useState();

  const [search, setSearch] = useRecoilState(SearchAtom);

  const handleSubmit = (value) => {
    setSearch(value);
    axios({
      // url: `http://localhost:8000/top/search-word/${value}`,
      url: `${process.env.REACT_APP_BASE_URL}/top/search-word/${value}`,
      method: "GET",
    })
      .then((res) => navigate("/top/search-word"))
      .catch((error) => console.log(error));
  };

  const [composing, setComposition] = useState(false);
  const startComposition = () => setComposition(true);
  const endComposition = () => setComposition(false);

  const onKeydown = (key) => {
    console.log(key);
    switch (key) {
      case "Enter":
        if (composing) break;
        handleSubmit(inputValue);
        break;
    }
  };

  return (
    <>
      <Grid container>
        <Grid item>
          <Input
            aria-label="Demo input"
            placeholder="キーワードで検索"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            inputProps={{ sx: { borderRadius: "5px 0 0 5px" } }}
            onCompositionStart={startComposition}
            onCompositionEnd={endComposition}
            onKeyPress={(key) => {
              if (key.key === "Enter") {
                onKeydown(key.key);
              }
            }}
          />
        </Grid>
        <Grid item>
          <Submit
            style={{ textDecoration: 'none' }}
            inputValue={inputValue}
            onClick={() => handleSubmit(inputValue)}
          />
        </Grid>
      </Grid>
    </>
  );
}
