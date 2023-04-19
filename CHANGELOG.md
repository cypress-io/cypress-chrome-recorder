## [2.3.1](https://github.com/cypress-io/cypress-chrome-recorder/compare/v2.3.0...v2.3.1) (2023-04-19)


### Bug Fixes

* indentation ([1423d4c](https://github.com/cypress-io/cypress-chrome-recorder/commit/1423d4c0a15b559f239436c322aeb419753df8af))

# [2.3.0](https://github.com/cypress-io/cypress-chrome-recorder/compare/v2.2.0...v2.3.0) (2022-11-16)


### Features

* implement stringifyStep ([5534eef](https://github.com/cypress-io/cypress-chrome-recorder/commit/5534eef30f5e03a88cdb0f5ba9259f6a690528e0))

# [2.2.0](https://github.com/cypress-io/cypress-chrome-recorder/compare/v2.1.0...v2.2.0) (2022-08-22)


### Features

* **hover:** add support for hover ([d6674b5](https://github.com/cypress-io/cypress-chrome-recorder/commit/d6674b5e8ee023113efe5fc14086ada9e1820293))

# [2.1.0](https://github.com/cypress-io/cypress-chrome-recorder/compare/v2.0.0...v2.1.0) (2022-08-17)


### Features

* add assertion for navigation event after click. update replay library. ([c6b21b3](https://github.com/cypress-io/cypress-chrome-recorder/commit/c6b21b320180f31837a199c1b881edf78e707a50))

# [2.0.0](https://github.com/cypress-io/cypress-chrome-recorder/compare/v1.4.0...v2.0.0) (2022-07-18)


### Features

* Update the output path from .spec to .cy  ([04163b3](https://github.com/cypress-io/cypress-chrome-recorder/commit/04163b3a8d736fc58fefeac031db0647cba28fbe))


### BREAKING CHANGES

* Update the output path from .spec to .cy for v10

# [1.4.0](https://github.com/cypress-io/cypress-chrome-recorder/compare/v1.3.0...v1.4.0) (2022-05-13)


### Features

* **dblclick:** add support for dblclick. ([2e14fa6](https://github.com/cypress-io/cypress-chrome-recorder/commit/2e14fa6f603d4eb8a277d7c49e875f1fc6143487))
* **rightclick:** add support for click events with secondary button presses. ([64b0a1d](https://github.com/cypress-io/cypress-chrome-recorder/commit/64b0a1d488c11e9e0353c0010ed99a49be06896d))

# [1.3.0](https://github.com/cypress-io/cypress-chrome-recorder/compare/v1.2.0...v1.3.0) (2022-05-03)


### Bug Fixes

* update file extension ([32b6bab](https://github.com/cypress-io/cypress-chrome-recorder/commit/32b6bab97a98139149f1b9850b1f94cfde3fbf92))


### Features

* add supported keys for keyDown step. ([cdea4c6](https://github.com/cypress-io/cypress-chrome-recorder/commit/cdea4c6eccfc7bc313494b56c5741925669b1636))

# [1.2.0](https://github.com/cypress-io/cypress-chrome-recorder/compare/v1.1.1...v1.2.0) (2022-04-29)


### Features

* add output path flag and input so users can specify output folder. ([96512fa](https://github.com/cypress-io/cypress-chrome-recorder/commit/96512fae0b15dd2333fedd01ad310de17b1e868e))

## [1.1.1](https://github.com/cypress-io/cypress-chrome-recorder/compare/v1.1.0...v1.1.1) (2022-04-25)


### Bug Fixes

* **filenames:** ensure correct filename is exported regardless of nesting. add version tag to readme. ([a5c8334](https://github.com/cypress-io/cypress-chrome-recorder/commit/a5c8334541fd1b7191ba475aa2f79d5c311572c2))

# [1.1.0](https://github.com/cypress-io/cypress-chrome-recorder/compare/v1.0.1...v1.1.0) (2022-04-12)


### Features

* **replay:** update puppeteer/replay library ([47a2669](https://github.com/cypress-io/cypress-chrome-recorder/commit/47a26698c7249a6358c86d6a98b05a526d4bd9ce))

## [1.0.1](https://github.com/cypress-io/cypress-chrome-recorder/compare/v1.0.0...v1.0.1) (2022-03-25)


### Bug Fixes

* remove console log ([62f3639](https://github.com/cypress-io/cypress-chrome-recorder/commit/62f363944b43be1e4043b632f5cdcdcf6be8982a))

# 1.0.0 (2022-03-23)


### Bug Fixes

* update name in release workflow ([aeeccff](https://github.com/cypress-io/cypress-chrome-recorder/commit/aeeccff891c86e962cf07b04cfbd1849523a91cc))
* update releaserc ([678f8e9](https://github.com/cypress-io/cypress-chrome-recorder/commit/678f8e95b94be4b048648b7d48d405ca62d8f7be))
* update transforms function to correctly handle file inputs ([58731e8](https://github.com/cypress-io/cypress-chrome-recorder/commit/58731e84a3f3d95364fba97e5323225f10db6fc3))
* update types in test ([e70ad3a](https://github.com/cypress-io/cypress-chrome-recorder/commit/e70ad3a5c4484f0e3e3b28ff922b156057f7bd38))


### Features

* add ability to write and print via cli. update stringify formatting. ([a54ba4f](https://github.com/cypress-io/cypress-chrome-recorder/commit/a54ba4f7f03a1c4486578df0f608d4c7e56cfe13))
* add build-test workflow ([7acc3e2](https://github.com/cypress-io/cypress-chrome-recorder/commit/7acc3e259a4f47197d92e54b791f3ae1fc4f3981))
* add cli functionality. ([b8004d4](https://github.com/cypress-io/cypress-chrome-recorder/commit/b8004d48982c23a6f5a375b26fb9776ca1aab974))
* add cypress stringify extension. ad functions to parse files and correctly stringify to cypress ([688ad06](https://github.com/cypress-io/cypress-chrome-recorder/commit/688ad060e3cbd00a755716097849535c836ab97b))
* add recordings folder for output and demo purposes. ([ddaedfd](https://github.com/cypress-io/cypress-chrome-recorder/commit/ddaedfdad75f66d2813a256ef22c0202a373f212))
* **semantic-deploys:** add semantic versioning and deploy-related functionality. ([ef5c47a](https://github.com/cypress-io/cypress-chrome-recorder/commit/ef5c47a2950ecbd14c371719aceaa04b9e4d4ae4))
* **test:** add mocha and unit test CypressStringifyExtension ([25f807d](https://github.com/cypress-io/cypress-chrome-recorder/commit/25f807da1cfb308a74c814010dca6f9f38742f23))
* **test:** add unit test for keyDown ([308c40a](https://github.com/cypress-io/cypress-chrome-recorder/commit/308c40a8e96a55c9ed57ccf8f6f1b599c4fcf8f6))
