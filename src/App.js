import React, { useState, useEffect } from "react";
import "./App.css";

/**
 * Map components
 */
import { Map, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

/**
 * Material UI
 */
import Snackbar from "@material-ui/core/Snackbar";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LinearProgress from "@material-ui/core/LinearProgress";

/**
 * Custom components
 */
import StationList from "./components/StationsList";

/**
 * Api
 */
import API from "./utils/api";

/**
 * Fixture apis can be used as well here for tests
 */
const api = API.create();

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  container: {
    marginTop: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(1)
  },
  progress: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(-8)
  },
  tabContainer: {
    marginTop: theme.spacing(1)
  },
  gridContainer: {
    marginTop: theme.spacing(8)
  },
  footer: {
    footer: {
      display: "flex",
      flexGrow: 1,
      alignItems: "center",
      marginTop: theme.spacing(2),
      justifyContent: "center"
    }
  }
}));

function App() {
  const classes = useStyles();
  const [fetching, setFetching] = useState(false);
  const [bikePoints, setBikePoints] = useState();
  const [lines, setLines] = useState();
  const [errorSnack, setErrorSnack] = useState({
    visible: false,
    content: ""
  });

  /**
   * Tabs state
   */
  const [value, setValue] = useState(0);

  function handleChange(event, newValue) {
    switch (newValue) {
      case 0:
        fetchBikePoints();
        break;
      case 1:
        fetchLines();
        break;
      default:
        break;
    }
    setValue(newValue);
  }

  const fetchBikePoints = () => {
    setFetching(true);
    api.getBikePoints().then(result => {
      if (result.ok) {
        setBikePoints(result.data);
        setFetching(false);
      } else {
        setErrorSnack({ visible: true, content: result.problem });
        setFetching(false);
      }
    });
  };

  const fetchLines = () => {
    setFetching(true);
    api.getLines().then(result => {
      if (result.ok) {
        setLines(result.data);
        setFetching(false);
      } else {
        setErrorSnack({ visible: true, content: result.problem });
        setFetching(false);
      }
    });
  };

  useEffect(() => {
    fetchBikePoints();
  }, []);

  const renderPoints = () =>
    bikePoints.map((point, _) => (
      <Marker key={point.id} position={[point.lat, point.lon]}>
        <Tooltip direction="bottom">{point.placeType}</Tooltip>
        <Popup>{point.commonName}</Popup>
      </Marker>
    ));

  const onSnackClose = () => setErrorSnack({ visible: false, content: "" });

  const position = [51.509865, -0.118092];

  return (
    <div className="App">
      {fetching && (
        <LinearProgress
          color="secondary"
          className={classes.progress}
          variant="query"
        />
      )}
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            TFL API
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container className={classes.gridContainer} direction="row">
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Bike points" />
              <Tab label="Line status" />
            </Tabs>
            {value === 0 && (
              <div className={classes.tabContainer}>
                <Map
                  center={position}
                  zoom={12}
                  maxZoom={20}
                  attributionControl
                  zoomControl
                  doubleClickZoom
                  scrollWheelZoom
                  dragging
                  animate
                  bounceAtZoomLimits
                  easeLinearity={0.35}
                >
                  <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
                  <MarkerClusterGroup>
                    {bikePoints && renderPoints()}
                  </MarkerClusterGroup>
                </Map>
              </div>
            )}

            {value === 1 && (
              <div className={classes.tabContainer}>
                <StationList
                  title="London underground lines status"
                  lines={lines}
                />
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
      <div className={classes.footer}>
        <Typography variant="body1">
          Made with{" "}
          <span role="img" aria-label="heart">
            ❤️
          </span>{" "}
          by Amur Anzorov
        </Typography>
      </div>
      <Snackbar
        open={errorSnack.visible}
        onClose={onSnackClose}
        variant="error"
        TransitionComponent={Fade}
        message={errorSnack.content}
      />
    </div>
  );
}

export default App;
