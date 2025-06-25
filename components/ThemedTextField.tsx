import { StyleSheet, TextInput, type TextInputProps, View, type ViewStyle } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextFieldProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  icon?: {
    name: string;
    position?: 'left' | 'right';
    onPress?: () => void;
  };
  containerStyle?: ViewStyle;
};

export function ThemedTextField({
  style,
  containerStyle,
  lightColor,
  darkColor,
  type = 'default',
  icon,
  ...rest
}: ThemedTextFieldProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  const renderIcon = () => {
    if (!icon) return null;
    
    return (
      <IconSymbol
        name={icon.name as any}
        size={20}
        color={color}
        style={[
          styles.icon,
          icon.position === 'right' ? styles.iconRight : styles.iconLeft
        ]}
      />
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {icon?.position === 'left' && renderIcon()}
      <TextInput
        style={[
          { color, backgroundColor },
          type === 'default' ? styles.default : undefined,
          type === 'title' ? styles.title : undefined,
          type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
          type === 'subtitle' ? styles.subtitle : undefined,
          type === 'link' ? styles.link : undefined,
          styles.input,
          icon && (icon.position === 'left' ? styles.inputWithLeftIcon : styles.inputWithRightIcon),
          style,
        ]}
        placeholderTextColor={color}
        {...rest}
      />
      {icon?.position === 'right' && renderIcon()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  inputWithLeftIcon: {
    paddingLeft: 40,
  },
  inputWithRightIcon: {
    paddingRight: 40,
  },
  icon: {
    position: 'absolute',
    zIndex: 1,
  },
  iconLeft: {
    left: 10,
  },
  iconRight: {
    right: 10,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
