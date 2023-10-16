import React from 'react';
import body from './body.png';

function BodyMap({ markedAreas, setMarkedAreas }) {
  const predefinedAreas = [
    {x:153,y:41,radius:20,name:"forehead"},
    {x:143,y:60,radius:20,name:"left ear"},
    {x:174,y:57,radius:20,name:"right ear"},
    {x:157,y:75,radius:20,name:"throat"},
    {x:120,y:95,radius:20,name:"left shoulder"},
    {x:194,y:91,radius:20,name:"right shoulder"},
    {x:162,y:122,radius:20,name:"chest"},
    {x:155,y:161,radius:20,name:"stomach"},
    {x:101,y:157,radius:40,name:"left arm"},
    {x:210,y:151,radius:40,name:"right arm"},
    {x:87,y:202,radius:20,name:"left palm"},
    {x:226,y:206,radius:20,name:"right palm"},
    {x:144,y:263,radius:20,name:"left knee"},
    {x:182,y:268,radius:20,name:"right knee"},
    {x:136,y:215,radius:20,name:"left leg"},
    {x:182,y:222,radius:20,name:"right leg"},
    {x:135,y:340,radius:20,name:"left foot"},
    {x:190,y:337,radius:20,name:"right foot"},
    {x:357,y:58,radius:30,name:"head"},
    {x:356,y:142,radius:40,name:"back"},
    {x:356,y:269,radius:40,name:"legs(back)"},
  ]

  const isPointInCircle = (x1, y1, x2, y2, radius) => {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return dx * dx + dy * dy <= radius * radius;
  };

  const handleClick = (e) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    // Check if the click point falls within an existing predefined area
    const predefinedArea = predefinedAreas.find((area) =>
      isPointInCircle(x, y, area.x, area.y, area.radius)
    );

    if (predefinedArea) {
      const isCircleExist = markedAreas.some(
        (area) => area.name === predefinedArea.name
      );

      if (!isCircleExist) {
        const newMarkedArea = {
          x: predefinedArea.x,
          y: predefinedArea.y,
          name: predefinedArea.name,
          radius: predefinedArea.radius, // Use the predefined radius
        };
        setMarkedAreas([...markedAreas, newMarkedArea]);
      }
    }
  };

  return (
    <div id="container" style={{ position: 'relative' }} onClick={handleClick}>
      <img
        src={body}
        alt="Body Map"
        style={{ width: '500px', height: 'auto' }}
      />
      {markedAreas.map((area, index) => (
        <div
          key={index}
          className="marked-area"
          style={{
            position: 'absolute',
            border: '4px solid red',
            borderRadius: '50%',
            width: `${2 * area.radius}px`,
            height: `${2 * area.radius}px`,
            left: `${area.x - area.radius}px`,
            top: `${area.y - area.radius}px`,
            cursor: 'pointer',
          }}
        >
          {area.name}
        </div>
      ))}
    </div>
  );
}

export default BodyMap;