import React from 'react';

const StageDisplay = (props) => {
  // @PROP: disableStageNameNumbers - bool
  // @PROP: stageSelected - Number
  // @PROP: stageClassName - String
  // @PROP: stageSelectedClassName - String
  // @PROP: stageCount - Number
  // @PROP: stageNames - [String]
  // @PROP: stageNamesClassName - string
  // @PROP: stageStyle - obj{}
  // @PROP: stageOnClicks - [f()]

  const stageSelected = props.stage || 1;
  const stageSelectedClassName = props.stageSelectedClassName || "bg-dark";
  const stageClassName = props.stageClassName || "";
  const stageCount = props.stageCount || 1;
  const stageNames = props.stageNames || "Stage";
  const stageNamesClassName = props.stageNamesClassName || "";
  const stageStyle = props.stageStyle;
  const stageOnClicks = props.stageOnClicks;

  const handleRenderStages = () => {
    const stagesRender = [];
    for(let i = 0; i < stageCount; i++) {
      stagesRender.push(
        <div key={String(`Stage-${i}`)}
          className="m-2"
          onClick={stageOnClicks ? stageOnClicks[i] || null : null}
        >
          <h5 className={stageNamesClassName}>
            {stageNames.length
              ? stageNames[i] || String(`Stage: ${i}`)
              : stageNames
            }
          </h5>
          <div
            className={stageSelected === i ? stageSelectedClassName : stageClassName}
            style={stageStyle}
          />
        </div>
      );
    }
    return stagesRender;
  };

  return (
    <div
      className={("d-flex flex-row justify-content-center align-items-center p-1 " + props.className)}
      style={props.style}
    >
      {handleRenderStages()}
    </div>
  );
}
export default StageDisplay;
