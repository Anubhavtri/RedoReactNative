import $primary from '../../settings/styles/DefaultPrimarySettings';
import {Dimensions, StatusBar} from 'react-native';

export default {
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#F5F5F5',

    marginTop: StatusBar.currentHeight || 0,
  },
  header: {
    // borderColor:'red',
    // borderWidth:1,
    minHeight: 60,
    maxHeight: 100,
    flex: 1,
    flexGrow: 1,
    padding: '5%',
    backgroundColor: '#F5F5F5',
  },
  text: {
    fontSize: 20,
    color: '#707070',
  },

  filter: {
    // borderColor:'red',
    // borderWidth:1,
    minHeight: 50,
    maxHeight: 60,
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    marginBottom: '2%',
    backgroundColor: '#FFFFFF',
  },
  filtertext: {
    color: '#205072',
    fontSize: 14,
    fontWeight: '500',
  },
  inactive: {
    fontSize: 14,
    color: '#A2A2A2',
  },
};
