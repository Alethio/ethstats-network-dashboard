'use strict';

import { TimelineDataParserService } from 'service';
import { createSelector } from 'reselect';

const getTimeline = (state) => state.timeline.data;

export default createSelector(
  [ getTimeline ],
  (timelineData) => {
    return TimelineDataParserService.parseData(timelineData);
  }
);
