import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
  Theme,
  Tooltip,
} from '@material-ui/core';
import useTheme from '@material-ui/core/styles/useTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useCallback, useMemo } from 'react';
import MaterialTable, { Column, MTableToolbar } from 'material-table';
import styled from 'styled-components';
import { EMPTY_ADDRESS } from '../../constants';
import IconButton from '@material-ui/core/IconButton';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { selectActionButtonTestIdFromAddress } from '../../__tests__/components/guardians/guardiansTestUtils';
import { useGuardiansTableTranslations } from '../../translations/translationsHooks';
import { ReactComponent as GlobeIcon } from '../../../assets/globe.svg';
import SvgIcon from '@material-ui/core/SvgIcon';
import { TABLE_ICONS } from '../tables/TableIcons';
import { Guardian } from '../../services/v2/orbsNodeService/model';
import { GuardianQualifications } from './GuardianQualifications';
import { ICommitteeMemberData } from '../../services/v2/orbsNodeService/OrbsNodeTypes';
import { Line } from 'rc-progress';

const asPercent = (num: number) =>
  (num * 100).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) + '%';

// DEV_NOTE : O.L : The '+' is a trick to get better display of round numbers
const secondsToDaysString = (seconds: number) => +(seconds / (60 * 60 * 24)).toFixed(2);

const getWebsiteAddress = (url: string) => (url.toLowerCase().indexOf('http') === 0 ? url : `http://${url}`);

const SelectButton = styled(Button)`
  min-width: 130px;
`;

const NameBox = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyItems: 'center',
}));

const NameContainer = styled.span(({ theme }) => ({
  paddingLeft: theme.spacing(2),
}));

const useStyles = makeStyles((theme) => ({
  toolbarWrapper: {
    '& .MuiToolbar-gutters': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

type TGuardianSelectionMode = 'Select' | 'Change' | 'None';

interface IProps {
  guardianSelectionMode: TGuardianSelectionMode;
  guardians: Guardian[];
  committeeMembers: ICommitteeMemberData[];

  selectedGuardian?: string;
  onGuardianSelect?: (guardian: Guardian) => void;
  tableTestId?: string;
  extraStyle?: React.CSSProperties;
  tableTitle?: string;

  // Styling
  densePadding?: boolean;
}

function compareGuardiansBySelectedAndThenStake(a: Guardian, b: Guardian, selectedGuardianAddress: string) {
  const selectedGuardianAddressLowerCase = selectedGuardianAddress.toLowerCase();
  if (a.EthAddress.toLowerCase() === selectedGuardianAddressLowerCase) {
    return -1;
  } else if (b.EthAddress.toLowerCase() === selectedGuardianAddressLowerCase) {
    return 1;
  } else {
    return b.EffectiveStake - a.EffectiveStake;
  }
}

export const GuardiansTable = React.memo<IProps>((props) => {
  const {
    guardianSelectionMode,
    guardians,
    onGuardianSelect,
    selectedGuardian,
    tableTestId,
    extraStyle,
    tableTitle,
    densePadding,
    committeeMembers,
  } = props;
  const guardiansTableTranslations = useGuardiansTableTranslations();

  const classes = useStyles();
  const theme = useTheme();

  const getGuardianSelectionCellContent = useCallback(
    (g: Guardian) => {
      let selectedGuardianCell = null;

      const actionButtonTestId = selectActionButtonTestIdFromAddress(g.EthAddress);
      const actionButtonOnClick = () => onGuardianSelect(g);
      const isSelectedGuardian = g.EthAddress.toLowerCase() === selectedGuardian.toLowerCase();

      switch (guardianSelectionMode) {
        case 'Select':
          selectedGuardianCell = (
            <SelectButton
              variant='contained'
              size='small'
              data-testid={actionButtonTestId}
              onClick={actionButtonOnClick}
            >
              {guardiansTableTranslations(isSelectedGuardian ? 'action_keep' : 'action_select')}
            </SelectButton>
          );
          break;
        case 'Change':
          const enabled = !!onGuardianSelect;
          const actionButtonIcon = isSelectedGuardian ? (
            <CheckCircleOutlineIcon data-testid={'selected-guardian-icon'} />
          ) : (
            <RadioButtonUncheckedIcon data-testid={'unselected-guardian-icon'} />
          );

          const iconColor = isSelectedGuardian ? theme.palette.secondary.main : theme.palette.grey['500'];

          selectedGuardianCell = (
            <Typography data-testid={`guardian-${g.EthAddress}-selected-status`}>
              <IconButton
                data-testid={actionButtonTestId}
                onClick={actionButtonOnClick}
                disabled={!enabled}
                style={{ color: iconColor }}
              >
                {actionButtonIcon}
              </IconButton>
            </Typography>
          );
          break;
        case 'None':
          selectedGuardianCell = null;
          break;
        default:
          throw new Error(`Invalid guardian selection mode of ${guardianSelectionMode}`);
      }

      return selectedGuardianCell;
    },
    [theme, guardianSelectionMode, guardiansTableTranslations, onGuardianSelect, selectedGuardian],
  );

  const hasSelectedGuardian = !!selectedGuardian && selectedGuardian !== EMPTY_ADDRESS;
  const addSelectionColumn = hasSelectedGuardian || (onGuardianSelect && guardianSelectionMode === 'Select');

  const sortedGuardians = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    () => guardians.slice().sort((a, b) => compareGuardiansBySelectedAndThenStake(a, b, selectedGuardian)),
    [guardians, selectedGuardian],
  );

  const getCommitteeMemberData = useCallback(
    (guardianEthAddress: string) => {
      const committeeMemberData = committeeMembers.find(
        (committeeMember) => committeeMember.EthAddress.toLowerCase() === guardianEthAddress.toLowerCase(),
      );

      return committeeMemberData;
    },
    [committeeMembers],
  );

  // TODO : ORL : TRANSLATIONS

  const columns = useMemo(() => {
    const columns: Column<Guardian>[] = [
      {
        title: '',
        field: '',
        render: (guardian) => (
          <GuardianQualifications
            guardian={guardian}
            committeeMembershipData={getCommitteeMemberData(guardian.EthAddress)}
          />
        ),
      },
      {
        title: guardiansTableTranslations('columnHeader_name'),
        field: 'Name',
        render: (guardian) => (
          <NameBox data-testid={`guardian-${guardian.EthAddress}`}>
            <NameContainer>
              <Typography>{guardian.Name}</Typography>
            </NameContainer>
          </NameBox>
        ),
        headerStyle: {
          textAlign: 'left',
        },
      },
      {
        title: guardiansTableTranslations('columnHeader_address'),
        field: 'EthAddress',
        render: (guardian) => (
          <Tooltip title={<Typography>{guardian.EthAddress}</Typography>} arrow placement={'right'}>
            <Typography style={{ fontFamily: 'monospace', textAlign: 'center' }}>
              {guardian.EthAddress.substring(0, 10)}...
            </Typography>
          </Tooltip>
        ),
        // TODO : FUTURE : O.L : Adding "fontFamily: 'monospace'" to the cell makes the Typography text larger and better, understand whats going on.
        cellStyle: {
          fontFamily: 'monospace',
        },
      },
      {
        title: guardiansTableTranslations('columnHeader_website'),
        field: 'Website',
        render: (guardian) => (
          <Tooltip title={<Typography>{guardian.Website}</Typography>}>
            <a
              data-testid={`guardian-${guardian.EthAddress}-website`}
              href={getWebsiteAddress(guardian.Website)}
              target='_blank'
              rel='noopener noreferrer'
            >
              <SvgIcon component={GlobeIcon} />
            </a>
          </Tooltip>
        ),
        cellStyle: {
          textAlign: 'center',
        },
        sorting: false,
      },
      {
        title: 'Rewards Distribution Frequency',
        field: 'DistributionFrequency',
        render: (guardian) => (
          <Typography variant={'button'}>{secondsToDaysString(guardian.DistributionFrequency)} days</Typography>
        ),
        cellStyle: {
          textAlign: 'center',
        },
        defaultSort: 'desc',
      },
      {
        title: 'Participation',
        field: 'ParticipationPercentage',
        render: (guardian) => {
          // const textColor = false ? yesColor : noColor;
          // const text = false ? guardiansTableTranslations('didVote_yes') : guardiansTableTranslations('didVote_no');

          const { ParticipationPercentage } = guardian;
          // TODO : ORL : Make this color gradient
          const color = ParticipationPercentage <= 30 ? 'red' : ParticipationPercentage <= 80 ? 'yellow' : 'green';

          return (
            <>
              <Line percent={ParticipationPercentage} strokeWidth={5} strokeColor={color} />
              <Typography>{ParticipationPercentage}%</Typography>
            </>
          );
        },
        cellStyle: {
          textAlign: 'center',
        },
        defaultSort: 'desc',
      },
      {
        title: 'Capacity',
        field: 'ParticipationPercentage',
        render: (guardian) => {
          // const textColor = false ? yesColor : noColor;
          // const text = false ? guardiansTableTranslations('didVote_yes') : guardiansTableTranslations('didVote_no');

          const { Capacity, SelfStake, DelegatedStake } = guardian;
          const selfStakePercentage = +((SelfStake / DelegatedStake) * 100).toFixed(2);
          // TODO : ORL : Make this color gradient
          const color = Capacity <= 30 ? 'green' : Capacity <= 80 ? 'yellow' : 'red';

          return (
            <Tooltip
              title={
                <>
                  <Typography>Self stake: {SelfStake} ORBS</Typography>
                  <Typography>Delegated stake: {DelegatedStake} ORBS</Typography>
                  <Typography>% self stake: {selfStakePercentage}%</Typography>
                </>
              }
            >
              <div>
                <Line percent={Capacity} strokeWidth={5} strokeColor={color} />
                <Typography>{Capacity}%</Typography>
              </div>
            </Tooltip>
          );
        },
        cellStyle: {
          textAlign: 'center',
        },
        defaultSort: 'desc',
      },
    ];

    if (addSelectionColumn) {
      columns.push({
        title: guardiansTableTranslations('columnHeader_selection'),
        field: '',
        render: (extendedGuardianInfo) => {
          return getGuardianSelectionCellContent(extendedGuardianInfo);
        },
        cellStyle: {
          textAlign: 'center',
        },
      });
    }

    return columns;
  }, [addSelectionColumn, getCommitteeMemberData, getGuardianSelectionCellContent, guardiansTableTranslations]);

  // DEV_NOTE : O.L : This prevents displaying of a large empty table if there are less than 50 Guardians.
  const pageSize = Math.min(50, guardians.length);

  return (
    <MaterialTable
      title={tableTitle || ''}
      columns={columns}
      data={sortedGuardians}
      icons={TABLE_ICONS}
      style={{ overflowX: 'auto' }}
      options={{
        padding: densePadding ? 'dense' : 'default',
        pageSize: pageSize,
        pageSizeOptions: [5, 10, pageSize],

        rowStyle: (guardian: Guardian) => ({
          backgroundColor:
            guardian.EthAddress.toLowerCase() === selectedGuardian.toLowerCase()
              ? 'rgba(66,66, 66, 0.55)'
              : 'rgba(33,33, 33, 0.55)',
        }),
        headerStyle: {
          backgroundColor: theme.palette.primary.dark,
          textAlign: 'center',
        },
      }}
      components={{
        // DEV_NOTE : This 'Hack' to style the toolbar is taken from 'https://github.com/mbrn/material-table/issues/1690#issuecomment-603755197'
        Toolbar: (props) => (
          <div className={classes.toolbarWrapper}>
            <MTableToolbar {...props} />
          </div>
        ),
      }}
    />
  );
});
