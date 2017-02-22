import * as types from '../actions/actionTypes';

const initialState = {
  region: {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  userRegion: {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  flags: [],
  scribbleInput: null,
  flagDetailBody: null,
  flagDetail: {
    idx: null,
    nickname: null,
    title: null,
    message: null,
    date: null,
    isWriterOfFlag: false,
  },
  map: null,
};

const mapManager = (state = initialState, action) => {
  switch (action.type) {
    case types.REFRESH_GPS:
      return Object.assign({}, state, {
        region: action.region,
      });

    case types.REFRESH_FLAGS:
      return Object.assign({}, state, {
        flags: action.flags,
      });

    case types.SET_USER_REGION:
      return Object.assign({}, state, {
        userRegion: action.userRegion,
      });

    case types.INIT_USER_REGION:
      return Object.assign({}, state, {
        region: state.userRegion,
      });

    case types.SET_SCRIBBLE_INPUT:
      return Object.assign({}, state, {
        scribbleInput: action.scribbleInput,
      });

    case types.SET_FLAG_DETAIL_BODY:
      return Object.assign({}, state, {
        flagDetailBody: action.flagDetailBody,
      });

    case types.SET_FLAG_DETAIL:
      return Object.assign({}, state, {
        flagDetail: action.flagDetail,
      });

    case types.REFRESH_MAP:
      return Object.assign({}, state, {
        map: action.map,
      });

    default:
      return state;
  }
};

export default mapManager;
