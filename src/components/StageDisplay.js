import React from 'react';

const StageDisplay = (props) => {
  // @PROP: disableStageNameNumbers - bool
  // @PROP: disableInactiveStageNames - bool
  // @PROP: stageSelected - Number
  // @PROP: stageClassName - String
  // @PROP: stageSelectedClassName - String
  // @PROP: stageCount - Number
  // @PROP: stageNames - [String]
  // @PROP: stageNamesClassName - string
  // @PROP: stageStyle - obj{}
  // @PROP: stageOnClick - [f()]

  const disableStageNameNumbers = props.disableStageNameNumbers || false;
  const disableInactiveStageNames = props.disableInactiveStageNames || false;
  const stageSelected = props.stage || 1;
  const stageSelectedClassName = props.stageSelectedClassName || "bg-dark";
  const stageClassName = props.stageClassName || "";
  const stageCount = props.stageCount || 1;
  const stageNames = props.stageNames || "Stage";
  const stageNamesClassName = props.stageNamesClassName || "";
  const stageStyle = props.stageStyle || {height:"1rem", minWidth:"3rem"};
  const stageOnClick = props.stageOnClick;

  const handleRenderStages = () => {
    const stagesRender = [];

    for(let i = 1; i <= stageCount; i++) {
      const stageIndex = i;
      const isStageSelected = (stageSelected === stageIndex);
      const stageName = stageNames
        ? stageNames.length ? stageNames[stageIndex-1] : stageNames
        : !disableStageNameNumbers ? String(`Stage: ${stageIndex+1}`) : "";

      stagesRender.push(
        <button key={String(`Stage-${stageIndex+1}`)}
          className="btn m-1"
          onClick={stageOnClick ? () => stageOnClick(stageIndex) : null}
        >
          <h5 className={stageNamesClassName}>
            {!(disableInactiveStageNames && !isStageSelected) && stageName}
          </h5>
          <div
            className={stageSelected === stageIndex ? stageSelectedClassName : stageClassName}
            style={stageStyle}
          />
        </button>
      );
    }
    return stagesRender;
  };

  return (
    <div
      className={("d-flex flex-row justify-content-center align-items-center " + props.className)}
      style={{...props.style, overflowX: "auto"}}
    >
      {handleRenderStages()}
    </div>
  );
}
export default StageDisplay;
