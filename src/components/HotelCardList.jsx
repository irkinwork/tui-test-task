import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const HotelCardList = ({ items }) => (
  <Grid container spacing={2}>
    {items.map(({
      id, name, region, price, image,
    }) => (
      <Grid key={id} item md={4} lg={3}>
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={name}
              height="140"
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
            <Button size="small" color="primary" startIcon={<ShoppingCartIcon />}>
            Book
            </Button>
            <Button size="small" color="primary" startIcon={<FavoriteIcon />}>
            Add to Favorite
            </Button>
          </CardActions>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default HotelCardList;
