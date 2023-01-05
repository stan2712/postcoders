import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Button";

function PostcodeCard({ area }) {
  return (
    <Grid sx={{ textTransform: "capitalize" }} disabled={true}>
      <Card sx={{ minWidth: 250 }}>
        <CardContent>
          <Typography sx={{ fontSize: 28 }}>
            {area["place name"]}
          </Typography>
          <Typography>
            longitude: {area.longitude} latitude: {area.latitude}
          </Typography>
          <Typography sx={{ fontSize: 18 }}>{area.state}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default PostcodeCard;
