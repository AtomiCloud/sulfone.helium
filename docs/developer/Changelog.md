## [2.2.0](https://github.com/AtomiCloud/sulfone.helium/compare/v2.1.0...v2.2.0) (2026-03-23)


### 📜 Documentation 📜

* add language identifiers to unlabeled code blocks in task-spec ([9997f4c](https://github.com/AtomiCloud/sulfone.helium/commit/9997f4cb6c4648986b3cd6a93d8d57b10be6c04b))
* add Resolver SDK documentation [CU-86ewrbr69] ([045b1d2](https://github.com/AtomiCloud/sulfone.helium/commit/045b1d2bf6c962ad32c1827235881ab2a12bc01a))
* add Resolver SDK documentation [CU-86ewrbr69] ([#6](https://github.com/AtomiCloud/sulfone.helium/issues/6)) ([2430b31](https://github.com/AtomiCloud/sulfone.helium/commit/2430b319d0a60dd1a3cd951004fb977ff9c35f71))
* add task spec and implementation plans for CU-86ex00up9 v1 ([f36ce80](https://github.com/AtomiCloud/sulfone.helium/commit/f36ce8048a4819164ac520e7139effd70b5cca15))
* update polish state to poll with pushCycle 3 ([af862c3](https://github.com/AtomiCloud/sulfone.helium/commit/af862c3227c27741495dbc24c402eff147561f2d))


### 🚀 Features 🚀

* **CU-86ex00up9:** add test configs and Dockerfiles for 12 artifacts ([1658834](https://github.com/AtomiCloud/sulfone.helium/commit/1658834eeb44f9ed77727b3931a4d51284990f66))
* **cyanprint:** Remove old test infra, add CyanPrint docs ([2ec6b9f](https://github.com/AtomiCloud/sulfone.helium/commit/2ec6b9f22ae7c769e523d9fdfde3346bc5c0c620))


### 🐛 Bug Fixes 🐛

* **CU-86ex00up9:** add cyanprint to nix env, remove k6 ([8533576](https://github.com/AtomiCloud/sulfone.helium/commit/8533576e0478c16af48c31e107ee1dfbc7d85ba9))
* **CU-86ex00up9:** add debug logging for processor test failures ([72590b0](https://github.com/AtomiCloud/sulfone.helium/commit/72590b0cc3408d43cc17727ee8784c56e5bf9e28))
* **CU-86ex00up9:** add missing template snapshot directories ([5345902](https://github.com/AtomiCloud/sulfone.helium/commit/534590297b3475e0bfec802e88a3bf46c5f9d5bf))
* **CU-86ex00up9:** address CodeRabbit feedback ([b129ec2](https://github.com/AtomiCloud/sulfone.helium/commit/b129ec25a11f70c118f8d02a5da7169b60475950))
* **CU-86ex00up9:** ensure template snapshot dirs exist in CI ([ad1fedd](https://github.com/AtomiCloud/sulfone.helium/commit/ad1feddd109979fbe0d7d9f0bdcbc2ddb339d0ec))
* **CU-86ex00up9:** ensure template snapshot dirs exist in local test ([d258511](https://github.com/AtomiCloud/sulfone.helium/commit/d25851177eca01ca490a9895e01eb835bc261a28))
* **CU-86ex00up9:** fix template and processor test failures in CI ([ecfdace](https://github.com/AtomiCloud/sulfone.helium/commit/ecfdacefd70a6a0a2c2492b4f793f8d244dc640e))
* **CU-86ex00up9:** fix test infra and add CI cyanprint script ([0201b84](https://github.com/AtomiCloud/sulfone.helium/commit/0201b842802d5f1a5a30bc1b10f7959d33f43829))
* **CU-86ex00up9:** gracefully skip cyanprint tests when unavailable ([bea2170](https://github.com/AtomiCloud/sulfone.helium/commit/bea21704447ef4fb5e29bc46db8d8801523ca271))
* **CU-86ex00up9:** remove .gitkeep from template snapshot dirs ([027082d](https://github.com/AtomiCloud/sulfone.helium/commit/027082d02f043593af7985c115cdd464e95604f5))
* **CU-86ex00up9:** remove USER directive from processor Dockerfiles ([fc479cb](https://github.com/AtomiCloud/sulfone.helium/commit/fc479cb59ad95698ab7048a52fddd86bf0fc0b0e))
* resolve CI and CodeRabbit review issues ([4ac5aed](https://github.com/AtomiCloud/sulfone.helium/commit/4ac5aedce37d44afb5b64aa8b7d5da54b8a06f7b))
* **ci:** run cyanprint commands inside nix develop shell ([73ca158](https://github.com/AtomiCloud/sulfone.helium/commit/73ca1580bbfeacd01f2c46e471311d37054796af))


### 🧪 Tests 🧪

* **cu-86ex00up9:** add cyan output and test artifact ([43451d7](https://github.com/AtomiCloud/sulfone.helium/commit/43451d782d6b65a94fd3386a1b5f04548057dc48))

## [2.1.0](https://github.com/AtomiCloud/sulfone.helium/compare/v2.0.1...v2.1.0) (2026-03-02)


### 📜 Documentation 📜

* add Helium multi-language library architecture and usage documentation ([c43c9f0](https://github.com/AtomiCloud/sulfone.helium/commit/c43c9f0f571603204ce4644b3280f3794166d975))
* add language to fenced code block in spec [CU-86ewrbr69] ([7ae5f77](https://github.com/AtomiCloud/sulfone.helium/commit/7ae5f775aed3ed912d0b99c01d420e4072b3d549))
* add task spec for CU-86ewrbr69 ([baab8b8](https://github.com/AtomiCloud/sulfone.helium/commit/baab8b8801c2e3361e45e1ebd529a13be015f4be))
* address additional CodeRabbitAI feedback ([adb7545](https://github.com/AtomiCloud/sulfone.helium/commit/adb7545122ee326933357b07d65ae71472aae50d))
* address CodeRabbitAI review feedback ([7a6d390](https://github.com/AtomiCloud/sulfone.helium/commit/7a6d390b7c8262e97cdb617df5b8a3fdf7d813ea))
* clarify TypeScript DoD scope in spec [CU-86ewrbr69] ([70e24c4](https://github.com/AtomiCloud/sulfone.helium/commit/70e24c4090abf8092f4f24e63cb35fefc6de5ecb))
* fix dependency section in core-types module ([8cf5543](https://github.com/AtomiCloud/sulfone.helium/commit/8cf554339803925c93148eff3bb0e3a0837c96d6))
* fix tsc command to use tsconfig.json ([695acb9](https://github.com/AtomiCloud/sulfone.helium/commit/695acb9936e4cf49ae653e6f481384b2206ac99d))
* remove space before # in .NET heading to avoid MD020 ([f30694d](https://github.com/AtomiCloud/sulfone.helium/commit/f30694dd64014341746fb5b184294b3b2179471b))
* update and correct inaccuracy in docs ([cb566ff](https://github.com/AtomiCloud/sulfone.helium/commit/cb566ff8136078e5dc5bbcab93001bd4f6935c28))


### 🚀 Features 🚀

* **resolver:** implement Resolver SDK for Node.js, Python, and .NET ([528d8d9](https://github.com/AtomiCloud/sulfone.helium/commit/528d8d9ab7a723a22b9a5bf79d03129de07fc90f))


### 🐛 Bug Fixes 🐛

* add timeout to health check loops in test.sh ([a621563](https://github.com/AtomiCloud/sulfone.helium/commit/a6215634b14932108e5d719cd7359111b8e50887))
* address CodeRabbit review feedback [CU-86ewrbr69] ([33d54bd](https://github.com/AtomiCloud/sulfone.helium/commit/33d54bd05306e32ee80349a1a89453a78dc00150))
* address remaining CodeRabbit feedback [CU-86ewrbr69] ([cd1a16a](https://github.com/AtomiCloud/sulfone.helium/commit/cd1a16a3b4fde611b4b84d5ec67153d2629200e2))

## [2.0.1](https://github.com/AtomiCloud/sulfone.helium/compare/v2.0.0...v2.0.1) (2025-05-04)


### 🐛 Bug Fixes 🐛

* remove non-existing extensions ([#3](https://github.com/AtomiCloud/sulfone.helium/issues/3)) ([ce914e7](https://github.com/AtomiCloud/sulfone.helium/commit/ce914e7669b0d14ee68e1b1bb1ad7b7c5fcb78c3))
* **default:** remove non-existing extensions ([56d087a](https://github.com/AtomiCloud/sulfone.helium/commit/56d087a0a1461c34ff2bb5ebfc790358190797ff))

## [2.0.0](https://github.com/AtomiCloud/sulfone.helium/compare/v1.8.1...v2.0.0) (2025-05-02)


### 🚀 Features 🚀

* **breaking:** lost backward compatibility due to ref-based questions ([3af73d1](https://github.com/AtomiCloud/sulfone.helium/commit/3af73d1bff24eb187e7fa882f7267f0eb12c8b06))

## [1.8.1](https://github.com/AtomiCloud/sulfone.helium/compare/v1.8.0...v1.8.1) (2025-05-02)


### 🐛 Bug Fixes 🐛

* use correct keys for ci and cd ([44b6ee9](https://github.com/AtomiCloud/sulfone.helium/commit/44b6ee96076c4601384e0af8ae90a41cf3e0d165))

## [1.8.0](https://github.com/AtomiCloud/sulfone.helium/compare/v1.7.0...v1.8.0) (2025-05-02)


### 🚀 Features 🚀

* **atomi_release:** change answers to use referenced-id ([5a83778](https://github.com/AtomiCloud/sulfone.helium/commit/5a83778f84a4a796336c630ad8c0b56032518d1e))
* include deterministic feature in the test templates ([8355d20](https://github.com/AtomiCloud/sulfone.helium/commit/8355d207b6170e8cc5a82d937f46155684ece9fb))
* migrate to use ID ([74cad07](https://github.com/AtomiCloud/sulfone.helium/commit/74cad07f0f062f5bf876ba76f5d95888fc814680))
* templates with full-platform compatibility ([46c4ef3](https://github.com/AtomiCloud/sulfone.helium/commit/46c4ef37940cecc6312eac6241ea780f2d0c0c85))


### 🐛 Bug Fixes 🐛

* compatible test for node, python and dotnet ([de33ffa](https://github.com/AtomiCloud/sulfone.helium/commit/de33ffa8b6743768b41937e88ecb7f7bc7c81e5c))
* git ignored items ([91a037a](https://github.com/AtomiCloud/sulfone.helium/commit/91a037a864d8f245f9a79718bcd072cd9e3ca5b4))
* improve code quality and change CI methodology ([bf6717b](https://github.com/AtomiCloud/sulfone.helium/commit/bf6717bda616485d43ecd9ec1392c2c44612ea66))
* incorrect check of workflow success ([b39a9e1](https://github.com/AtomiCloud/sulfone.helium/commit/b39a9e18518fdccf401cbc3851cdb40b880f36ab))
* python typing errors ([a9977dc](https://github.com/AtomiCloud/sulfone.helium/commit/a9977dcf7baa5e09421719fb8af07364ce27ddbb))
* **default:** tests and inconsistency between sdks ([deb192f](https://github.com/AtomiCloud/sulfone.helium/commit/deb192f9e568d4a7baff042a2b5e08f5dc72a03d))
* **default:** type error with node sdk ([debfd68](https://github.com/AtomiCloud/sulfone.helium/commit/debfd68043ec8e46480308cdcb45fea0e4a3b7cd))


### 🧪 Tests 🧪

* **default:** includdes deterministic states ([a11da18](https://github.com/AtomiCloud/sulfone.helium/commit/a11da1839e247274d37473b82fc5ae8cfeede14c))

## [1.7.0](https://github.com/AtomiCloud/sulfone.helium/compare/v1.6.0...v1.7.0) (2025-04-23)


### 🚀 Features 🚀

* upgrade infra configuration ([b633ffc](https://github.com/AtomiCloud/sulfone.helium/commit/b633ffc92714c8cbeb967695eb7043ea703117e3))

## [1.6.0](https://github.com/AtomiCloud/sulfone.helium/compare/v1.5.0...v1.6.0) (2025-01-10)


### 🚀 Features 🚀

* update flakes to v1 ([0eefcd6](https://github.com/AtomiCloud/sulfone.helium/commit/0eefcd6de064e498cbf098cb254a0b08f5de4a96))
* upgrade all backing infrastructure ([ca6305a](https://github.com/AtomiCloud/sulfone.helium/commit/ca6305a936ff80202db454f69ace6b57259d23cd))


### 🐛 Bug Fixes 🐛

* incorrect release ([44aa30b](https://github.com/AtomiCloud/sulfone.helium/commit/44aa30ba02faebca458ca7e11eb6e64052792183))
* missing gcc ([9bc253f](https://github.com/AtomiCloud/sulfone.helium/commit/9bc253fb9817a2aee8cb36d6dc72032434c6ea29))
* missing prettier ([16d84cc](https://github.com/AtomiCloud/sulfone.helium/commit/16d84cc6f987e3dfee7639ac7bd3b0e7235f4f92))

## [1.5.0](https://github.com/AtomiCloud/sulfone.helium/compare/v1.4.4...v1.5.0) (2023-12-26)


### 🚀 Features 🚀

* include secret scanning ([e583ff2](https://github.com/AtomiCloud/sulfone.helium/commit/e583ff2e26cc886e9ac4223e36010378720620f0))

## [1.4.4](https://github.com/AtomiCloud/sulfone.helium/compare/v1.4.3...v1.4.4) (2023-11-14)


### 🐛 Bug Fixes 🐛

* **python:** conversion to camel case for processors and plugins ([b59a85c](https://github.com/AtomiCloud/sulfone.helium/commit/b59a85cc49ed47018e99823a80479b7b7f09fb7b))

## [1.4.3](https://github.com/AtomiCloud/sulfone.helium/compare/v1.4.2...v1.4.3) (2023-11-14)


### 🐛 Bug Fixes 🐛

* **node:** no-dir when globbing ([27a15bd](https://github.com/AtomiCloud/sulfone.helium/commit/27a15bdb6e63d3cc9f847e1d4bb7138b8f12e599))

## [1.4.2](https://github.com/AtomiCloud/sulfone.helium/compare/v1.4.1...v1.4.2) (2023-11-14)


### 🐛 Bug Fixes 🐛

* **node:** glob search to include dot files ([4822005](https://github.com/AtomiCloud/sulfone.helium/commit/48220059e431bc7e8df58908364f4278dfcfe1cb))

## [1.4.1](https://github.com/AtomiCloud/sulfone.helium/compare/v1.4.0...v1.4.1) (2023-11-14)


### 🐛 Bug Fixes 🐛

* incorrect relative path calculations ([d63577d](https://github.com/AtomiCloud/sulfone.helium/commit/d63577d545fb60d52aaa364d2d27713461638067))

## [1.4.0](https://github.com/AtomiCloud/sulfone.helium/compare/v1.3.7...v1.4.0) (2023-11-14)


### 🚀 Features 🚀

* publicize all fields in VirtualFile and VirtualFileReferences ([b4ca621](https://github.com/AtomiCloud/sulfone.helium/commit/b4ca6211fc55d836acd6ceef1f880653aaca06ce))

## [1.3.7](https://github.com/AtomiCloud/sulfone.helium/compare/v1.3.6...v1.3.7) (2023-11-13)


### 🐛 Bug Fixes 🐛

* python not having healthcheck ([95fc05b](https://github.com/AtomiCloud/sulfone.helium/commit/95fc05b2a6f3bf7d9494ce8c56ba76994022b844))

## [1.3.6](https://github.com/AtomiCloud/sulfone.helium/compare/v1.3.5...v1.3.6) (2023-11-13)


### 🐛 Bug Fixes 🐛

* **python:** remove dead code ([7edf28f](https://github.com/AtomiCloud/sulfone.helium/commit/7edf28f943fa84957cc3afbd235b4dfa84ab3f66))

## [1.3.5](https://github.com/AtomiCloud/sulfone.helium/compare/v1.3.4...v1.3.5) (2023-11-13)


### 🐛 Bug Fixes 🐛

* package name too close to existing package ([f7a1477](https://github.com/AtomiCloud/sulfone.helium/commit/f7a1477bc38a1d8d61e4f9cb1ee615c04e35e3a1))

## [1.3.4](https://github.com/AtomiCloud/sulfone.helium/compare/v1.3.3...v1.3.4) (2023-11-13)


### 🐛 Bug Fixes 🐛

* incorrect package folder for publish ([2152be3](https://github.com/AtomiCloud/sulfone.helium/commit/2152be3709aa2c13043d58656cab44ac39e9dbfc))

## [1.3.3](https://github.com/AtomiCloud/sulfone.helium/compare/v1.3.2...v1.3.3) (2023-11-13)


### 🐛 Bug Fixes 🐛

* used package name ([8c3d465](https://github.com/AtomiCloud/sulfone.helium/commit/8c3d465bd99a8c27ff1f1b5a7e4671d226688757))

## [1.3.2](https://github.com/AtomiCloud/sulfone.helium/compare/v1.3.1...v1.3.2) (2023-11-13)


### 🐛 Bug Fixes 🐛

* incorrect publish script ([f358ea8](https://github.com/AtomiCloud/sulfone.helium/commit/f358ea8aa593a7818a8f71d853ef8ddc6808464b))

## [1.3.1](https://github.com/AtomiCloud/sulfone.helium/compare/v1.3.0...v1.3.1) (2023-11-13)


### 🐛 Bug Fixes 🐛

* missing version commit ([725c0c2](https://github.com/AtomiCloud/sulfone.helium/commit/725c0c27d26ad73c09953a829adf02e1af76b1db))

## [1.3.0](https://github.com/AtomiCloud/sulfone.helium/compare/v1.2.1...v1.3.0) (2023-11-13)


### 🚀 Features 🚀

* **python:** initial release ([3ca5aaa](https://github.com/AtomiCloud/sulfone.helium/commit/3ca5aaa723001a495b95bb5b5af5fdc8b673e3a8))


### 🐛 Bug Fixes 🐛

* incorrect publishing for python ([435cf03](https://github.com/AtomiCloud/sulfone.helium/commit/435cf0397ef3a6ef5f0460c2b0f9a91215db843c))

## [1.2.1](https://github.com/AtomiCloud/sulfone.helium/compare/v1.2.0...v1.2.1) (2023-11-09)


### 🐛 Bug Fixes 🐛

* close stream, since proxy streams ([e66c75f](https://github.com/AtomiCloud/sulfone.helium/commit/e66c75f29cd013d9d2fd4a5ebf62f20525b82cfa))

## [1.2.0](https://github.com/AtomiCloud/sulfone.helium/compare/v1.1.4...v1.2.0) (2023-11-09)


### 🚀 Features 🚀

* add console logs ([1777b24](https://github.com/AtomiCloud/sulfone.helium/commit/1777b24b5da018ed6212eb3b659c24c3bdd9bce0))

## [1.1.4](https://github.com/AtomiCloud/sulfone.helium/compare/v1.1.3...v1.1.4) (2023-11-08)


### 🐛 Bug Fixes 🐛

* **node:** listen on 0.0.0.0 ([5c0c76c](https://github.com/AtomiCloud/sulfone.helium/commit/5c0c76c00ac4df780f9288aaca436aff75b293e0))

## [1.1.3](https://github.com/AtomiCloud/sulfone.helium/compare/v1.1.2...v1.1.3) (2023-11-08)


### 🐛 Bug Fixes 🐛

* **node:** missing export for QuestionType ([7a72f25](https://github.com/AtomiCloud/sulfone.helium/commit/7a72f25453d2217fa0b7e7e716240b73e83a8568))

## [1.1.2](https://github.com/AtomiCloud/sulfone.helium/compare/v1.1.1...v1.1.2) (2023-11-08)


### 🐛 Bug Fixes 🐛

* incorrect manifest ([9e8181a](https://github.com/AtomiCloud/sulfone.helium/commit/9e8181a288944cf3ed7ef18e257c5d57646fbf98))

## [1.1.1](https://github.com/AtomiCloud/sulfone.helium/compare/v1.1.0...v1.1.1) (2023-11-08)


### 🐛 Bug Fixes 🐛

* **node:** incorrect manifest ([2f1919a](https://github.com/AtomiCloud/sulfone.helium/commit/2f1919ab1a475e7377b8a2fa11ef9cae64b5426d))

## [1.1.0](https://github.com/AtomiCloud/sulfone.helium/compare/v1.0.0...v1.1.0) (2023-11-08)


### 🚀 Features 🚀

* release with semver ([8ad7044](https://github.com/AtomiCloud/sulfone.helium/commit/8ad704459325cd7eddda6dea4a64656e9c3d2a5d))

## 1.0.0 (2023-11-08)


### 🚀 Features 🚀

* all templates, extensions, plugins and processors have / as status ([c5c26ea](https://github.com/AtomiCloud/sulfone.helium/commit/c5c26eaa4ab8b333ee335f2f1cee6a905b3334eb))
* initial commit ([697a1ce](https://github.com/AtomiCloud/sulfone.helium/commit/697a1ceef8cebfdad871ba3714748a618201a045))
* node package ([3986285](https://github.com/AtomiCloud/sulfone.helium/commit/3986285f65876d46f8dec9c0061f3db6ba9d2414))


### 🐛 Bug Fixes 🐛

* broken ci ([7610580](https://github.com/AtomiCloud/sulfone.helium/commit/7610580ac7c4294a2ccf7c4a416fa298b54ec31a))
* ci ([b89d7fd](https://github.com/AtomiCloud/sulfone.helium/commit/b89d7fda4680b645b4116423a30ec2c6c342cec1))
* incorrect 'nupkg' extension in publish.sh ([13291f1](https://github.com/AtomiCloud/sulfone.helium/commit/13291f19689411561edcdfe133ce2f27c9751c79))
* incorrect Github Action CI location ([079f93c](https://github.com/AtomiCloud/sulfone.helium/commit/079f93cb3b287b4262a31deed1674745f31d324d))
* missing release script for CD ([3174b5e](https://github.com/AtomiCloud/sulfone.helium/commit/3174b5e5aca19178e6f2074a4388fe93824f19cb))
* releaser CD ([e8d81d9](https://github.com/AtomiCloud/sulfone.helium/commit/e8d81d986b47e2e17b2064e031a1894c6c125f9b))
