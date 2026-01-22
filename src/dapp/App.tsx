import React from "react";
import Modal from "react-bootstrap/Modal";
import { useService } from "@xstate/react";

import { Banner } from "./components/ui/HalveningBanner";
import {
  service,
  Context,
  BlockchainEvent,
  BlockchainState,
} from "./machine";

import {
  Connecting,
  Welcome,
  Saving,
  Error,
  TimerComplete,
  Unsupported,
} from "./components/modals";

import Farm from "./components/farm/Farm";

import "./App.css";
import { Crafting } from "./components/modals/Crafting";

export const App: React.FC = () => {
  const [machineState, send] = useService<
    Context,
    BlockchainEvent,
    BlockchainState
  >(service);

  const getStarted = () => {
    send("GET_STARTED");
  };

  return (
    <>
      <div id="container">
        <Farm />

        <Modal centered show={machineState.matches("loading")}>
          <Connecting />
        </Modal>

        <Modal centered show={machineState.matches("unsupported")}>
          <Unsupported />
        </Modal>

        <Modal centered show={machineState.matches("initial")}>
          <Welcome onGetStarted={getStarted} />
        </Modal>

        <Modal
          centered
          show={
            machineState.matches("saving") ||
            machineState.matches("collecting")
          }
        >
          <Saving />
        </Modal>

        <Modal centered show={machineState.matches("crafting")}>
          <Crafting />
        </Modal>

        <Modal centered show={machineState.matches("failure")}>
          <Error code={machineState.context.errorCode} />
        </Modal>
      </div>
      <Banner />
    </>
  );
};

export default App;
