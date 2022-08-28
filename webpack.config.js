const glob = require('glob');
const path = require('path');

function getMigrationsEntries(globPattern) {
  return glob.sync(globPattern).reduce((entries, filename) => {
    const migrationName = `${path.basename(path.dirname(filename))}/${path.basename(filename, '.ts')}`;
    return {
      ...entries,
      [migrationName]: filename,
    };
  }, {});
}

module.exports = options => {
  const migrationEntries = getMigrationsEntries(path.resolve(__dirname, `src/**/migrations/*.ts`));

  return {
    ...options,
    entry: {
      ...migrationEntries,
      main: options.entry,
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      libraryTarget: 'commonjs',
    },
  };
};
