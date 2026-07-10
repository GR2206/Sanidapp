import { useDashboardTheme } from '@/hooks/useDashboardTheme';

import { spacing } from '@/theme/spacing';

import { StyleSheet, View } from 'react-native';



export function DashboardSectionDivider() {

  const { colors } = useDashboardTheme();



  return <View style={[styles.divider, { backgroundColor: colors.borderSubtle }]} />;

}



const styles = StyleSheet.create({

  divider: {

    height: StyleSheet.hairlineWidth,

    marginHorizontal: spacing.lg,

  },

});

