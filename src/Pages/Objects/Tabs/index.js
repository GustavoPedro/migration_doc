import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AttributesForm from '../Attributes'
import useStyles from './styles'
import RelationshipsForm from '../MaxRelationships'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const {object} = props
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="Object Properties">
          <Tab label="Attributes" {...a11yProps(0)} />
          <Tab label="Relationships" {...a11yProps(1)} />
          <Tab label="MaxLookupMap" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div style={{ backgroundColor: '#cfe8fc' }}>
            <AttributesForm object={object}/>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
          <RelationshipsForm object={object}/>
        </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
        </TabPanel>
    </div>
  );
}