import { MaterialCommunityIcons } from '@expo/vector-icons';

import { router, type Href } from 'expo-router';

import { StyleSheet, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';



import { SpringPressable } from '@/components/ui/SpringPressable';

import { Typography } from '@/components/ui/Typography';

import { ROUTES } from '@/constants/routes';

import { useLocale } from '@/contexts/LocaleContext';

import { useDashboardTheme } from '@/hooks/useDashboardTheme';

import { spacing } from '@/theme/spacing';

import { hapticLight } from '@/utils/haptics';

import type { DashboardTab } from '@/types/dashboard';



const PRIMARY_TAB_IDS: {

  id: DashboardTab | 'calculos';

  labelKey: 'nav.inicio' | 'nav.calculos' | 'nav.historial' | 'nav.ajustes';

  icon: 'home-outline' | 'calculator' | 'history' | 'cog-outline';

  highlighted?: boolean;

}[] = [

  { id: 'inicio', labelKey: 'nav.inicio', icon: 'home-outline' },

  { id: 'calculos', labelKey: 'nav.calculos', icon: 'calculator', highlighted: true },

  { id: 'historial', labelKey: 'nav.historial', icon: 'history' },

  { id: 'ajustes', labelKey: 'nav.ajustes', icon: 'cog-outline' },

];



interface HomePrimaryBottomNavProps {

  activeTab: DashboardTab;

  onTabChange: (tab: DashboardTab) => void;

}



export function HomePrimaryBottomNav({ activeTab, onTabChange }: HomePrimaryBottomNavProps) {

  const insets = useSafeAreaInsets();

  const { colors } = useDashboardTheme();

  const { t } = useLocale();



  return (

    <View

      style={[

        styles.wrap,

        {

          backgroundColor: colors.surfaceMuted,

          paddingBottom: Math.max(insets.bottom, spacing.sm),

          shadowColor: colors.shadow,

        },

      ]}>

      {PRIMARY_TAB_IDS.map((tab) => {

        const active = tab.id !== 'calculos' && activeTab === tab.id;

        const isCalculations = tab.id === 'calculos';

        // Misma marca en los 4 tabs (modo oscuro no debe mezclar accent + gris).
        const iconColor = colors.accent;

        const labelColor = iconColor;



        return (

          <SpringPressable

            key={tab.id}

            accessibilityRole="tab"

            accessibilityState={{ selected: active }}

            onPress={() => {

              hapticLight();

              if (isCalculations) {
                router.push(ROUTES.calculations as Href);
                return;
              }

              onTabChange(tab.id as DashboardTab);

            }}

            style={styles.tab}>

            <MaterialCommunityIcons

              name={tab.icon}

              size={isCalculations ? 24 : 22}

              color={iconColor}

            />

            <Typography

              variant="caption"

              style={[

                styles.tabLabel,

                { color: labelColor },

                (active || isCalculations) && styles.tabLabelActive,

                isCalculations && styles.tabLabelHighlighted,

              ]}>

              {t(tab.labelKey)}

            </Typography>

          </SpringPressable>

        );

      })}

    </View>

  );

}



const styles = StyleSheet.create({

  wrap: {

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-around',

    paddingTop: spacing.sm,

    paddingHorizontal: spacing.xs,

    shadowOpacity: 0.06,

    shadowRadius: 6,

    shadowOffset: { width: 0, height: -1 },

    elevation: 4,

  },

  tab: {

    flex: 1,

    alignItems: 'center',

    justifyContent: 'center',

    gap: 2,

    paddingVertical: spacing.xs,

  },

  tabLabel: {

    fontSize: 10,

    lineHeight: 12,

  },

  tabLabelActive: {

    fontWeight: '600',

  },

  tabLabelHighlighted: {

    fontWeight: '700',

  },

});

