import { Timeline, TimelineEvent } from 'react-event-timeline';
import {
  ArrowLeftCircleFill,
  ArrowRightCircleFill,
  XCircleFill,
  CheckCircleFill,
  EggFill,
} from 'react-bootstrap-icons';
import _ from 'lodash';
import moment from 'moment';

const DealTimeline = ({ stageHistory }) => {
  const dealStages = [
    'Initiated',
    'Qualified',
    'Contract Sent',
    'Closed Won',
    'Closed Lost',
  ];

  const history = stageHistory.map((stage, index, stageHistory) => {
    const currentStageIndex = dealStages.indexOf(stage.newValue);
    const lastStageIndex =
      index === 0 ? -1 : dealStages.indexOf(stageHistory[index - 1].newValue);
    if (lastStageIndex > currentStageIndex) {
      stage.movedBackward = true;
    }
    return stage;
  });

  _.reverse(history);

  const renderIcon = (stage) => {
    switch (stage) {
      case 'Initiated':
        return <EggFill />;
      case 'Closed Won':
        return <CheckCircleFill />;
      case 'Closed Lost':
        return <XCircleFill />;
      default:
        return <ArrowRightCircleFill />;
    }
  };

  return (
    <Timeline>
      {history.map((changeEntry) => (
        <TimelineEvent
          key={changeEntry.timeStamp}
          title={changeEntry.newValue}
          createdAt={moment(changeEntry.timeStamp).format(
            'MMMM Do YYYY, h:mm:ss a'
          )}
          icon={
            changeEntry.movedBackward ? (
              <h1>
                <ArrowLeftCircleFill />
              </h1>
            ) : (
              <h1>{renderIcon(changeEntry.newValue)}</h1>
            )
          }
          iconStyle={{ cursor: 'auto' }}
          bubbleStyle={{ borderColor: '#fff', backgroundColor: '#fff' }}
        >
          {changeEntry.user
            ? `${changeEntry.user} updated deal status to ${changeEntry.newValue}`
            : `Deal status updated to ${changeEntry.newValue}`}
        </TimelineEvent>
      ))}
    </Timeline>
  );
};
export default DealTimeline;
