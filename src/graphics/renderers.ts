import { render } from './utils';
import colors from 'colors';
import { Level } from '@game/level/level';
import { RoomWalls } from '@game/level/level.types';
import { Hero } from '@game/hero/hero';
import { Logger } from '@nestjs/common';
import { CharacteristicLabel, RaceLabel } from '@game/hero/hero.enums';
import { Utils } from '@common/utils';

export namespace Graphic {
  export const logo = () =>
    render(
      colors.dim(
        colors.red(`
   ███▄ ▄███▓   ▓█c   ██▓          ██░ ██    ▓█████     ██▀███      ▒█████  
  ▓██▒▀█▀ ██▒    ▒██  ██▒         ▓██░ ██▒   ▓█   ▀    ▓██ ▒ ██▒   ▒██▒  ██▒
  ▓██    ▓██░     ▒██ ██░         ▒██▀▀██░   ▒███      ▓██ ░▄█ ▒   ▒██░  ██▒
  ▒██    ▒██      ░ ▐██▓░         ░▓█ ░██    ▒▓█  ▄    ▒██▀▀█▄     ▒██   ██░
  ▒██▒   ░██▒     ░ ██▒▓░         ░▓█▒░██▓   ░▒████▒   ░██▓ ▒██▒   ░ ████▓▒░
  ░ ▒░   ░  ░      ██▒▒▒           ▒ ░░▒░▒   ░░ ▒░ ░   ░ ▒▓ ░▒▓░   ░ ▒░▒░▒░ 
  ░  ░      ░    ▓██ ░▒░           ▒ ░▒░ ░    ░ ░  ░     ░▒ ░ ▒░     ░ ▒ ▒░ 
  ░      ░       ▒ ▒ ░░            ░  ░░ ░      ░        ░░   ░    ░ ░ ░ ▒  
        ░       ░ ░               ░  ░  ░      ░  ░      ░            ░ ░  
                ░ ░                                                                                                 
`),
      ),
    );

  export const level = (_level: Level) => {
    const length = 5;
    const HSWb = '▄';
    const HSWt = '▀';
    const HSDb = ' ';
    const HSDt = ' ';
    const VSW = '█';
    const VSD = ' ';
    const ARROW = colors.bold('V');
    const drawRoomLine1 = ({ x, y }: Record<string, any>, top: boolean) => {
      const topWall =
        x === 0 && y === 0
          ? `  ${ARROW}  `
          : HSWt + Array.from({ length: length - 2 }, () => (top ? HSWt : HSDt)).join('') + HSWt;

      return VSW + topWall + VSW;
    };
    const drawRoomLine2 = (left: boolean, right: boolean) =>
      (left ? VSW : VSD) + Array.from({ length }, () => ' ').join('') + (right ? VSW : VSD);
    const drawRoomLine3 = ({ x, y, width, height }: Record<string, any>, bottom: boolean) => {
      const bottomWall =
        x === width - 1 && y === height - 1
          ? `  ${ARROW}  `
          : HSWb + Array.from({ length: length - 2 }, () => (bottom ? HSWb : HSDb)).join('') + HSWb;

      return VSW + bottomWall + VSW;
    };
    const config: RoomWalls[][] = [];

    let width = 0;
    let height = 0;
    for (const [, room] of Object.entries(_level.getRooms())) {
      if (!config[room.x]) {
        config[room.x] = [];
      }
      config[room.x][room.y] = room.walls;
      height = Math.max(height, room.y + 1);
      width = Math.max(width, room.x + 1);
    }

    const lines = [];

    config.forEach((row, x) => {
      lines.push(
        row
          .map((walls, y) => {
            const result = drawRoomLine1({ x, y }, walls.top);

            return x === 0 && y === 0 ? colors.green(result) : result;
          })
          .join(''),
        row.map(walls => drawRoomLine2(walls.left, walls.right)).join(''),
        row
          .map((walls, y) => {
            const result = drawRoomLine3({ x, y, width, height }, walls.bottom);

            return x === width - 1 && y === height - 1 ? colors.green(result) : result;
          })
          .join(''),
      );
    });

    render(colors.bold(colors.yellow(`\n   The ${_level.getName()} Map\n`)));
    render(colors.dim(colors.yellow(lines.join('\n'))));
    render('');
  };

  export const hero = (_hero: Hero): void => {
    const COLUMN1_LENGTH = 17;
    const COLUMN2_LENGTH = 7;

    Logger.verbose(
      `Your hero is ${colors.bold(colors.blue(RaceLabel[_hero.getRace()]))} with name ${colors.bold(
        colors.green(_hero.getName()),
      )}`,
      null,
      { timestamp: false },
    );
    const characteristics = _hero.geCharacteristics();
    Logger.verbose(
      `${Utils.toStaticString(CharacteristicLabel.health, COLUMN1_LENGTH)} ${colors.red(
        Utils.toStaticString(`${characteristics.health}/${characteristics.maxHealth}`, COLUMN2_LENGTH),
      )}`,
      null,
      { timestamp: false },
    );
    Logger.verbose(
      `${Utils.toStaticString(CharacteristicLabel.manna, COLUMN1_LENGTH)} ${colors.blue(
        Utils.toStaticString(`${characteristics.manna}/${characteristics.maxManna}`, COLUMN2_LENGTH),
      )}`,
      null,
      { timestamp: false },
    );
    Logger.verbose(
      `${Utils.toStaticString(CharacteristicLabel.physicalAttack, COLUMN1_LENGTH)} ${Utils.toStaticString(
        String(characteristics.physicalAttack),
        COLUMN2_LENGTH,
      )}`,
      null,
      { timestamp: false },
    );
    Logger.verbose(
      `${Utils.toStaticString(CharacteristicLabel.physicalDefense, COLUMN1_LENGTH)} ${Utils.toStaticString(
        String(characteristics.physicalDefense),
        COLUMN2_LENGTH,
      )}`,
      null,
      { timestamp: false },
    );
    Logger.verbose(
      `${Utils.toStaticString(CharacteristicLabel.magicalAttack, COLUMN1_LENGTH)} ${Utils.toStaticString(
        String(characteristics.magicalAttack),
        COLUMN2_LENGTH,
      )}`,
      null,
      { timestamp: false },
    );
    Logger.verbose(
      `${Utils.toStaticString(CharacteristicLabel.magicalDefense, COLUMN1_LENGTH)} ${Utils.toStaticString(
        String(characteristics.magicalDefense),
        COLUMN2_LENGTH,
      )}`,
      null,
      { timestamp: false },
    );
    console.log('\n');
  };
}
