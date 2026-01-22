import { useService } from "@xstate/react";
import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import classnames from "classnames";

import rock from "../../images/land/iron.png";
import mining from "../../images/characters/mining.gif";
import stone from "../../images/ui/ore.png";
import smallRock from "../../images/decorations/rock2.png";
import pickaxe from "../../images/ui/pickaxe.png";

import closeIcon from "../../images/ui/close.png";
import waiting from "../../images/characters/waiting.gif";
import questionMark from "../../images/ui/expression_confused.png";
import arrowUp from "../../images/ui/arrow_up.png";
import arrowDown from "../../images/ui/arrow_down.png";
import timer from "../../images/ui/timer.png";

import { Panel } from "../ui/Panel";
import { Message } from "../ui/Message";
import { Button } from "../ui/Button";

import {
  BlockchainEvent,
  BlockchainState,
  Context,
  service,
} from "../../machine";

import { Inventory, items } from "../../types/crafting";

import "./Trees.css";

const ROCKS: React.CSSProperties[] = [
  {
    gridColumn: "15/16",
    gridRow: "10/11",
  },
  {
    gridColumn: "5/6",
    gridRow: "12/13",
  },
  {
    gridColumn: "1/2",
    gridRow: "7/8",
  },
];

interface Props {
  inventory: Inventory;
}

export const Iron: React.FC<Props> = ({ inventory }) => {
  const [machineState, send] = useService<
    Context,
    BlockchainEvent,
    BlockchainState
  >(service);

  const [showModal, setShowModal] = React.useState(false);
  const [treeStrength, setTreeStrength] = React.useState(3);
  const [amount, setAmount] = React.useState(0);
  const [choppedCount, setChoppedCount] = React.useState(0);
  const [showChoppedCount, setShowChoppedCount] = React.useState(false);

  useEffect(() => {
    const load = async () => {
      const strength = await machineState.context.blockChain.getIronStrength();
      setTreeStrength(Math.floor(Number(strength)));
    };

    if (machineState.matches("farming")) {
      load();
      setAmount(0);
    }
  }, [machineState]);

  useEffect(() => {
    const change = machineState.context.blockChain.getInventoryChange();

    if (change.Iron > 0) {
      setChoppedCount(change.Iron);
      setShowChoppedCount(true);
      setShowChoppedCount(true);
      setTimeout(() => setShowChoppedCount(false), 3000);
    }
  }, [machineState, inventory]);

  const chop = () => {
    send("MINE", {
      resource: items.find((item) => item.name === "Iron").address,
      amount: amount,
    });

    setShowModal(false);
  };

  const open = () => {
    setShowModal(true);
    setAmount(1);
  };

  const close = () => {
    setShowModal(false);
    setAmount(0);
  };

  const limit = Math.min(treeStrength, inventory["Stone Pickaxe"]);

  return (
    <>
      {ROCKS.map((gridPosition, index) => {
        const choppedTreeCount = 3 - treeStrength;
        if (choppedTreeCount > index || machineState.matches("onboarding")) {
          return (
            <div style={gridPosition}>
              <img
                src={smallRock}
                className="mined-rock gather-tree"
                alt="Small Rock"
              />
            </div>
          );
        }

        const isNextToChop = choppedTreeCount === index;
        const isHighlighted = amount + choppedTreeCount >= index + 1;
        const showWaiting =
          !machineState.matches("onboarding") &&
          !machineState.matches("mining") &&
          (isNextToChop || isHighlighted);

        return (
          <div
            style={gridPosition}
            className={classnames("gather-tree", {
              "gatherer-selected": isHighlighted,
              gatherer: isNextToChop,
            })}
            onClick={isNextToChop ? open : undefined}
          >
            <img src={rock} className="rock-mine" alt="Iron Rock" />
            {isHighlighted && machineState.matches("mining") && (
              <>
                <img src={mining} className="miner" alt="Mining" />
                <div className="gathered-resource-feedback">
                  <span>+</span>
                  <img src={stone} className="wood-chopped" alt="Iron Ore" />
                </div>
              </>
            )}
            {showWaiting && (
              <div>
                <img src={waiting} className="miner" alt="Waiting" />
                <img src={questionMark} className="miner-question" alt="Question" />
              </div>
            )}
          </div>
        );
      })}

      {showModal && (
        <Modal
          show={showModal}
          centered
          onHide={close}
          backdrop={false}
          dialogClassName="gather-modal"
        >
          <Panel>
            <div className="gather-panel">
              <img
                src={closeIcon}
                className="gather-close-icon"
                onClick={close}
                alt="Close"
              />

              <div className="resource-materials">
                <div>
                  <div className="resource-material">
                    <span>Requires</span>
                    <img src={pickaxe} alt="Pickaxe" />
                  </div>
                  <div className="resource-material">
                    <span>Mines</span>
                    <div>
                      <span>3-5</span>
                      <img src={stone} alt="Iron Ore" />
                    </div>
                  </div>
                  <div className="resource-material">
                    <span>Regrows every 4 hours</span>
                    <div>
                      <img id="resource-timer" src={timer} alt="Timer" />
                    </div>
                  </div>
                </div>
                {inventory["Stone Pickaxe"] < amount ? (
                  <Message>
                    You need a <img src={pickaxe} className="required-tool" alt="Pickaxe" />
                  </Message>
                ) : (
                  <div className="gather-resources">
                    <div id="craft-count">
                      <img className="gather-axe" src={pickaxe} alt="Pickaxe" />
                      <Message>{amount}</Message>
                      <div id="arrow-container">
                        {amount < limit ? (
                          <img
                            className="craft-arrow"
                            alt="Step up donation value"
                            src={arrowUp}
                            onClick={() => setAmount((r) => r + 1)}
                          />
                        ) : (
                          <div />
                        )}

                        {amount > 1 && (
                          <img
                            className="craft-arrow"
                            alt="Step down donation value"
                            src={arrowDown}
                            onClick={() => setAmount((r) => r - 1)}
                          />
                        )}
                      </div>
                    </div>

                    <Button
                      onClick={chop}
                      disabled={inventory["Stone Pickaxe"] < amount}
                    >
                      <span id="craft-button-text">Mine</span>
                    </Button>
                  </div>
                )}
              </div>
              <div className="resource-details">
                <span className="resource-title">Iron</span>
                <img src={rock} className="resource-image" alt="Iron Rock" />
                <span className="resource-description">
                  A bountiful resource that can be mined for iron ore.
                </span>
                <a
                  href="https://docs.sunflower-farmers.com/resources"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3 className="current-price-supply-demand">Read more</h3>
                </a>
              </div>
            </div>
          </Panel>
        </Modal>
      )}
      <div
        id="resource-increase-panel"
        style={{
          opacity: showChoppedCount ? 1 : 0,
        }}
      >
        <Panel>
          <div className="wood-toast-body">
            +{choppedCount}
            <img className="gather-axe" src={stone} alt="Iron Ore" />
          </div>
        </Panel>
      </div>
    </>
  );
};
