import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, getAllData } from "../features/cartSlice";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
export default function App() {
  const items = useSelector((state) => state.allCart.filteredItems);

  const dispatch = useDispatch();
// useEffect(() => {
//  dispatch(getAllData());
// }, [])

  return (
    <>
      <Box sx={{ width: "100%", padding: "20px" }}>
        <Grid container rowSpacing={3} columnSpacing={{ md: 2 }}>
          {items.map((item) => (
            <Grid
              item
              md={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card sx={{ width: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="300"
                    width="200"
                    image={item.img}
                    alt={`Product ${item.title}`}
                    sx={{
                      objectFit: "fill",
                      borderRadius: 10,
                      padding: "20px",
                    }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`Price ${item.price}`}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions
                  sx={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Button
                    variant="contained"
                    onClick={() => dispatch(addToCart(item))}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
