import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DirectionsBike from '@material-ui/icons/DirectionsBike';
import ReportProblem from '@material-ui/icons/ReportProblem';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function DrawerItems(onBikeStopsClick, onAccidentsClick, fetching) {
  const classes = useStyles();
  return (
    <div className={classes.list} role="presentation">
      <List>
        <ListItem button disabled={fetching} onClick={onBikeStopsClick} key="bikestops">
          <ListItemIcon>
            <DirectionsBike />
          </ListItemIcon>
          <ListItemText primary="Bike stops" />
        </ListItem>
        <ListItem button disabled={fetching} onClick={onAccidentsClick} key="accidents">
          <ListItemIcon>
            <ReportProblem />
          </ListItemIcon>
          <ListItemText primary="Accidents" />
        </ListItem>
      </List>
    </div>
  );
}

function Drawer({
  children, onBikeStopsClick, onAccidentsClick, fetching, ...props
}) {
  return <SwipeableDrawer {...props}>{DrawerItems(onBikeStopsClick, onAccidentsClick, fetching)}</SwipeableDrawer>;
}

export default Drawer;
