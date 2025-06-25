import { TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/context/ThemeProvider';
import { useThemeColor } from '@/hooks/useThemeColor';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const color = useThemeColor({}, 'icon');

  return (
    <TouchableOpacity onPress={toggleTheme}>
      <IconSymbol
        name={theme === 'light' ? 'sunny' : 'sunny'}
        size={24}
        color={color}
      />
    </TouchableOpacity>
  );
} 