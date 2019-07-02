import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import { makeStyles } from '@material-ui/core/styles';
import Line from './line';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

function StationList({ title, lines }) {
  const [checked, setChecked] = useState([]);
  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  function renderLines() {
    return lines.map((line, _) => (
      <Line
        key={line.id}
        onClick={handleToggle(line.name)}
        line={line}
        expanded={checked.indexOf(line.name) !== -1}
      />
    ));
  }
  const classes = useStyles();
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={(
        <ListSubheader component="div" id="nested-list-subheader">
          {title}
        </ListSubheader>
)}
      className={classes.root}
    >
      {lines && renderLines()}
    </List>
  );
}

export default StationList;
