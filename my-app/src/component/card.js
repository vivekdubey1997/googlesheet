import * as React from "react";
import "./style.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";


export default function MuiCard({ data }) {


  return (
    <Card sx={{ maxWidth: 345, cursor: "pointer", margin: "100px" }} className="card">
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            style={{ fontSize: "12px"    }}
          >
            {data.Symbol}
          </Avatar>
        }
        action={data.Type}
        title={data.CompanyName}
        subheader={data.Date}
      />
      <CardMedia
        component="div"
        style={{
          minHeight: 150,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "15px"
        }}
      >
        <p>
          <strong>Last Traded Price:</strong> {data.LTP}
        </p>
        <p>
          <strong>Target Price:</strong> {data.TargetPrice}
        </p>
        <p>
          <strong>Stop Loss Price:</strong> {data.StopLossPrice}
        </p>{" "}
      </CardMedia>
      <CardContent style={{ backgroundColor: "tomato", outline: "none", border: "none" }}>
        <Typography variant="body2" color="text.primary">
          {data.Description}
        </Typography>
      </CardContent>
    </Card>
  );
}
