// react requires
const React           = require('react');

const ActivityItem = require('../activities/activity_item');

const ActivityList = React.createClass({

  render() {

    let activityItems = this.props.activities.map((activity) => {
      return <ActivityItem key={activity.id} activity={activity} />;
    });

    return (
      <ul className={`activity-list ${this.props.width}`}>
      { activityItems }
    </ul>
    );
  }

});

module.exports = ActivityList;
