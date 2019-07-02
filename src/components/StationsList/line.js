import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import CheckCircle from "@material-ui/icons/CheckCircle";
import ReportProblem from "@material-ui/icons/ReportProblem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import _ from 'lodash';

import moment from "moment";

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

// const handleOnItemClick = (item, onClick) => () => {
//   if(item.lineStatuses && item.lineStatuses[0].statusSeverity !== 10) {
//     onClick()
//   }
// }

function Line({ line, onClick, expanded }) {
  const classes = useStyles();
  const latestStatus = _.last(line.lineStatuses);
  console.log(latestStatus);
  return (
    <div key={line.id}>
      <ListItem
        dense
        divider
        alignItems="center"
        justify="center"
        button
        // onClick={handleOnItemClick(line, onClick)}
        onClick={onClick}
      >
        {expanded ? <ExpandLess /> : <ExpandMore />}
        <ListItemText primary={line.name} />
        <ListItemSecondaryAction key={latestStatus.id}>
          <ListItemText
            primary={latestStatus.statusSeverityDescription}
            align="center"
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {line.lineStatuses.map(status => (
            <ListItem key={status.id} className={classes.nested}>
              <ListItemIcon>
                {status.statusSeverity === 10 ? (
                  <CheckCircle />
                ) : (
                  <ReportProblem />
                )}
              </ListItemIcon>
              <ListItemText
                primary={
                  status.statusSeverity !== 10
                    ? status.reason
                    : status.statusSeverityDescription
                }
                secondary={`${moment(status.validityPeriods.fromDate).format(
                  "DD/MM/YYYY HH:mm"
                )}`}
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </div>
  );
}

export default Line;
