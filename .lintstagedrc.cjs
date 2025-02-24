/** @type { import('lint-staged').Config } */
module.exports = {
	'"src/**/*.ts\"': 'yarn format',
	'\"{src,apps,libs,test}/**/*.ts\"': 'yarn lint',
};
