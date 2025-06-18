# Installation and Configuration

## .env files

there are 3 environments for the project:

| environment | based | purpose                                                       |
| ----------- | ----- | ------------------------------------------------------------- |
| live        | cloud | provide live content, etc, to students, teachers, and parents |
| development | cloud | internal team only, for testing out new code                  |
| emulator    | local | for more rapid development of firebase functions              |

there must be 3 `.env.*` files provided, each corresponding to the appropriate environment. these would be `.env.live`, `.env.development`, and `.env.emulator`. these files are not committed to version control but should have the following structure:

| key                             | purpose                                                                       |
| ------------------------------- | ----------------------------------------------------------------------------- |
| VITE_FIREBASE_APIKEY            | taken from Firebase console project settings                                  |
| VITE_FIREBASE_APPID             | same as above                                                                 |
| VITE_FIREBASE_AUTHDOMAIN        | same as above                                                                 |
| VITE_FIREBASE_DATABASE_URL      | same as above                                                                 |
| VITE_FIREBASE_MESSAGINGSENDERID | same as above                                                                 |
| VITE_FIREBASE_PROJECTID         | same as above                                                                 |
| VITE_FIREBASE_STORAGEBUCKET     | same as above                                                                 |
| VITE_FIREBASE_ENVIRONMENT       | should be either `live`, `development`, or `emulator`, and match the filename |

the yarn scripts used to launch the project, such as a locally served version, in XCode, or for deployment, will programmatically create a `.env` file, copying from the appropriate environment. do not modify the generated `.env` directly, as it will be overwritten by the yarn scripts. instead, modify the appropriate `.env.*` file.

_note_ there is a `.env-template` file provided but, as of the writing of this documentation, that file has not been verified to up to date. instead, use the key table above.

## configuring yarn

this project is using `yarn v4.0.1`.

depending on your `npm` version, you may need to install or enable corepack first:

```
# if you are using npm ≥16.10 but < 18, you need to enable it:
corepack enable

# if corepack is not installed at all, you need to install it globally:
npm install -g corepack
```

finally:

```
# install yarn
corepack prepare yarn@4.0.1 --activate
```

note: the project is likely to run just fine with yarn@4.x.x, so you may want to run instead:

```
corepack prepare yarn@stable --activate

```

## versions of the technologies used.

all of the `packages/app` dependencies, including minimum or pinned version numbers are provided in `packages/app/package.json`

to install them, make sure that you are in the `packages/app` directory and run `yarn`.

## Required operating system and version to run the project.

this project has been confirmed to run on run on macos 15.3.2 and will likely run without issues on other macos versions or on Windows / Linux machines.

## Images and potential configuration errors.

TBD

## Differences among the three environments and how to manage them.

as of this documentation, the `development` firebase project is out of date and will need to be updated to mirror the data structure on the `live` firebase project.

additionally, the `emulator` environment uses basic test data that is committed to version control. however, it currently is only user data and not content data.

## List of essential requirements to run the project.

the `.env.*` files need to be provided; the dependencies need to be installed via `yarn`.

further items TBD

## Step-by-step guide with screenshots for installing and configuring the project from scratch.

step 1: clone the repository  
`git clone git@github.com:bilingualgeneration/bili-app.git`
![git clone git@github.com:bilingualgeneration/bili-app.git](documentation/installation_step_1)

step 2: cd into the newly cloned directory and into the correct sub repo  
`cd bili-app`
![cd bili-app](documentation/installation_step_4)

step 3: install dependencies  
`yarn`
![yarn](documentation/installation_step_3)

step 4: provided the necessary `.env.*` files  
depends on your personal methods

# Launching the project in each environment

## Deployment technology or platform.

make sure you are in the appropriate directory (`packages/app`) and run any of the following commands:

| command                  | purpose                                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `yarn serve:development` | launch local web version of the app that is connected to the `development` Firebase project based in the cloud                 |
| `yarn serve`             | same as `yarn serve:development`, just added for convenience                                                                   |
| `yarn serve:live`        | launch local web version of the app that is connected to the `live` Firebase project based in the cloud                        |
| `yarn serve:emulator`    | launch local web version of the app that is connected to the locally running Firebase `emulator` in `packages/server`          |
| `yarn open:ios:live`     | compile and build the app to run on `ios`, connected to the `live` Firebase project; this will also automatically launch XCode |

additionally, there are 2 web based deployments managed by [Netlify](https://www.netlify.com/). there is a `live` which is the web version accessed by students, teachers, and caregivers, as well as a `dev` version for internal team use. to trigger a CI/CD deployment, do the following

```
# make sure you are on main and are up to date
git checkout main
git pull

# to trigger a live deploy
git checkout publish-live
git merge main
git push

# to trigger a dev deploy
git checkout publish-dev
git merge main
git push
```

build progress, errors, and issues can be monitored on the Netlify dashboard

## Known limitations.

as of the writing of this documentation, there is a critical issue with ios simulator and logging into Firebase. [ios simulator does not support the HTTP/3 protocol](https://developer.apple.com/documentation/technotes/tn3102-http3-in-your-app)

> HTTP/3 is not supported in the simulator

however, sign in calls using the Firebase JS SDK are sent over HTTP/3. [here](https://github.com/firebase/firebase-ios-sdk/issues/14677) is a related GitHub issue that doesn't mention authentication but deals with the same underlying cause. this affects email/password authentication when running the ios simulator.

## Required permissions and credentials.

the `firestore` and `realtime database` rules need to provide read access to all content. currently, all data is readable so more stringent rules will likely need to be created.

most media files (images, audio) are stored in an AWS S3 bucket. currently, these files are public. a more stringent access control model will likely need to be created.

# Diagrams

## BPMN (optional but recommended; otherwise, an equivalent flow diagram).

```mermaid

```

## Relational diagram connecting Firebase to the data stored in Strapi (without Directus).

```mermaid
flowchart LR
    A(["strapi"]) -- content --> B("sync-strapi
    (firebase function)")
    B --> C("firestore")
    A -- media --> E("AWS S3")
    D("frontend client") --> C
    D --> E
```

## Firebase data dictionary.

TBD

# Folder or module organization

## Key dependencies.

## Organization rules.

## Description of each folder (e.g., _Hooks_: used for …).

## Relevant technical decisions and their justification—e.g., why send data stored in Strapi to Firebase instead of querying it directly?

# Code standards

## Prettier or other formatter configuration.

## Style guide and naming/syntax conventions.

# Test execution

**note** in the initial few months of development, we had implemented and kept up with unit / e2e tests. however, as project needs increased, we paused maintaining and creating tests, which still remain paused today.

any existing tests should be considered outdated and invalid. for the testing tools and best practices that Ionic recommends, please read [here](https://ionicframework.com/docs/react/testing/introduction).

## E2E test configuration.

N/A

## Minimum coverage required.

N/A

## Representative test example.

N/A

## When and at what level tests should be performed.

N/A

# Security

## Role management.

## Security policies for external applications.

## Deprecated versions with warnings or vulnerabilities in both external libraries and the application itself.

# Frequent problems or significant errors

# Installation and configuration of external applications

# AWS SES, Strapi, ClassLink, among others, documented within the `docs/` folder of each repository.
