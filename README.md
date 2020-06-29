# Description
This project is to implement an application to display an progress bar chart.
* Loading dynamic bars, buttons and limit data via Restful API
* Select progress bar and can change the bar value by click different step button
* Progress bar has minimum value is 0, but there is no resitriction for maximum value
* Bar will change background color when value above limiation
* Loading paging will appear before data loding finish
* There is Error page when Api error happened

## Start Application
This applicaiton requires [Node.js](https://nodejs.org/) to run

After NodeJS installation, running below commands line to have a check, if it print the version that means installation is successful
```sh
$ node -v
$ npm -v
```

then go to application base folder to install dependencies as below comannd line
```sh
$ npm install
```

After all dependencies installed run below command to start this application
```sh
$ npm run start
```

## Code quality check and formatting
Runnig below command line to check code syntax error and formating
```sh
$ npm run lint
```

## Test cases
### Test case summarize
* Unit tests for all components, container and utli
* Branch and function test coverage is 100%

### Run test cases
Runnig below command line to check each unit test result
```sh
$ npm run test
```

Running below command line to check test coverage result
```sh
$ npm run test:coverage
```


## Solution description
* Using Typescript;
* Using React Hook Apis;
* Add Loading page and Error paging for deployment of production env;
* Using eslint check code quality
* Using Prettier to format the code
* Using webpack for bundling file