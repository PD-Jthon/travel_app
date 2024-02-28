import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

export default function HalfRating(props) {
  const score = `${props.score}.0`;
  const numScore = Number(score);

  return (
    <Stack spacing={1}>
      <Rating
        name="half-rating-read"
        defaultValue={numScore}
        precision={0.5}
        readOnly
      />
    </Stack>
  );
}
