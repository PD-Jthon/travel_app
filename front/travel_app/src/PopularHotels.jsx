import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Rating from "./Common/Rating";

export default function PopularHotels() {
  const [hotel, setHotel] = useState([]);

  useEffect(() => {
    const getPopHotels = () => {
      axios({
        url: `${process.env.REACT_APP_BASE_URL}/top`,
        method: "GET",
      })
        .then((res) => setHotel(res.data))
        .catch((error) => console.log(error));
    };
    getPopHotels();
  }, []);
  // console.log(hotel);

  return (
    <>
      <h2>人気急上昇！注目の宿</h2>
      <Box>
        <Grid
          container
          spacing={4}
          sx={{
            flexDirection: {
              sm: "column",
              md: "row",
            },
          }}
        >
          {hotel.map((elem) => (
            <>
              <Grid
                item
                xs={12}
                lg={3}
                md={4}
                sx={{
                  display: {
                    xs: "flex",
                  },
                  justifyContent: {
                    xs: "center",
                  },
                }}
              >
                <Link
                  style={{ textDecoration: "none" }}
                  to={`top/detail/${elem.id}`}
                >
                  <Card sx={{ width: "100%", marginTop: 5, height: "auto" }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height=""
                        // image={`http://localhost:8000/${elem.photo}`}
                        image={`${process.env.REACT_APP_BASE_URL}media_file/${elem.photo}`}
                        alt="green iguana"
                        sx={{ height: "50%", fitContent: "cover" }}
                      />
                      <CardContent sx={{ height: "50%" }}>
                        <Typography gutterBottom variant="h6" component="div">
                          {/* <Grid container alignItems="center" direction="row"> */}
                          <Rating score={elem.score} />
                          {elem.name}
                          {/* </Grid> */}
                        </Typography>
                        <Typography variant="body3" color="text.secondary">
                          {elem.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </Grid>
            </>
          ))}
        </Grid>
      </Box>
    </>
  );
}
