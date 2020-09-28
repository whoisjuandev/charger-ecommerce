import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Redirect, withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default withRouter(function Selector(props) {
  const classes = useStyles();
  const [prop, setProp] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [redirect, setRedirect] = React.useState(null);

  const handleChange = (event) => {
    setProp(event.target.value);
    setRedirect('/catalogo/');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (redirect) {
      if(prop !== '0')  {
        //window.location.href = '/category/'+prop;
        props.history.push(`/category/${prop}`);
      } else {
        props.history.push(`/catalog`);
        //window.location.href = '/catalog'
      }

      setRedirect(false);
    }
  });

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">{props.nom}</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={prop}
          onChange={handleChange}
        >
          <MenuItem value="0">
            <em>None</em>
          </MenuItem>
         {/*<MenuItem value={props.val}>
            <em>{props.desc}</em>
          </MenuItem>*/}
          {props.elements.map((elem, key) => (
            <MenuItem key={key} value={elem.id}>{elem.description}</MenuItem>
          ))}
        {/*.map(des =>{return <MenuItem value={des}>{des}</MenuItem>})}
          
        {/* { props.desc.map(d=>{
         return(
         <MenuItem value={d}>{d}</MenuItem>
         ) 
       })} */}

        </Select>
      </FormControl>
    </div>
  );
});
