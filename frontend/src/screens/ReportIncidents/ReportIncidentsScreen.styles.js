import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  scrollView: {
    flex: 1,
  },
  
  content: {
    padding: 16,
  },
  
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  
  title: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  
  subtitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.regular,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  
  formContainer: {
    marginBottom: 32,
  },
  
  inputContainer: {
    marginBottom: 20,
  },
  
  label: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.text,
    marginBottom: 8,
  },
  
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  
  typeOption: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: colors.border,
  },
  
  selectedType: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  
  typeIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  
  typeLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text,
    textAlign: 'center',
  },
  
  selectedTypeLabel: {
    color: colors.primary,
    fontWeight: typography.fontWeight.semiBold,
  },
  
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: typography.fontSize.md,
    backgroundColor: colors.background,
    color: colors.text,
    marginBottom: 8,
  },
  
  textArea: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: typography.fontSize.md,
    backgroundColor: colors.background,
    color: colors.text,
    height: 100,
  },
  
  locationButton: {
    alignSelf: 'flex-start',
  },
  
  submitButton: {
    marginTop: 16,
  },
  
  infoContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  
  infoTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  
  infoText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.regular,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.relaxed,
  },
  
  tipsContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  
  tipsTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  
  tipsText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.regular,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.relaxed,
  },
});
