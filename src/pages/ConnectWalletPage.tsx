import React, { useMemo } from 'react';
import { observer } from 'mobx-react';
import { useCryptoWalletIntegrationStore } from '../store/storeHooks';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Youtube from 'react-youtube';

export const ConnectWalletPage = observer(() => {
  const cryptoWalletIntegrationStore = useCryptoWalletIntegrationStore();

  const installOrConnectMetamask = useMemo(() => {
    if (cryptoWalletIntegrationStore.hasEthereumProvider) {
      return <Button onClick={() => cryptoWalletIntegrationStore.askToConnect()}>Connect your metamask</Button>;
    } else {
      return (
        <>
          <Button>Install metamask</Button>
        </>
      );
    }
  }, [cryptoWalletIntegrationStore.hasEthereumProvider]);

  return (
    <Container>
      <Grid item xs={12}>
        <Typography variant={'h4'}>Connect your wallet</Typography>

        <br />
        {installOrConnectMetamask}
        <br />

        <br />
        <Youtube videoId={'6Gf_kRE4MJU'} />
      </Grid>
    </Container>
  );
});