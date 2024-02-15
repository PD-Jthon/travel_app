import React, { useState } from "react";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useEffect } from "react";
import {
  ConstructionOutlined,
  Cookie,
  LocalConvenienceStoreOutlined,
} from "@mui/icons-material";
import { handleBreakpoints } from "@mui/system";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import "dayjs/locale/ja";

const WrappedSingleInputDateRangeField = React.forwardRef((props, ref) => {
  // useEffect(() => {
  //   setDate({
  //     checkIn: props.value[0],
  //     checkOut: props.value[1],
  //   });
  // }, []);

  // console.log(date);

  return <SingleInputDateRangeField size="small" {...props} ref={ref} />;
});

WrappedSingleInputDateRangeField.fieldType = "single-input";

export default function WrappedSingleInputDateRangePicker(props) {
  const { handleCheckInOutChange, checkInOutValue } = props;
  const handleChange = (event) => {
    console.log(event);
    const date = event;
    handleCheckInOutChange(date);
  };
  const [temp, setTemp] = useState();
  // console.log(checkInOutValue);

  useEffect(() => {
    const today = dayjs(); // Dayjsオブジェクトを取得
    setTemp([today, today]);
  }, []);

  console.log(checkInOutValue);
  // console.log(temp);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ja"}>
      <DemoContainer components={["SingleInputDateRangeField"]}>
        <DateRangePicker
          defaultValue={checkInOutValue ? checkInOutValue : temp}
          disablePast
          slots={{ field: WrappedSingleInputDateRangeField }}
          {...props}
          onChange={handleChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
