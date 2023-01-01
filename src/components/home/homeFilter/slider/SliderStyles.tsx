const TRACK_SIZE = 2;
const THUMB_SIZE = 20;
const GREEN = 'green';
const TRANSPARENT = 'transparent';
export const defaultStyles: {
  aboveThumbComponentsContainer: any;
  belowThumbComponentsContainer: any;
  container: any;
  debugThumbTouchArea: {
    backgroundColor: string;
    opacity: number;
    position: 'absolute';
  };
  renderThumbComponent: {
    position: 'absolute';
  };
  thumb: {
    borderRadius: number;
    height: number;
    position: 'absolute';
    width: number;
    borderColor: string;
    borderWidth: number;
  };
  touchArea: {
    backgroundColor: string;
    bottom: number;
    left: number;
    position: 'absolute';
    right: number;
    top: number;
  };
  track: {borderRadius: number; height: number};
  thumbActivate: {};
} = {
  aboveThumbComponentsContainer: {
    flexDirection: 'row',
  },
  belowThumbComponentsContainer: {
    flexDirection: 'row',
  },
  container: {
    height: 40,
    justifyContent: 'center',
    width: '90%',
    marginLeft: 20,
  },
  debugThumbTouchArea: {
    backgroundColor: GREEN,
    opacity: 0.5,
    position: 'absolute',
  },
  renderThumbComponent: {
    position: 'absolute',
  },
  thumb: {
    borderRadius: THUMB_SIZE / 2,
    height: THUMB_SIZE,
    position: 'absolute',
    width: THUMB_SIZE,
    borderColor: '#E5E5E5',
    borderWidth: 2,
  },
  thumbActivate: {
    borderRadius: THUMB_SIZE / 2,
    height: THUMB_SIZE,
    position: 'absolute',
    width: THUMB_SIZE,
    borderColor: '#590DE1',
    borderWidth: 2,
  },
  touchArea: {
    backgroundColor: TRANSPARENT,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  track: {
    // borderRadius: TRACK_SIZE / 2,
    height: TRACK_SIZE,
  },
};
