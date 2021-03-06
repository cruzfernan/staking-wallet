import React, { useEffect, useMemo } from 'react';
import { Button, Link, Typography } from '@material-ui/core';
import { useStateful, useBoolean } from 'react-hanger';
import { BaseStepContent } from '../BaseStepContent';
import { useApprovableWizardStepTranslations } from '../../../translations/translationsHooks';
import { CommonActionButton } from '../../../components/base/CommonActionButton';

interface IProps {
  txHash: string;
  confirmationsCount: number;
  onStepFinished(): void;
  requiredConfirmations: number;
}

export const TransactionApprovingSubStepContent: React.FC<IProps> = (props: IProps) => {
  const { onStepFinished, txHash, confirmationsCount, requiredConfirmations } = props;

  const approvableWizardStepTranslations = useApprovableWizardStepTranslations();
  const allowToProceed = useBoolean(true);
  const message = useStateful(approvableWizardStepTranslations('weRecommendWaitingToReceiveEnoughConfirmations'));
  const subMessage = useStateful('');

  const isTxConfirmed = confirmationsCount >= 1;

  // Update the verification count text
  useEffect(() => {
    subMessage.setValue(
      approvableWizardStepTranslations('gotXConfirmationsOutOfRecommendedY', {
        count: confirmationsCount,
        recommended: requiredConfirmations,
      }),
    );
  }, [approvableWizardStepTranslations, confirmationsCount, requiredConfirmations, subMessage]);

  const allowToProceedValue = allowToProceed.value;
  const transactionApprovementContent = useMemo(() => {
    let actionContent = null;
    if (allowToProceedValue && isTxConfirmed) {
      actionContent = (
        <CommonActionButton onClick={onStepFinished}>
          {approvableWizardStepTranslations('action_proceed')}
        </CommonActionButton>
      );
    } else {
      actionContent = (
        <Typography variant={'caption'}>{approvableWizardStepTranslations('thisMightTakeAFewMoments')}</Typography>
      );
    }

    return actionContent;
  }, [allowToProceedValue, approvableWizardStepTranslations, isTxConfirmed, onStepFinished]);

  const titleFc = useMemo(() => {
    const titleMessage = isTxConfirmed
      ? approvableWizardStepTranslations('txConfirmed').toLocaleUpperCase()
      : approvableWizardStepTranslations('txPending').toLocaleUpperCase();

    // TODO : ORL : Fix the link to depend on the used network
    return () => (
      <Link href={`https://etherscan.io/tx/${txHash}`} rel={'noopener noreferrer'} target={'_blank'}>
        {titleMessage}
      </Link>
    );
  }, [isTxConfirmed, approvableWizardStepTranslations, txHash]);

  return (
    <BaseStepContent
      message={message.value}
      subMessage={subMessage.value}
      title={titleFc}
      disableInputs={false}
      contentTestId={'wizard_sub_step_wait_for_tx_confirmation'}
      innerContent={transactionApprovementContent}
    />
  );
};
