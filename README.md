# Github User Search

![Github User Search exercise](http://image.noelshack.com/fichiers/2021/25/4/1624488748-screencapture-localhost-3001-2021-06-24-00-45-32.png)

## Overview

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). <br />
A searchbar to display users, by querying against [Github API](https://api.github.com/): `https://api.github.com/search/users?q={USER}`. <br />

## Github Api

#### Generate an access token

Github API requires a basic authentication with [personal access token](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token).

```
$ curl -u username:token https://api.github.com/user
```

#### Add your token within the CRA project

1. Create a **.env.development** file in the root of your project <br/>
2. Add `REACT_APP_GITHUB_TOKEN=your access token`

_Note: If you've already launch the project with `yarn start` before adding the env value, you may need to restart project ;-)_

## Running the project

Be sure, you have installed all dependencies and applications to run React project on your computer : [Getting Started with React](https://reactjs.org/docs/getting-started.html).

Clone this repository :

```
git clone https://github.com/clairelct/github-user-search.git
cd github-user-search
```

Install packages :

```
yarn
```

When installation is complete, run it :

```
yarn start
```
