import { space300 } from '@constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	image: {
		width: '100%',
		height: 180,
		resizeMode: 'cover',
		justifyContent: 'center',
		marginTop: 20,
	},
	container: {
		//width: '100%',
		flexGrow: 1,
		marginHorizontal: 16,
	},
	closeContainer: {
		paddingVertical: 16,
		borderBottomWidth: 1,
		borderBottomColor: space300,
	},
	closeButton: {
		alignSelf: 'flex-end',
	},
});