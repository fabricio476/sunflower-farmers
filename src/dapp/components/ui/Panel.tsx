import React from "react";

import leftEdge from "../../images/ui/panel/dt_box_9slice_lc.png";
import rightEdge from "../../images/ui/panel/dt_box_9slice_rc.png";
import bottomEdge from "../../images/ui/panel/dt_box_9slice_bc.png";
import topEdge from "../../images/ui/panel/dt_box_9slice_tc.png";
import topLeft from "../../images/ui/panel/dt_box_9slice_tl.png";
import bottomLeft from "../../images/ui/panel/dt_box_9slice_bl.png";
import topRight from "../../images/ui/panel/dt_box_9slice_tr.png";
import bottomRight from "../../images/ui/panel/dt_box_9slice_br.png";

import leftEdgeInner from "../../images/ui/panel/lt_box_9slice_lc.png";
import rightEdgeInner from "../../images/ui/panel/lt_box_9slice_rc.png";
import bottomEdgeInner from "../../images/ui/panel/lt_box_9slice_bc.png";
import topEdgeInner from "../../images/ui/panel/lt_box_9slice_tc.png";
import topLeftInner from "../../images/ui/panel/lt_box_9slice_tl.png";
import bottomLeftInner from "../../images/ui/panel/lt_box_9slice_bl.png";
import topRightInner from "../../images/ui/panel/lt_box_9slice_tr.png";
import bottomRightInner from "../../images/ui/panel/lt_box_9slice_br.png";

import "./Panel.css";

interface Props {
  hasInner?: boolean;
  hasOuter?: boolean;
  hasTabs?: boolean;
}
export const Panel: React.FC<Props> = ({
  children,
  hasOuter = true,
  hasInner = true,
  hasTabs,
}) => {
  if (!hasOuter) {
    return (
      <div className="inner-pixel-panel">
        {children}
        <img id="panel-left-edge" src={leftEdgeInner} alt="" />
        <img id="panel-right-edge" src={rightEdgeInner} alt="" />
        <img id="panel-bottom-edge" src={bottomEdgeInner} alt="" />
        <img id="panel-top-edge" src={topEdgeInner} alt="" />
        <img id="panel-top-left" src={topLeftInner} alt="" />
        <img id="panel-bottom-left" src={bottomLeftInner} alt="" />
        <img id="panel-bottom-right" src={bottomRightInner} alt="" />
        <img id="panel-top-right" src={topRightInner} alt="" />
      </div>
    );
  }

  return (
    <div className={`pixel-panel ${hasTabs && "panel-tabs"}`}>
      {!hasInner && children}
      {hasInner && (
        <div className="inner-pixel-panel">
          {children}
          <img id="panel-left-edge" src={leftEdgeInner} alt="" />
          <img id="panel-right-edge" src={rightEdgeInner} alt="" />
          <img id="panel-bottom-edge" src={bottomEdgeInner} alt="" />
          <img id="panel-top-edge" src={topEdgeInner} alt="" />
          <img id="panel-top-left" src={topLeftInner} alt="" />
          <img id="panel-bottom-left" src={bottomLeftInner} alt="" />
          <img id="panel-bottom-right" src={bottomRightInner} alt="" />
          <img id="panel-top-right" src={topRightInner} alt="" />
        </div>
      )}

      <img id="panel-left-edge" src={leftEdge} alt="" />
      <img id="panel-right-edge" src={rightEdge} alt="" />
      <img id="panel-bottom-edge" src={bottomEdge} alt="" />
      <img id="panel-top-edge" src={topEdge} alt="" />
      <img id="panel-top-left" src={topLeft} alt="" />
      <img id="panel-bottom-left" src={bottomLeft} alt="" />
      <img id="panel-bottom-right" src={bottomRight} alt="" />
      <img id="panel-top-right" src={topRight} alt="" />
    </div>
  );
};
