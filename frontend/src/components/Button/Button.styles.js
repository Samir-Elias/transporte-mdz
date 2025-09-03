import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';

export default StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  
  primary: {
    backgroundColor: colors.primary,
  },
  
  secondary: {
    backgroundColor: colors.secondary,
  },
  
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  
  disabled: {
    backgroundColor: colors.border,
    opacity: 0.6,
  },
  
  text: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    textAlign: 'center',
  },
  
  primaryText: {
    color: colors.textLight,
  },
  
  secondaryText: {
    color: colors.textLight,
  },
  
  outlineText: {
    color: colors.primary,
  },
  
  disabledText: {
    color: colors.textSecondary,
  },
});
