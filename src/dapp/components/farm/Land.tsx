import React from "react";

import "./Land.css";

import { Square, Fruit, ActionableItem } from "../../types/contract";

import waterEdge from "../../images/water/edge.png";

import { FirstBlock } from "./FirstBlock";
import { SecondLand } from "./SecondBlock";
import { ThirdBlock } from "./ThirdBlock";
import { FourthBlock } from "./FourthBlock";
import { FifthBlock } from "./FifthBlock";
import { Tiles } from "./Tiles";
import { Trees } from "./NewTrees";
import { Stones } from "./NewStone";
import { NFTs } from "./NFTs";
import { Chickens } from "./Chickens";
import { Iron } from "./Iron";
import { Gold } from "./Gold";
import { Barn } from "./Barn";
import { Blacksmith } from "./Blacksmith";
import { Market } from "./Market";
import { Reward } from "./Reward";
import { FruitItem } from "../../types/fruits";
import { Inventory } from "../../types/crafting";

interface Props {
  land: Square[];
  balance: number;
  onHarvest: (landIndex: number) => void;
  onPlant: (landIndex: number) => void;
  selectedItem: ActionableItem;
  fruits: FruitItem[];
  account?: string;
  inventory: Inventory;
  totalItemSupplies: Inventory;
}

const columns = Array(60).fill(null);
const rows = Array(20).fill(null);

// based on the amount of fields, determine the level
const landToLevel = {
  5: 1,
  8: 2,
  11: 3,
  14: 4,
  17: 5,
};

export const Land: React.FC<Props> = ({
  fruits,
  land,
  balance,
  onHarvest,
  onPlant,
  selectedItem,
  account,
  inventory,
  totalItemSupplies,
}) => {
  const level = landToLevel[land.length];

  // Pan/drag state
  const [isPanning, setIsPanning] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = React.useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only start panning on middle click or when holding shift
    if (e.button === 1 || e.shiftKey) {
      setIsPanning(true);
      setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleMouseLeave = () => {
    setIsPanning(false);
  };

  return (
    <div
      className="land-container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{
        cursor: isPanning ? 'grabbing' : 'grab',
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isPanning ? 'none' : 'transform 0.1s ease-out',
      }}
    >
      <>
        {columns.map((_, column) =>
          rows.map((_, row) =>
            (column + row) % 2 ? null : (
              <div
                className="grass1"
                style={{
                  position: "absolute",
                  left: `calc(${(column - 25) * 62.5}px + 18px)`,
                  top: `${row * 62.5}px`,
                  width: "62.5px",
                  height: "62.5px",
                  background: "#5fc24b",
                }}
              />
            )
          )
        )}
        <div className="farm">
          <FirstBlock
            fruits={fruits}
            selectedItem={selectedItem}
            land={land}
            balance={balance}
            onHarvest={onHarvest}
            onPlant={onPlant}
          />
          <SecondLand
            fruits={fruits}
            selectedItem={selectedItem}
            land={land}
            balance={balance}
            onHarvest={onHarvest}
            onPlant={onPlant}
          />
          <ThirdBlock
            fruits={fruits}
            selectedItem={selectedItem}
            land={land}
            balance={balance}
            onHarvest={onHarvest}
            onPlant={onPlant}
          />
          <FourthBlock
            fruits={fruits}
            selectedItem={selectedItem}
            land={land}
            balance={balance}
            onHarvest={onHarvest}
            onPlant={onPlant}
          />
          <FifthBlock
            fruits={fruits}
            selectedItem={selectedItem}
            land={land}
            balance={balance}
            onHarvest={onHarvest}
            onPlant={onPlant}
          />

          <Trees inventory={inventory} />
          <Stones inventory={inventory} />
          <Iron inventory={inventory} />
          <Gold inventory={inventory} />

          <Chickens inventory={inventory} />
          <NFTs inventory={inventory} />

          <Barn farmSize={land.length} balance={balance} />
          <Blacksmith
            inventory={inventory}
            totalItemSupplies={totalItemSupplies}
            balance={balance}
            level={level}
          />
          <Market />
          <Tiles />
          <Reward account={account} />

          {/* {
                    land.map((square, index) => (
                        <Field square={square} onClick={square.fruit === Fruit.None ? () => onPlant(index) : () => onHarvest(index)}/> 
                    ))
                } */}
        </div>

        {/* Water */}
        {new Array(50).fill(null).map((_, index) => (
          <img
            className="water-edge"
            src={waterEdge}
            style={{
              position: "absolute",
              left: `${index * 62.5}px`,
            }}
          />
        ))}

        <div id="water" />
      </>
    </div>
  );
};
