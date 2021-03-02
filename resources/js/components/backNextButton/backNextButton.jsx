import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import store from '../redux/store'
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    boxShadow: "-4px 9px 25px -6px rgba(0, 0, 0, 0.1)",
  },
  backButton: {
    width: 150,
    height: 50,
    borderRadius: `10px 0 0 0`,
    "&:focus": {
      outline: 'none',
    },
    backgroundColor: theme.palette.background.paper,
  },
  nextButton: {
    width: 150,
    height: 50,
    borderRadius: `0 10px 0 0`,
    "&:focus": {
      outline: 'none',
    },
    backgroundColor: theme.palette.background.paper,
  },
}));

const BackNextButton = (props) => {

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(1);

  // récupère le nombre de modules pour désactiver le bouton "suivant" quand on atteint nbModules
  var nbModules = props.chapitres[0] ? props.chapitres.slice(-1)[0][1].module_id : 10;

  //récupère le premier chapitre qui a un module_id = activeStep
  function getChapitre(step) {
    var currentChapitre = props.chapitres.map(chapitre => chapitre[1])
      .filter(function (module) {
        return module.module_id == (props.info_chapitre.module_id + step);
      }).filter(function (chapitre) {
        return Math.min(chapitre.ordre);
      })
    return currentChapitre[0] && currentChapitre[0];
  }

  // INITIALISATION :envoie les datas au store pour déclencher le chargement 
  // de la 1er vidéo, titre et description du premier module 
 if (props.chapitres[0] && !props.info_chapitre.module_id) {
  store.dispatch({ type: 'GET_CHAPITRE', chapitreData: props.chapitres[0][1] });
 }
    
  // modifie activeStep pour positionner le bon onglet "précédent / suivant"
  useEffect(() => {
    setActiveStep(props.info_chapitre.module_id);
  }, [props.info_chapitre.module_id]);

  //passe au module suivant
  const handleNext = () => {
    var chapitre = getChapitre(1);
    store.dispatch({ type: 'GET_CHAPITRE', chapitreData: chapitre });
  };

  //passe au module précédent
  const handleBack = () => {
    var chapitre = getChapitre(-1);
    store.dispatch({ type: 'GET_CHAPITRE', chapitreData: chapitre });
  };
  props.chapitres[0] && console.log('getNbModules -->   ' + nbModules);
  return (
    <div className={classes.root}>
      <div>
        <Button
          disabled={activeStep < 2}
          onClick={handleBack}
          className={classes.backButton}
        // variant="contained"
        >
          Précédent
              </Button>
        <Button
          disabled={activeStep == nbModules}
          // variant="contained"
          className={classes.nextButton}
          onClick={handleNext}>
          Suivant
                </Button>
      </div>
    </div>
  );
}

const mapStateToProps = ({ chapitreData }) => {
  return {
    info_chapitre: chapitreData.chapitreData,
  };
};

export default connect(mapStateToProps)(BackNextButton);
