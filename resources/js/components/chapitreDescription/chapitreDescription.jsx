import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '70%',
    marginTop: '40px',
  },
}));

const ChapitreDescription = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root }>
      <Typography className={classes.instructions}>{ ReactHtmlParser(props.description_chapitre.description) }</Typography>
    </div>
  );
}

const mapStateToProps = ({ chapitreData }) => {
  return {
    description_chapitre: chapitreData.chapitreData,
  };
};

export default connect(mapStateToProps)(ChapitreDescription);
