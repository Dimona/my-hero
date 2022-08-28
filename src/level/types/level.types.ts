export type Room = {
  top: boolean;
  left: boolean;
  bottom: boolean;
  right: boolean;
};
export type Level = Record<string, Room>;
