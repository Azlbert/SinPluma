import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import useStyles from "../Style";

function createData(title, nWords) {
    return { title, nWords };
}

const rows = [
    createData('Frozen yoghurt', 159),
    createData('Ice cream sandwich', 237),
    createData('Eclair', 262),
    createData('Cupcake', 305),
    createData('Gingerbread', 356),
];

function SimpleTable() {
    /* const classes = useStyles(); */
  
    return (
      <Paper /* className={classes.root} */>
        <Table /* className={classes.table} */>
          <TableHead>
            <TableRow>
              <TableCell>Capitulo</TableCell>
              <TableCell align="right"># Palabras</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.title}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.nWords}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }

export default function Work() {
    const classes = useStyles.profile();
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} md={3}>
            <Paper className={classes.paper}>
                
                <Typography variant="h5" gutterBottom>
                    El principito Pirata
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Publicado por: Maria la que no queria
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Publicado el: alguna fecha
                </Typography>
                <br />
            </Paper>
            </Grid>
            <Grid item xs={12} md={9} className={classes.info}>
                <Paper className={classes.paper}>
                    <Typography variant="h5" gutterBottom>
                        Sinopsis
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet nunc ut turpis elementum fringilla. Donec ac condimentum nisi. Quisque porta velit orci, ut placerat enim suscipit sit amet. Integer molestie fringilla feugiat. Pellentesque scelerisque est lorem, sed cursus magna euismod eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis lacinia ligula. Donec eget lorem tempus, auctor lacus sit amet, pellentesque elit. Vivamus turpis ante, tincidunt a sem at, efficitur placerat quam. Nam enim erat, dignissim a hendrerit ac, sagittis eu libero. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce rutrum, mi id maximus condimentum, est odio ultrices magna, id venenatis purus dui sed ligula. Phasellus porttitor posuere arcu, sit amet placerat nulla tincidunt ut. Curabitur consequat metus ex, vel lobortis nisl feugiat vitae. Interdum et malesuada fames ac ante ipsum primis in faucibus.
                    </Typography>
                    <br />
                </Paper>
                <Typography variant="h5" gutterBottom className={classes.paper} style={{marginTop:'20px'}}>
                        Tabla de contenido
                </Typography>
                <SimpleTable />
            </Grid>
        </Grid>
    );
};