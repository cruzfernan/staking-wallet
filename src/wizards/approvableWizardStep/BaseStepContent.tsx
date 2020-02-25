import React, { ReactNode, useMemo } from 'react';
import { Typography } from '@material-ui/core';
import { WizardContent } from '../../components/wizards/WizardContent';
import { CommonActionButton } from '../../components/base/CommonActionButton';
import Grid from '@material-ui/core/Grid';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { HtmlTooltip } from '../../components/base/HtmlTooltip';

export interface IActionButtonProps {
  title: string;
  onClick: () => void;
}

interface IProps {
  title: string | React.ElementType;
  message: string;
  subMessage: string;

  innerContent?: ReactNode;
  infoTitle?: string;
  actionButtonProps?: IActionButtonProps;
  disableInputs?: boolean;
  contentTestId?: string;
}

export const BaseStepContent = React.memo<IProps>(props => {
  const {
    title,
    message,
    subMessage,
    disableInputs,
    contentTestId,
    innerContent,
    actionButtonProps,
    infoTitle,
  } = props;

  const actionButton = useMemo(() => {
    if (actionButtonProps) {
      return (
        <CommonActionButton disabled={disableInputs} onClick={actionButtonProps.onClick}>
          {actionButtonProps.title}
        </CommonActionButton>
      );
    } else {
      return null;
    }
  }, [actionButtonProps, disableInputs]);

  const titleContent = useMemo(() => {
    if (typeof title === 'string') {
      return title;
    } else {
      const Title = title;
      return <Title />;
    }
  }, [title]);

  const infoTooltippedIcon = useMemo(() => {
    if (infoTitle) {
      return (
        <HtmlTooltip title={'Test'} arrow interactive>
          <HelpOutlineIcon />
        </HtmlTooltip>
      );
    } else {
      return null;
    }
  }, []);

  // TODO : O.L : Use proper grid system instead of the 'br's
  return (
    <WizardContent data-testid={contentTestId}>
      <Grid item>
        <Typography variant={'h5'}>
          {titleContent}
          {infoTooltippedIcon}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant={'body1'}>{message}</Typography>
      </Grid>
      <Grid item>
        <Typography variant={'body2'}>{subMessage}</Typography>
      </Grid>

      <Grid item>{innerContent}</Grid>
      <Grid item>{actionButton}</Grid>
    </WizardContent>
  );
});