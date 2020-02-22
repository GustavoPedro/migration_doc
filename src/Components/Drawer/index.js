import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BuildIcon from '@material-ui/icons/Build';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import useStyles from './styles'
import { Redirect } from 'react-router-dom'
import SelectItems from './TableSelectItems'
import axios from '../../data/axios'
import SnackBar from '../../Components/SnackBar'

export default function PersistentDrawerLeft(props) {
  const [nav, setNav] = useState(null)
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [project, setProject] = useState({})
  const [openDialog, setOpenDialog] = useState(false)
  const [openSnackBarSucess, setOpenSnackBarSucess] = useState(false)
  const [openSnackBarErr, setOpenSnackBarErr] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    const getProject = () => {
      const project = localStorage.getItem("Project")
      if (project) {
        setProject(JSON.parse(project))
      }
    }
    getProject()
  }, [])

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBarSucess(false);
    setOpenSnackBarErr(false)
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const generateSelects = (itemsSelected) => {
    let req = `?projectId=${project.IdProject}`;
    for (let i of itemsSelected) {
      req += `&itemsSelected=${i}`
    }
    axios.get(`Projects/generateSelects${req}`)
      .then(res => {
        if (res.status == 200) {
          setMsg('Selects Gerados com sucesso')
          setOpenSnackBarSucess(true)
        }
        else {
          console.log(res)
          setMsg('Não foi possível gerar selects')
          setOpenSnackBarErr(true)
        }
      })
      .catch(err => {
        setMsg('Não foi possível gerar selects')
        setOpenSnackBarErr(true)
      })
  }


  function onClickItem(path) {
    setNav(path)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const getMenuItems = [{
    Title: 'Objects',
    path: '/project/objects'
  },
  {
    Title: 'Conditional Expressions',
    path: '/project/condExpression'
  },
  {
    Title: 'Applications',
    path: '/project/applications'
  },
  {
    Title: 'Global Data Restrictions',
    path: '/project/restrictions'
  },
  ]

  return (
    <div>
      <SnackBar msgType="sucess" msg={msg} handleClose={handleCloseSnackBar} open={openSnackBarSucess} />
      <SnackBar msgType="err" msg={msg} handleClose={handleCloseSnackBar} open={openSnackBarErr} />
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Objetos de Migração
          </Typography>
            {
              project && (<Typography variant="h6" className={classes.Project} noWrap>
                Projeto:  {project.NameProject}
              </Typography>)
            }

          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {getMenuItems.map((text, index) => (
              <ListItem button key={text.Title} onClick={() => onClickItem(text.path)}>
                <ListItemIcon>{index % 2 === 0 ? <BuildIcon /> : <QuestionAnswerIcon />}</ListItemIcon>
                <ListItemText primary={text.Title} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem button key="genDoc" onClick={() => handleOpenDialog()}>
              <ListItemText>Generate Documentation</ListItemText>
            </ListItem>
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {props.children}
          {nav && <Redirect to={nav} />}
        </main>
        <SelectItems openDialog={openDialog} handleCloseDialog={handleCloseDialog} generateSelects={generateSelects} />

      </div>
    </div>

  );
}
