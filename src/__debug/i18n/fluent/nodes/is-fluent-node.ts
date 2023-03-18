import type {
  BaseNode,
  Comment,
  Comments,
  FunctionReference,
  GroupComment,
  Identifier,
  InlineExpression,
  Junk,
  Message,
  MessageReference,
  NumberLiteral,
  Pattern,
  Placeable,
  Resource,
  ResourceComment,
  SelectExpression,
  StringLiteral,
  Term,
  TermReference,
  TextElement,
  VariableReference,
} from '@fluent/syntax';

export function isResourceNode(
  value: BaseNode,
): value is Resource {
  return (value.type === 'Resource');
}

export function isMessageNode(
  value: BaseNode,
): value is Message {
  return (value.type === 'Message');
}

export function isCommentNode(
  value: BaseNode,
): value is Comment {
  return (value.type === 'Comment');
}

export function isGroupCommentNode(
  value: BaseNode,
): value is GroupComment {
  return (value.type === 'GroupComment');
}

export function isResourceCommentNode(
  value: BaseNode,
): value is ResourceComment {
  return (value.type === 'ResourceComment');
}

export function isCommentsNode(
  value: BaseNode,
): value is Comments {
  return isCommentNode(value)
    || isGroupCommentNode(value)
    || isResourceCommentNode(value)
    ;
}

export function isJunkNode(
  value: BaseNode,
): value is Junk {
  return (value.type === 'Junk');
}

export function isIdentifierNode(
  value: BaseNode,
): value is Identifier {
  return (value.type === 'Identifier');
}

export function isPatternNode(
  value: BaseNode,
): value is Pattern {
  return (value.type === 'Pattern');
}

export function isPlaceableNode(
  value: BaseNode,
): value is Placeable {
  return (value.type === 'Placeable');
}

export function isStringLiteralNode(
  value: BaseNode,
): value is StringLiteral {
  return (value.type === 'StringLiteral');
}

export function isNumberLiteralNode(
  value: BaseNode,
): value is NumberLiteral {
  return (value.type === 'NumberLiteral');
}

export function isFunctionReferenceNode(
  value: BaseNode,
): value is FunctionReference {
  return (value.type === 'FunctionReference');
}

export function isMessageReferenceNode(
  value: BaseNode,
): value is MessageReference {
  return (value.type === 'MessageReference');
}

export function isTermReferenceNode(
  value: BaseNode,
): value is TermReference {
  return (value.type === 'TermReference');
}

export function isTermNode(
  value: BaseNode,
): value is Term {
  return (value.type === 'Term');
}

export function isInlineExpressionNode(
  value: BaseNode,
): value is InlineExpression {
  return isStringLiteralNode(value)
    || isNumberLiteralNode(value)
    || isFunctionReferenceNode(value)
    || isMessageReferenceNode(value)
    || isTermReferenceNode(value)
    || isVariableReferenceNode(value)
    || isPlaceableNode(value)
    ;
}

export function isLiteralNode(
  value: BaseNode,
): value is NumberLiteral {
  return isStringLiteralNode(value)
    || isNumberLiteralNode(value)
    ;
}

export function isSelectExpressionNode(
  value: BaseNode,
): value is SelectExpression {
  return (value.type === 'SelectExpression');
}

export function isVariableReferenceNode(
  value: BaseNode,
): value is VariableReference {
  return (value.type === 'VariableReference');
}

export function isTextElementNode(
  value: BaseNode,
): value is TextElement {
  return (value.type === 'TextElement');
}
