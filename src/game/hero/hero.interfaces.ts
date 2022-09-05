import { TLocation } from '@game/common/common.types';

export interface ILocation {
  setLocation(location: TLocation): this;
  getLocation(): TLocation;
}
