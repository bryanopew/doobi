import React, {useState} from 'react';
import {SafeAreaView, ScrollView, Text, View, StyleSheet} from 'react-native';
import Styled from 'styled-components/native';
import {Slider} from './Slider';

const DEFAULT_VALUE = 0.2;

const borderWidth = 4;
const trackMarkStyles = StyleSheet.create({
  activeMark: {
    borderColor: 'red',
    borderWidth,
    left: -borderWidth / 2,
  },
  inactiveMark: {
    borderColor: 'grey',
    borderWidth,
    left: -borderWidth / 2,
  },
});

const styles = StyleSheet.create({
  titleContainer: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  sliderContainer: {
    paddingVertical: 16,
  },
  HeaderText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});
export const SliderContainer = (props: {
  caption: string;
  children: React.ReactElement;
  sliderValue?: number | Array<number>;
  trackMarks?: Array<number>;
}) => {
  const {caption, sliderValue, trackMarks} = props;
  const [value, setValue] = useState(sliderValue ? sliderValue : DEFAULT_VALUE);
  let renderTrackMarkComponent: React.ReactNode;

  if (trackMarks?.length && (!Array.isArray(value) || value?.length === 1)) {
    renderTrackMarkComponent = (index: number) => {
      const currentMarkValue = trackMarks[index];

      const style =
        currentMarkValue > Math.max(Array.isArray(value) ? value[0] : value)
          ? trackMarkStyles.activeMark
          : trackMarkStyles.inactiveMark;
      return <View style={style} />;
    };
  }
  const renderChildren = () => {
    return React.Children.map(props.children, (child: React.ReactElement) => {
      if (!!child && child.type === Slider) {
        return React.cloneElement(child, {
          onValueChange: setValue,
          renderTrackMarkComponent,
          trackMarks,
          value,
        });
      }

      return child;
    });
  };

  return (
    <View style={styles.sliderContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.HeaderText}>{caption}</Text>
        {/* <Text>{Array.isArray(value) ? value.join(' - ') : value}</Text> 
         범위 0-100 으로 headerText아래에 표시 */}
      </View>
      {renderChildren()}
    </View>
  );
};
