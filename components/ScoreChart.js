import { Text } from "@rneui/base";
import { View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

export default function ScoreChart({ data }) {

  return (
    <View style={{ padding: 20 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: '#4a148c',
              marginRight: 8,
            }}
          />
          <Text
            style={{ color: 'lightgray' }}>
            Creative
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: '#6a1b9a',
              marginRight: 8,
            }}
          />
          <Text
            style={{ color: 'lightgray' }}>
            Performance
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          paddingBottom: 20
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: '#8e24aa',
              marginRight: 8,
            }}
          />
          <Text
            style={{ color: 'lightgray' }}>
            Song
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: '#ab47bc',
              marginRight: 8,
            }}
          />
          <Text
            style={{ color: 'lightgray' }}>
            Spectacle
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: '#ba68c8',
              marginRight: 8,
            }}
          />
          <Text
            style={{ color: 'lightgray' }}>
            Vocal
          </Text>
        </View>
      </View>
      <BarChart
        height={400}
        width={250}
        rotateLabel
        xAxisLabelTextStyle={{ width: 200, height: 80, marginBottom: -50 }}
        noOfSections={4}
        stackData={data}
      />
    </View>
  );
}
