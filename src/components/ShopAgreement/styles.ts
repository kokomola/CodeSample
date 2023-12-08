import { StyleSheet } from "react-native";
import * as colors from '@constants/colors';

export const styles = StyleSheet.create({
	box: {
		paddingHorizontal: 25,
		paddingBottom: 15,
	},
	title: {
		paddingVertical: 15,
		fontSize: 20,
		color: colors.independence900,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	agreeBox: {
		flexDirection: 'row',
	},
	agreeText: {
		marginHorizontal: 10,
		color: colors.independence700
	},
	link: {
		color: colors.purple400,
		textDecorationLine: 'underline',
		textDecorationStyle: 'solid'
	},
	btnBox: {
		marginTop: 30,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	btnWrapper: {
		width: '45%',
		marginBottom: 35,
	},
});