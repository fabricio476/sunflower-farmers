import {
  Transaction,
  Square,
  Fruit,
  Donation,
} from "./types/contract";
import {
  Inventory,
  Recipe,
  items,
} from "./types/crafting";
import { onboarded } from "./utils/localStorage";
import { getUpgradePrice } from "./utils/land";
import { getGameState, saveGameState } from "./utils/gameState";

interface Account {
  farm: Square[];
  balance: number;
  id: string;
}

export class BlockChain {
  private account: string = "local-player";
  private details: Account = null;
  private inventory: Inventory = null;
  private totalItemSupplies: Inventory = items.reduce((acc, item) => ({ ...acc, [item.name]: 0 }), {} as Inventory);
  private stoneStrength: number = 0;
  private ironStrength: number = 0;
  private goldStrength: number = 0;
  private woodStrength: number = 0;
  private eggCollectionTime: number = 0;

  private events: Transaction[] = [];

  public get isConnected() {
    return true;
  }

  public get hasFarm() {
    return this.details && this.details.farm.length > 0;
  }

  public get myFarm() {
    return this.details;
  }

  public async initialise() {
    await new Promise((res) => window.setTimeout(res, 500));

    const state = getGameState();
    this.details = {
      balance: state.balance,
      farm: state.farm,
      id: this.account
    };
    this.inventory = state.inventory;
    this.eggCollectionTime = state.eggCollectionTime;

    return true;
  }

  public async getInventory() {
    return this.inventory;
  }

  public async getTotalItemSupplies() {
    return this.totalItemSupplies;
  }

  public async loadFarm() {
    const state = getGameState();
    this.details = {
      balance: state.balance,
      farm: state.farm,
      id: this.account
    };
    this.inventory = state.inventory;
    this.eggCollectionTime = state.eggCollectionTime;
  }

  public async createFarm(donation: Donation) {
    await new Promise((res) => window.setTimeout(res, 500));
    const state = getGameState();
    this.details = {
      balance: state.balance,
      farm: state.farm,
      id: this.account
    };
    onboarded();
  }

  public async save() {
    saveGameState({
      balance: this.details.balance,
      farm: this.details.farm,
      inventory: this.inventory,
      eggCollectionTime: this.eggCollectionTime
    });
    this.events = [];
    onboarded();
  }

  public async estimate() {
    return 0;
  }

  public async levelUp() {
    const price = getUpgradePrice({
      totalSupply: 0,
      farmSize: this.details.farm.length,
    });

    this.details = {
      ...this.details,
      balance: this.details.balance - price,
      farm: [
        ...this.details.farm,
        { createdAt: 0, fruit: Fruit.Sunflower },
        { createdAt: 0, fruit: Fruit.Sunflower },
        { createdAt: 0, fruit: Fruit.Sunflower },
      ],
    };
    await this.save();
  }

  public async craft({
    recipe,
    amount,
  }: {
    recipe: Recipe;
    amount: number;
  }) {
    this.inventory[recipe.name] += amount;

    recipe.ingredients.forEach((ingredient) => {
      if (ingredient.name === "Coins") {
        this.details = {
          ...this.details,
          balance: this.details.balance - ingredient.amount * amount,
        };
      } else {
        this.inventory[ingredient.name] -= ingredient.amount * amount;
      }
    });
    await this.save();
  }

  public async communityCraft(args: { recipe: Recipe; amount: number }) {
    return this.craft(args);
  }

  public async stake({
    resource,
    amount,
  }: {
    resource: string;
    amount: number;
  }) {
    // In client side, staking just consumes the tool and gives the resource immediately or handles it via events
    // For simplicity, we'll let the existing event system handle the harvesting logic which is already client-side
    await this.save();
  }

  public async getMarketConversion(): Promise<number> {
    return 0.1; // Static mock rate
  }

  public getWeb3() {
    return null;
  }

  public addEvent(event: Transaction) {
    this.events = [...this.events, event];
  }

  public isUnsaved() {
    // Always return false since we auto-save to localStorage
    return false;
  }

  public get isTrial() {
    return false;
  }

  public startTrialMode() { }
  public endTrialMode() { }

  public lastSaved() {
    return Date.now() / 1000;
  }

  public totalSupply() {
    return 0;
  }

  public async getCharityBalances() {
    return {
      coolEarthBalance: "0",
      waterBalance: "0",
      heiferBalance: "0",
    };
  }

  public offsetTime() { }

  public resetFarm() {
    this.events = [];
  }

  public async getReward() {
    return 0;
  }

  public async receiveReward() { }

  public async collectEggs() {
    const chickens = this.inventory.Chicken || 0;

    if (this.inventory["Chicken coop"] > 0) {
      this.inventory.Egg = (this.inventory.Egg || 0) + chickens * 3;
    } else {
      this.inventory.Egg = (this.inventory.Egg || 0) + chickens;
    }

    this.eggCollectionTime = Date.now() / 1000;
    await this.save();
  }

  public async getEggCollectionTime() {
    return this.eggCollectionTime;
  }

  public async getGoldStrength() {
    return this.goldStrength;
  }

  public async getIronStrength() {
    return this.ironStrength;
  }

  public async getStoneStrength() {
    return this.stoneStrength;
  }

  public async getWoodStrength() {
    return this.woodStrength;
  }

  public async getTreeStrength() {
    return this.woodStrength;
  }

  public getInventoryChange() {
    return {
      Gold: 0,
      Iron: 0,
      Stone: 0,
      Wood: 0,
    };
  }

  public async cacheTotalSupply() {
    return true;
  }

  public async quickswapRate() {
    return 1;
  }

  public async approve() {
    return true;
  }
}
