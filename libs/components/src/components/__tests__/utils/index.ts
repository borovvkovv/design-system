export const mockBoundingClientRect = ({
  width,
  height,
  top,
  left,
  right,
  bottom,
  x,
  y,
}: {
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  x?: number;
  y?: number;
}): DOMRect => ({
  width: width ?? 0,
  height: height ?? 0,
  top: top ?? 0,
  left: left ?? 0,
  right: right ?? 0,
  bottom: bottom ?? 0,
  x: x ?? 0,
  y: y ?? 0,
  toJSON: () => {},
});
