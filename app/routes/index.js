import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import { PRIVACY_POLICY } from 'config';

import App from 'containers/App';

import HistoricalBlock from 'routes/pages/HistoricalBlock';
import NetworkStatistics from 'routes/pages/NetworkStatistics';
import PrivacyPolicy from 'routes/pages/PrivacyPolicy';

export default () => {
  return (
    <Route path="/" component={App}>
      <IndexRoute name="Network Statistics" component={NetworkStatistics} />
      { PRIVACY_POLICY && <Route path="privacy-policy" component={PrivacyPolicy} /> }
      <Route path="history/block/:blockNr" component={({ params }) => <HistoricalBlock blockNr={params.blockNr}/>} />
      <Route path="*" name="404" component={() => {
        browserHistory.replace('/');
        return null;
      }} />
    </Route>
  );
};
