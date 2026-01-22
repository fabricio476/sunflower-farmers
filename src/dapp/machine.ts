import {
  createMachine,
  Interpreter,
  EventObject,
  interpret,
  assign,
} from "xstate";
import { Charity } from "./types/contract";
import { BlockChain } from "./Blockchain";
import { Recipe } from "./types/crafting";

export interface Context {
  blockChain: BlockChain;
  errorCode?: "NO_WEB3" | "WRONG_CHAIN";
}

const hasFarm = ({ blockChain }: Context) => {
  return blockChain.hasFarm;
};

const MOBILE_DEVICES =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

const isMobile = () => {
  return MOBILE_DEVICES.test(navigator.userAgent);
};

export interface SaveEvent extends EventObject {
  type: "SAVE";
  action: "SYNC" | "UPGRADE";
}

export interface CraftEvent extends EventObject {
  type: "CRAFT";
  recipe: Recipe;
  amount: number;
}

export interface ChopEvent extends EventObject {
  type: "CHOP";
  resource: string;
  amount: number;
}

export interface MineEvent extends EventObject {
  type: "MINE";
  resource: string;
  amount: number;
}

export interface CollectEggs extends EventObject {
  type: "COLLECT_EGGS";
}

export type BlockchainEvent =
  | { type: "GET_STARTED" }
  | SaveEvent
  | { type: "FINISH" }
  | CraftEvent
  | ChopEvent
  | MineEvent
  | CollectEggs
  | { type: "ACCOUNT_CHANGED" }
  | { type: "CANCEL" }
  | { type: "UPGRADE" }
  | { type: "TRIAL" }
  | { type: "PLANT" }
  | { type: "HARVEST" }
  | { type: "OPEN_REWARD" }
  | { type: "NEXT" }
  | { type: "TIMER_COMPLETE" };

export type BlockchainState = {
  value:
  | "loading"
  | "initial"
  | "farming"
  | "failure"
  | "saving"
  | "crafting"
  | "chopping"
  | "collecting"
  | "mining"
  | "upgrading"
  | "onboarding"
  | "rewarding"
  | "timerComplete"
  | "unsupported";
  context: Context;
};

export type BlockchainInterpreter = Interpreter<
  Context,
  any,
  BlockchainEvent,
  BlockchainState
>;

export const blockChainMachine = createMachine<
  Context,
  BlockchainEvent,
  BlockchainState
>({
  id: "farmMachine",
  initial: "initial",
  context: {
    blockChain: new BlockChain(),
    errorCode: null,
  },
  states: {
    initial: {
      on: {
        GET_STARTED: [
          {
            target: "unsupported",
            cond: isMobile,
          },
          {
            target: "loading",
          },
        ],
      },
    },
    loading: {
      invoke: {
        src: ({ blockChain }) => blockChain.initialise(),
        onDone: {
          target: "farming",
        },
        onError: {
          target: "failure",
        },
      },
    },
    farming: {
      on: {
        SAVE: { target: "saving" },
        CRAFT: { target: "crafting" },
        CHOP: { target: "chopping" },
        MINE: { target: "mining" },
        COLLECT_EGGS: { target: "collecting" },
        UPGRADE: { target: "upgrading" },
        TIMER_COMPLETE: { target: "timerComplete" },
      },
    },
    saving: {
      invoke: {
        src: async ({ blockChain }) => blockChain.save(),
        onDone: { target: "farming" },
        onError: { target: "failure" },
      },
    },
    crafting: {
      invoke: {
        src: async ({ blockChain }, event) => blockChain.craft(event as CraftEvent),
        onDone: { target: "farming" },
        onError: { target: "failure" },
      },
    },
    chopping: {
      invoke: {
        src: async ({ blockChain }, event) => blockChain.stake(event as ChopEvent),
        onDone: { target: "farming" },
        onError: { target: "failure" },
      },
    },
    mining: {
      invoke: {
        src: async ({ blockChain }, event) => blockChain.stake(event as ChopEvent),
        onDone: { target: "farming" },
        onError: { target: "failure" },
      },
    },
    collecting: {
      invoke: {
        src: async ({ blockChain }) => blockChain.collectEggs(),
        onDone: { target: "farming" },
        onError: { target: "failure" },
      },
    },
    upgrading: {
      invoke: {
        src: async ({ blockChain }) => blockChain.levelUp(),
        onDone: { target: "farming" },
        onError: { target: "failure" },
      },
    },
    failure: {
      on: {
        TRIAL: { target: "initial" }
      }
    },
    unsupported: {},
    onboarding: {},
    rewarding: {},
    timerComplete: {},
  },
});

export const service = interpret<
  Context,
  any,
  BlockchainEvent,
  BlockchainState
>(blockChainMachine);

service.start();
