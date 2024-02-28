import React, { useState } from "react";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import styled from "styled-components";

export default function PopularHotels() {
  const regionsData = [
    { region: "北海道", prefectures: ["北海道"] },
    {
      region: "東北",
      prefectures: [
        "青森県　",
        "岩手県　",
        "宮城県　",
        "秋田県　",
        "山形県　",
        "福島県　",
      ],
    },
    { region: "北関東", prefectures: ["茨城県　", "栃木県　", "群馬県　"] },
    {
      region: "首都圏",
      prefectures: ["埼玉県　", "千葉県　", "東京都　", "神奈川県　"],
    },
    { region: "甲信越", prefectures: ["新潟県　", "山梨県　", "長野県　"] },
    { region: "北陸", prefectures: ["富山県　", "石川県　", "福井県　"] },
    {
      region: "東海",
      prefectures: ["岐阜県　", "静岡県　", "愛知県　", "三重県　"],
    },
    {
      region: "近畿",
      prefectures: [
        "滋賀県　",
        "京都府　",
        "大阪府　",
        "兵庫県　",
        "奈良県　",
        "和歌山県　",
      ],
    },
    {
      region: "山陽・山陰",
      prefectures: ["鳥取県　", "島根県　", "岡山県　", "広島県　", "山口県　"],
    },
    {
      region: "四国",
      prefectures: ["徳島県　", "香川県　", "愛媛県　", "高知県　"],
    },
    {
      region: "九州",
      prefectures: [
        "福岡県　",
        "佐賀県　",
        "長崎県　",
        "熊本県　",
        "大分県　",
        "宮崎県　",
        "鹿児島県　",
      ],
    },
    { region: "沖縄", prefectures: ["沖縄県　"] },
  ];

  const Cell = {
    width: "70%",
    padding: 10,
  };

  const headCell = {
    fontWeight: 600,
    width: "30%",
    padding: 10,
  };

  const HoverLink = styled.a`
    text-decoration: none;
    color: #3ca3ba;
    transition: color 0.2s;
    &:hover {
      color: #317585;
    }
  `;

  return (
    <>
      <Container>
        <h2>エリアから探す</h2>
      </Container>
      <Grid
        item
        xs={12}
        lg={3}
        md={4}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TableContainer
          style={{ paddingTop: 20, display: "flex", justifyContent: "center" }}
        >
          <Table sx={{ maxWidth: "70%" }} aria-label="simple table">
            <TableBody>
              {regionsData.map((elem) => (
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    align=""
                    style={headCell}
                  >
                    {elem.region}
                  </TableCell>
                  <TableCell style={Cell} align="start">
                    {elem.prefectures.map((prefecture) => (
                      <Link
                        to={`/top/search-word/`}
                        state={{ state: `${prefecture}` }}
                        style={{ textDecoration: "none" }}
                      >
                        <HoverLink>{prefecture}</HoverLink>
                      </Link>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
}
