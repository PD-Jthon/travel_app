import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

export default function HalfRating(props) {
  // console.log(props.score)
  const score = `${props.score}.0`
  const numScore = Number(score);
  // console.log(score);

  return (
    <Stack spacing={1}>
      {/* <Rating name="half-rating" defaultValue={2.5} precision={0.5} /> */}
      <Rating
        name="half-rating-read"
        defaultValue={numScore}
        precision={0.5}
        readOnly
      />
    </Stack>
  );
}
