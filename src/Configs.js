import {Dimensions} from 'react-native';

export default {
  ALLOW_FONT_SCALING: false,
  PASSWORD_PATTERN:
    '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[\\s!#$£¬%&\'()*+,-./:;=?@[\\\\\\]^_`{|}~"])[A-Za-z\\d\\s!#$£¬%&\'()*+,-./:;=?@[\\\\\\]^_`{|}~"]',
  PASSWORD_MAX_CHARACTERS: 128,
  PASSWORD_MIN_CHARACTERS: 6,
  API_TIME_OUT: 5000,
  phoneHeight: Dimensions.get('screen').height,
  phoneWidth: Dimensions.get('screen').width,
};
