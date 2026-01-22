import { Inventory, DEFAULT_INVENTORY } from "../types/crafting";
import { Square, Fruit } from "../types/contract";

const FARM_KEY = "sunflower_farmers_state";

interface GameState {
    balance: number;
    farm: Square[];
    inventory: Inventory;
    eggCollectionTime: number;
}

const INITIAL_STATE: GameState = {
    balance: 1000000,
    farm: [
        { createdAt: 0, fruit: Fruit.None },
        { createdAt: 0, fruit: Fruit.Sunflower },
        { createdAt: 0, fruit: Fruit.Sunflower },
        { createdAt: 0, fruit: Fruit.Sunflower },
        { createdAt: 0, fruit: Fruit.None },
    ],
    inventory: DEFAULT_INVENTORY,
    eggCollectionTime: 0,
};

export function getGameState(): GameState {
    const saved = localStorage.getItem(FARM_KEY);
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error("Failed to parse game state", e);
        }
    }
    return INITIAL_STATE;
}

export function saveGameState(state: GameState) {
    localStorage.setItem(FARM_KEY, JSON.stringify(state));
}
