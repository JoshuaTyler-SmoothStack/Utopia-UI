import React from 'react';

// Components
import FlexColumn from "../../components/FlexColumn";

const Stage4 = (props) => {

  return (
    <FlexColumn className={props.className || ""} justify="around" style={props.style}>
      <h3 className="w-100 m-5">Stripe Mock Payment Integration</h3>
      <a href="https://smoothstack-utopia-airlines.atlassian.net/jira/software/projects/UA/boards/1?selectedIssue=UA-70"
        className="kit-link"
      >
        https://smoothstack-utopia-airlines.atlassian.net/jira/software/projects/UA/boards/1?selectedIssue=UA-70
      </a>
    </FlexColumn>
  );
};
export default Stage4;
