import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { ERROR_MESSAGES } from 'utils/constants';

import 'styles/containers/notFound.css';

const NotFound = () => (
  <Card className="card not-found">
    <CardHeader className="card-header" title="Not Found" />
    <CardContent className="card-content">
      <h3>{ERROR_MESSAGES.NOT_FOUND_PAGE}</h3>
    </CardContent>
  </Card>
);

export default NotFound;
