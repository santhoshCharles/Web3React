import React from "react";
import { Slider, Rail, Handles, Tracks } from "react-compound-slider";
import { SliderRail, Handle, Track } from "./RangeSlider"; // example render components - source below

const sliderStyle = {
  position: "relative",
  width: "100%",
};

const RSlider = (props) => {
  
  return (
    <div style={{ height: 24, width: "100%" }}>
      <Slider
        mode={props.mode}
        step={props.step}
        domain={props.domain}
        rootStyle={sliderStyle}
        onUpdate={props.handleUpdateBudget}
        onChange={props.handleChangeBudget}
        values={props.defaultValues}
      >
        <Rail>
          {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map((handle) => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  domain={props.domain}
                  getHandleProps={getHandleProps}
                  valueTooltip={props.valueTooltip}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks left={props.left} right={false}>
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                />
              ))}
            </div>
          )}
        </Tracks>
      </Slider>
    </div>
  );
};
export default RSlider;
