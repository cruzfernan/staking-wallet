import React, { useCallback, useEffect, useMemo } from 'react';
import { useBoolean, useNumber, useStateful } from 'react-hanger';
import { useOrbsAccountStore, useReReadAllStoresData } from '../../store/storeHooks';
import { ITransactionCreationStepProps } from '../approvableWizardStep/ApprovableWizardStep';
import { observer } from 'mobx-react';
import { fullOrbsFromWeiOrbs, weiOrbsFromFullOrbs } from '../../cryptoUtils/unitConverter';
import { messageFromTxCreationSubStepError } from '../wizardMessages';
import { BaseStepContent, IActionButtonProps } from '../approvableWizardStep/BaseStepContent';
import { useUnstakingWizardTranslations, useWizardsCommonTranslations } from '../../translations/translationsHooks';
import { FullWidthOrbsInputField } from '../../components/inputs/FullWidthOrbsInputField';
import { Typography } from '@material-ui/core';
import { useTxCreationErrorHandlingEffect, useWizardState } from '../wizardHooks';
import { STAKING_ACTIONS } from '../../services/analytics/analyticConstants';
import { useAnalyticsService } from '../../services/ServicesHooks';
import { enforceNumberInRange } from '../../utils/numberUtils';

export const OrbsUntakingStepContent = observer((props: ITransactionCreationStepProps) => {
  const { disableInputs, onPromiEventAction, txError, closeWizard } = props;

  const wizardsCommonTranslations = useWizardsCommonTranslations();
  const unstakingWizardTranslations = useUnstakingWizardTranslations();
  const orbsAccountStore = useOrbsAccountStore();
  const analyticsService = useAnalyticsService();

  const reReadStoresData = useReReadAllStoresData();

  // Start and limit by allowance
  const stakedOrbsNumericalFormat = fullOrbsFromWeiOrbs(orbsAccountStore.stakedOrbs);
  const orbsForUnstaking = useNumber(0, {
    lowerLimit: 0,
    upperLimit: stakedOrbsNumericalFormat,
  });
  const { message, subMessage, isBroadcastingMessage } = useWizardState(
    unstakingWizardTranslations('unstakingSubStep_message_selectAmountOfOrbs'),
    unstakingWizardTranslations('unstakingSubStep_subMessage_pressUnstakeAndApprove'),
    false,
  );

  // Handle error by displaying the proper error message
  useTxCreationErrorHandlingEffect(message, subMessage, isBroadcastingMessage, txError);

  const unstakeTokens = useCallback(() => {
    // TODO : FUTURE : O.L : Add written error message about out of range
    if (orbsForUnstaking.value < 1 || orbsForUnstaking.value > stakedOrbsNumericalFormat) {
      console.warn(`tried to un-stake out of range amount of ${orbsForUnstaking.value}`);
      return;
    }

    message.setValue('');
    subMessage.setValue(wizardsCommonTranslations('subMessage_pleaseApproveTransactionWithExplanation'));

    const promiEvent = orbsAccountStore.unstakeTokens(weiOrbsFromFullOrbs(orbsForUnstaking.value));

    // DEV_NOTE : If we have txHash, it means the user click on 'confirm' and generated one.
    promiEvent.on('transactionHash', (txHash) => {
      subMessage.setValue(wizardsCommonTranslations('subMessage_broadcastingYourTransactionDoNotRefreshOrCloseTab'));
      isBroadcastingMessage.setTrue();
    });

    onPromiEventAction(promiEvent, () => {
      analyticsService.trackStakingContractInteractionSuccess(STAKING_ACTIONS.unstaking, orbsForUnstaking.value);
      reReadStoresData();
    });
  }, [
    orbsForUnstaking.value,
    stakedOrbsNumericalFormat,
    message,
    subMessage,
    wizardsCommonTranslations,
    orbsAccountStore,
    onPromiEventAction,
    isBroadcastingMessage,
    analyticsService,
  ]);

  const actionButtonProps = useMemo<IActionButtonProps>(
    () => ({
      onClick: unstakeTokens,
      title: unstakingWizardTranslations('unstakingSubStep_action_unstake'),
    }),
    [unstakeTokens, unstakingWizardTranslations],
  );

  const unstakingInput = useMemo(() => {
    const orbsInCooldownWarning = orbsAccountStore.hasOrbsInCooldown ? (
      <>
        <Typography style={{ color: 'orange', textAlign: 'center' }}>
          {unstakingWizardTranslations('unstakingSubStep_warning_thereAreOrbsInCooldownHeader')}{' '}
        </Typography>
        <Typography style={{ color: 'orange', textAlign: 'center' }}>
          {unstakingWizardTranslations('unstakingSubStep_warning_thereAreOrbsInCooldownBody')}{' '}
        </Typography>
      </>
    ) : null;

    return (
      <>
        {orbsInCooldownWarning}
        <FullWidthOrbsInputField
          id={'orbsUnstaking'}
          label={unstakingWizardTranslations('unstakingSubStep_inputLabel')}
          value={orbsForUnstaking.value}
          onChange={(value) => orbsForUnstaking.setValue(enforceNumberInRange(value, 0, stakedOrbsNumericalFormat))}
          disabled={disableInputs}
        />
      </>
    );
  }, [
    orbsAccountStore.hasOrbsInCooldown,
    unstakingWizardTranslations,
    orbsForUnstaking,
    disableInputs,
    stakedOrbsNumericalFormat,
  ]);

  // TODO : O.L : Use proper grid system instead of the 'br's
  return (
    <BaseStepContent
      message={message.value}
      subMessage={subMessage.value}
      title={unstakingWizardTranslations('unstakingSubStep_stepTitle')}
      infoTitle={unstakingWizardTranslations('unstakingSubStep_stepExplanation')}
      disableInputs={disableInputs}
      isLoading={isBroadcastingMessage.value}
      contentTestId={'wizard_sub_step_initiate_unstaking_tx'}
      actionButtonProps={actionButtonProps}
      innerContent={unstakingInput}
      addCancelButton
      onCancelButtonClicked={closeWizard}
    />
  );
});
