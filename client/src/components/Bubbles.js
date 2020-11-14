import React, { useState, useEffect, useContext } from "react";
import { Pack } from "@potion/layout";
import { Svg, Circle } from "@potion/element";
import { ColorContext } from '../context/ColorContext'

const Bubbles = () => {
  const [bubbleData, setBubbleData] = useState([]);
  const { colorList } = useContext(ColorContext)
  
  useEffect(() => {
    const generateBubbleData = colorList.map((_, i) => ({
      value: Math.floor(Math.random() * (colorList.length * 2)) + 1,
      key: `${i + 1}`
    }));
    setBubbleData(generateBubbleData);
  }, [colorList]);

  return (
    <div className="bubble-wrap">
      <p>bubbles</p>
      <Svg width={400} height={400}>
        <Pack
          data={{
            children: bubbleData
          }}
          sum={datum => datum.value}
          size={[400, 400]}
          includeRoot={false}
          nodeEnter={d => ({ ...d, r: 0 })}
          animate
        >
          {nodes =>
            nodes
              .map(({ x, y, r, key }, i) => {
                if (i < colorList.length) {
                  return (
                    <Circle
                      data-testid='circle'
                      key={key}
                      cx={x}
                      cy={y}
                      r={r}
                      fill={colorList[i].code.hex}
                    />
                  );
                }
                return null;
              })
              .filter(v => v)
          }
        </Pack>
      </Svg>
    </div>
  );
};

export default Bubbles;
