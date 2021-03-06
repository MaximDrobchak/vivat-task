import React from 'react';

import { connect } from 'react-redux';

import ActionsContainer from './ActionsContainer';
import CompletedSteps from './CompletedSteps';

import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import LastStep from './LastStep';

import withStepsComponent from './withStepsComponent';
import { doAddResetStep } from '../../../actions';
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
} from '@material-ui/core';

function getStepContent (step){
  switch (step) {
    case 0:
      return <FirstStep />;
    case 1:
      return <SecondStep />;
    case 2:
      return <LastStep />;
    default:
      return 'Unknown step';
  }
}

const ExtensionPanel = ({ onAddResetStep, activeStep, steps, isDisible }) => (
  <div style={{ width: 600 }}>
    <Stepper activeStep={activeStep} orientation='vertical'>
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
          <StepContent>
            <Typography variant='h5'>{getStepContent(index)}</Typography>
            <ActionsContainer
              activeStep={activeStep}
              isDisible={isDisible}
              length={steps.length}
            />
          </StepContent>
        </Step>
      ))}
    </Stepper>
    {activeStep === steps.length && (
      <CompletedSteps onAddResetStep={onAddResetStep} />
    )}
  </div>
);

const WithExtensionPanel = withStepsComponent(ExtensionPanel);

const mapStateToProps = state => ({
  activeStep: state.activeStepState.activeStep,
});
const mapDispatchToProps = dispatch => ({
  onAddResetStep: () => dispatch(doAddResetStep()),
});
export default connect(mapStateToProps, mapDispatchToProps)(WithExtensionPanel);
