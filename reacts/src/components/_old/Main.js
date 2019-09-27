import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import CardActionArea from '@material-ui/core/CardActionArea';

import useStyles from "../Style";

function WorkCard() {
    const classes = useStyles();
  
    return (
      <Card style={{marginBottom:16}}>
        <CardActionArea className={classes.workCard}>
        <CardMedia
          className={classes.posterStyle}
          image="https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9788/4080/9788408059288.jpg"
          title="Narnia"
        />
        <CardContent className={classes.infoStyle}>
          <Typography variant='h5'>
            Narnia fsfd
          </Typography>
          <Typography variant='subtitle2'>
            Narnia
          </Typography>
          <div className={classes.par}>
          <Typography variant="body2" color="textSecondary" component="p">
            ¿Actualmente utilizas Java e incluso has desarrollado aplicaciones Web, pero te gustaría aprender Frameworks Empresariales para desarrollar una arquitectura JEE de la manera más rápida?
            Vuélvete un Experto en Java dominando los principales frameworks e implementa microservicios.
          </Typography>
          </div>
        </CardContent>
        <div style={{width:'320px', marginLeft:10, backgroundColor:''}}>
          <Chip variant="outlined" size="small" label="Terror" />
          <Chip variant="outlined" size="small" label="Romance" />
          <Chip variant="outlined" size="small" label="Comedia" />
        </div>
        </CardActionArea>
      </Card>
    );
}

function Main() {
  const classes = useStyles();
/*     const items = []

    for (let i = 0; i < 1000; i++) {
        items.push("Me la pelan ");
    }; */
  return(
    <div style={{height: 500,display: "flex", flexWrap: "wrap",justifyContent: "space-evenly", alignContent: "space-between"}}>
      <WorkCard />
      <WorkCard />
      <WorkCard />
      <WorkCard />
      <WorkCard />
      <WorkCard />
      <WorkCard />
      <WorkCard />
    </div>
  );
};

export default Main;