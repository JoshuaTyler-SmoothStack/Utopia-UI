import React from 'react';

// Components
import FlexColumn from "../../components/FlexColumn";

const Stage5 = (props) => {

  return (
    <FlexColumn className={props.className || ""} justify="around" style={props.style}>
      <h3 className="w-100 m-5">Booking Confirmation + Email Confirmation</h3>
      <a href="https://smoothstack-utopia-airlines.atlassian.net/jira/software/projects/UA/boards/1/backlog?selectedIssue=UA-49"
        className="kit-link"
      >
        https://smoothstack-utopia-airlines.atlassian.net/jira/software/projects/UA/boards/1/backlog?selectedIssue=UA-49
      </a>
    </FlexColumn>
  );
};
export default Stage5;
