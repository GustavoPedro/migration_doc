import React,{useState} from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Input from '@material-ui/core/Input';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';

export default function SimpleDialog(props) {
  const { onClose, selectedValue, open, data, setData, title } = props;
  const [displayAddClient,setDisplayAddClient] = useState('none')
  const [displayAddButton,setDisplayAddButton] = useState('block')
  const [txtNome,setTxtNome] = useState('')
  const [txtDescricao,setTxtDescricao] = useState('')

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = value => {
    onClose(value);
  };

  const handleClickAdd = () => {
      setDisplayAddButton('none')
      setDisplayAddClient('block')
  }

  const saveNew = () => {
    console.log(txtNome)
    setData((prevState) => {
      const data = [...prevState]
      const item = {Name:txtNome,Description:txtDescricao,Id:6456578797}
      data.push(item)
      return data
    })
    setDisplayAddButton('block')
    setDisplayAddClient('none')
    setTxtDescricao('')
    setTxtNome('')

  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
      <div style={{padding:10}}>
        <Input placeholder="Filtrar" />      
      </div>
      <DialogContent>
        <List>
          {data && data.map(email => (
            <ListItem button onClick={() => handleListItemClick(email.Name)} key={email.Id}>
              <ListItemText primary={`${email.Name} - ${email.Description}`} />
            </ListItem>
          ))}
          <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
            <ListItemText primary="add account" />
          </ListItem>
        </List>
      </DialogContent>      
      <Button color="primary"  style={{display:displayAddButton}} onClick ={handleClickAdd} variant="outlined">
        <AddIcon />
      </Button>
      <div style={{padding:10,display:displayAddClient}}>
        <Input placeholder="Nome" onBlur={(event) => setTxtNome(event.target.value)} />
        <Input placeholder="Descrição" style={{marginLeft:5,marginRight:5}}  onBlur={(event) => setTxtDescricao(event.target.value)}/>
        <Button variant="outlined" color="primary" onClick={saveNew}>
          OK
        </Button>
      </div>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};