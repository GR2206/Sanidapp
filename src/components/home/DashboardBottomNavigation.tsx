import { StyleSheet, View } from 'react-native';

import { HomePrimaryBottomNav } from '@/components/home/HomePrimaryBottomNav';
import type { ContentUpdateBadgeMap } from '@/types/contentUpdates';
import type { DashboardTab } from '@/types/dashboard';

interface DashboardBottomNavigationProps {
  badges: ContentUpdateBadgeMap;
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
}

export function DashboardBottomNavigation({
  badges: _badges,
  activeTab,
  onTabChange,
}: DashboardBottomNavigationProps) {
  return (
    <View style={styles.root}>
      <HomePrimaryBottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
});
