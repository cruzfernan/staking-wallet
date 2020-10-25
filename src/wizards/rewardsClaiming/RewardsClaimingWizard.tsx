import React, { useCallback, useMemo } from 'react';
import { useNumber } from 'react-hanger';
import { ApprovableWizardStep } from '../approvableWizardStep/ApprovableWizardStep';
import { observer } from 'mobx-react';
import { RewardsCalaimingStepContent } from './RewardsCalaimingStepContent';
import {
  useGuardianChangingWizardTranslations,
  useWizardsCommonTranslations,
} from '../../translations/translationsHooks';
import { WizardFinishStep } from '../finishStep/WizardFinishStep';
import { useTrackModal } from '../../services/analytics/analyticsHooks';
import { MODAL_IDS } from '../../services/analytics/analyticConstants';
import { Wizard } from '../../components/wizards/Wizard';

const STEPS_INDEXES = {
  claimRewards: 0,
  finish: 1,
};

interface IProps {
  closeWizard(): void;
}

// TODO : ORL : TRANSLATIONS

// TODO : O.L : FUTURE : The material-ui Modal requires passing a ref, decide what to do with this ref.
// Connect to store
export const RewardsClaimingWizard = observer(
  React.forwardRef<any, IProps>((props, ref) => {
    useTrackModal(MODAL_IDS.rewardsClaiming);
    const { closeWizard } = props;

    const wizardsCommonTranslations = useWizardsCommonTranslations();
    const guardianChangingWizardTranslations = useGuardianChangingWizardTranslations();
    const activeStep = useNumber(STEPS_INDEXES.claimRewards);
    const goToFinishStep = useCallback(() => activeStep.setValue(STEPS_INDEXES.finish), [activeStep]);

    const stepContent = useMemo(() => {
      switch (activeStep.value) {
        // Select a guardian
        case STEPS_INDEXES.claimRewards:
          return (
            <ApprovableWizardStep
              transactionCreationSubStepContent={RewardsCalaimingStepContent}
              displayCongratulationsSubStep={false}
              finishedActionName={'Claimed your rewards'}
              moveToNextStepAction={goToFinishStep}
              moveToNextStepTitle={wizardsCommonTranslations('moveToStep_finish')}
              key={'rewardsClaimingStep'}
              closeWizard={closeWizard}
            />
          );
        case STEPS_INDEXES.finish:
          return (
            <WizardFinishStep
              // finishedActionDescription={guardianChangingWizardTranslations('afterSuccessStateExplanation')}
              finishedActionDescription={'You have claimed your rewards'}
              onFinishClicked={closeWizard}
            />
          );
        default:
          throw new Error(`Unsupported step value of ${activeStep.value}`);
      }
    }, [activeStep.value, closeWizard, goToFinishStep, wizardsCommonTranslations]);

    const stepperTitles = useMemo(() => {
      return [
        // guardianChangingWizardTranslations('stepLabel_changeGuardian'),
        'Claim Rewards',
        wizardsCommonTranslations('stepLabel_finish'),
      ];
    }, [wizardsCommonTranslations]);

    return (
      <Wizard
        activeStep={activeStep.value}
        stepperTitles={stepperTitles}
        content={stepContent}
        dataTestId={'wizard_guardianChanging'}
      />
    );
  }),
);
