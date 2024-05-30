import React from "react";
import { View } from "react-native";
import { BarChart, Grid, XAxis, YAxis } from "react-native-svg-charts";
import { Text } from "react-native-svg";

const CustomBarChart = ({ data = [] }) => {
  const contentInset = { top: 20, bottom: 20 };

  const Labels = ({ x, y, bandwidth, data }) => (
    data.map((value, index) => (
      value.value !== 0 && (
        <Text
          key={index}
          x={x(index) + (bandwidth / 2) - 7}
          y={y(value.value) - 10}
          fontSize={14}
          fill="black"
          alignmentBaseline={'middle'}
          textAnchor={'middle'}
        >
          {value.value / 1000}k
        </Text>
      )
    ))
  );

  const formatYAxisLabel = (value) => {
    return `${value / 1000}k`;
  };

  const yAxisData = data.every(item => item.value === 0) ? [0, 50000, 100000, 150000, 200000] : data.map(item => item.value);

  return (
    <View style={{ height: 300, flexDirection: 'row' }}>
      <YAxis
        data={yAxisData}
        contentInset={contentInset}
        svg={{
          fill: 'black',
          fontSize: 12,
        }}
        numberOfTicks={5}
        formatLabel={(value) => formatYAxisLabel(value)}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <BarChart
          style={{ flex: 1 }}
          data={data}
          yAccessor={({ item }) => item.value}
          svg={{ fill: 'rgba(255, 165, 0, 0.8)' }}
          contentInset={contentInset}
          spacingInner={0.5}
          gridMin={5}
        >
          <Grid />
          <Labels />
        </BarChart>
        <XAxis
          style={{ marginHorizontal: -10 }}
          data={data}
          xAccessor={({ item, index }) => index}
          formatLabel={(index) => data[index].label}
          contentInset={{ left: 15, right: 15 }}
          svg={{ fontSize: 12, fill: 'black' }}
        />
      </View>
    </View>
  );
};

export default CustomBarChart;
