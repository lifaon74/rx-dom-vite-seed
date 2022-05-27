import { NULL_TEMPLATE } from './null-template.constant';

export function generateTemplateVariableName(
  templateName: string,
): string {
  return `template_${templateName}`;
}

export function generateOptionalTemplateVariableName(
  templateName: string | undefined,
): string {
  return (templateName === void 0)
    ? NULL_TEMPLATE
    : generateTemplateVariableName(templateName);
}

