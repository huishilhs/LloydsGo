import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { VictoryPie } from 'victory-native';
const size = 200

interface GaugeProps {
  /** Score from 0 to 100 */
  score: number;
  size: number;
}

/**
 * Example gauge with three colored arcs across the top
 * and a black needle overlay from right (0°) to left (180°).
 */
const VictoryGauge: React.FC<GaugeProps> = ({ score , size }) => {
    // Clamp score to the range 0 to 100.
    const clampedScore = Math.max(0, Math.min(score, 100));
  
    // In a full square of size size x size, the center is:
    const center = size / 2;
    // Use a slightly smaller radius to allow for margins.
    const radius = center - 10;
    
    // Define your data for the slices (make sure the sums add up to 100
    // if you want the arc to represent the entire half-circle).
    const data = [
      { x: 'Orange', y: 40 },
      { x: 'LightGreen', y: 30 },
      { x: 'DarkGreen', y: 30 },
    ];
    
    // Use VictoryPie with startAngle=270 and endAngle=450.
    // This will draw an arc along the right half of the circle.
    // (270° = up, 450° mod360 = 90° = down.)
    // The VictoryPie is rendered in a full square (size x size)
    // but we only show half of that square.
    
    // Compute the needle angle.
    // For a score of 0, we want an angle of 270°; for 100, 450° (which is 90° mod360).
    // Taking modulo 360 gives a continuous rotation that works with the transform.
    const rawNeedleAngle = 270 + (clampedScore / 100) * 180;
    const needleAngle = rawNeedleAngle % 360; // ensures angle is within 0 to 360
  return (
    <View style={styles.container}>
      {/* We'll layer VictoryPie and an SVG that draws the needle.
          You can do this in one SVG if you prefer, but layering
          can be simpler for some layouts. */}
      <View style={{ width: size, height: size / 2, marginBottom: 30 }}>
        <VictoryPie
          width={size}
          height={size}         // Let VictoryPie think it's in a square
          standalone={true}
          data={data}
          startAngle={270}
          endAngle={450}
          innerRadius={70}     // Adjust for thickness
          colorScale={['#FFA500', '#9EE37D', '#5EC279']}
          labels={() => null}   // Hide slice labels
          animate={{ duration: 500 }}
          style={{
            data: { stroke: 'white', strokeWidth: 2 },
          }}
        />
        {/* Now overlay an absolutely positioned SVG for the needle */}
        <View style={styles.needleContainer}>
          <Svg width={size} height={size / 2}>
            {/*
              We'll draw a line from the center to near the top edge,
              rotating it around the center so that 0° points right, 180° left.
            */}
            <Line
              x1={radius}
              y1={radius}
              x2={radius}
              y2={radius - 60} // how long the needle is
              stroke="black"
              strokeWidth={2}
              strokeLinecap="round"
              // Rotate around the center (radius, radius)
              // but the top half is only visually 0..(size/2).
              // Angles in SVG: 0°=right, 90°=down, 180°=left.
              transform={`rotate(${needleAngle} ${radius} ${radius})`}
            />
          </Svg>
        </View>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>{clampedScore}</Text>
      </View>
    </View>
  );
};

export default VictoryGauge;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  needleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: size,
    height: size / 2,
  },
  scoreContainer: {
    position: 'absolute',
    bottom: -15,
    alignSelf: 'center',
  },
  scoreText: {
    fontSize: 30,
  }
});
