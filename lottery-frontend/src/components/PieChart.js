import React, { useEffect, useRef } from 'react';

const PieChart = ({ list, description }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || list.length === 0) {
      return;
    }
    const context = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    const data = {};
    let total = 0;

    // Count occurrences of each element in the list
    list.forEach((element) => {
      if (data[element]) {
        data[element]++;
      } else {
        data[element] = 1;
      }
      total++;
    });

    // Generate slice colors using hash function
    const sliceColors = {};
    Object.keys(data).forEach((name) => {
      const hashCode = hashCodeFromString(name);
      const color = '#' + hashCode.substring(hashCode.length - 6);
      sliceColors[name] = color;
    });

    // Draw the pie chart and slice percentages with names
    let startAngle = 0;
    Object.keys(data).forEach((name) => {
      const value = data[name];
      const sliceAngle = (value / total) * 2 * Math.PI;

      context.beginPath();
      context.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      context.lineTo(centerX, centerY);
      context.fillStyle = sliceColors[name];
      context.fill();

      // Display slice percentage with name dynamically in font size, and disappear if too small
      if (sliceAngle > 0.15) {
        context.font = `${Math.min(radius / 10, 30)}px Arial`;
        context.fillStyle = '#ffffff';
        let label = `${name} (${value})`;
        if (label.length > 10) {
          label = `${name.substring(0, 5)}.. (${value})`;
        }
        context.fillText(label, centerX + radius / 2 * Math.cos(startAngle + sliceAngle / 2), centerY + radius / 2 * Math.sin(startAngle + sliceAngle / 2));
      }

      startAngle += sliceAngle;
    });
  }, [list]);

  if (list.length === 0) {
    return (
      <div className='flex flex-col rounded-lg bg-gray-700 break-all text-center px--5' >
        <div style={{ width: '300px', height: '300px', backgroundColor: '#1f2937', borderRadius: '50%', border: '2px solid white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p className='font-bold text-xl'>{"There are no participants yet"}</p>
        </div>
        <p className='font-bold text-xl'>{description}</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col rounded-lg bg-gray-700 break-all text-center'>
      <canvas ref={canvasRef} width={300} height={300} />
      <p className='font-bold text-xl'>{description}</p>
    </div>
  );
};

function hashCodeFromString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString();
}

export default PieChart;