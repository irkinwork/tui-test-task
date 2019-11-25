import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Grid,
} from '@material-ui/core';
import { Favorite, ShoppingCart } from '@material-ui/icons';
import { pTHotels } from '../lib';

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: 'flex-start',
    margin: '20px 0 0',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
}));

const HotelCardList = ({ items }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={2} className={classes.root}>
      {items.map(({
        id, name, region, price, image,
      }) => (
        <Grid key={id} item md={4} lg={3} sm={6}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                alt={name}
                height="170"
                image={image}
                title={name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {`#${id} ${name}`}
                </Typography>
                <Typography gutterBottom variant="h6" component="h6">
                  {`${price} $`}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {region}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" startIcon={<ShoppingCart />}>
              Book
              </Button>
              <Button size="small" color="primary" startIcon={<Favorite />}>
              Add to Favorite
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

HotelCardList.propTypes = {
  items: pTHotels.isRequired,
};

export default React.memo(HotelCardList);
