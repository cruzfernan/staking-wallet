import { IGuardianInfo } from 'orbs-pos-data';
import * as React from 'react';
import { Table, TableHead, TableCell, TableBody, TableRow, Typography } from '@material-ui/core';

const asPercent = (num: number) =>
  (num * 100).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) + '%';

interface IProps {
  guardians: IGuardianInfo[];
}
export const GuardiansTable: React.FunctionComponent<IProps> = ({ guardians }) => (
  <Table data-testid={'guardians-table'}>
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Url</TableCell>
        <TableCell>Stake</TableCell>
        <TableCell>Voted</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {guardians.map((g, idx) => (
        <TableRow data-testid={`guardian-${idx + 1}`} key={g.name} hover>
          <TableCell data-testid={`guardian-${idx + 1}-name`}>{g.name}</TableCell>
          <TableCell data-testid={`guardian-${idx + 1}-website`}>{g.website}</TableCell>
          <TableCell data-testid={`guardian-${idx + 1}-stake`}>{asPercent(g.stake)}</TableCell>
          <TableCell data-testid={`guardian-${idx + 1}-voted`}>{g.voted.toString()}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
