import React, { useState } from "react";
import parse from "html-react-parser";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";

export default function Product({ item }) {
  const descHtml = parse(item.description);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea sx={{ height: 450 }}>
        <CardMedia component="img" height="250" image={item.image} alt={item.name} classes={{ objectFit: "cover" }} />
        <CardContent>
          <h3>{item.name}</h3>
          <Typography gutterBottom variant="h7" component="div">
            Price: {item.price}
          </Typography>
        </CardContent>
        <CardActions>
          <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      </CardActionArea>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div>
            <div
              style={{ fontFamily: "roboto", fontWeight: 300, fontSize: "14px" }}
              dangerouslySetInnerHTML={{ __html: descHtml }}
            ></div>
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
}

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
