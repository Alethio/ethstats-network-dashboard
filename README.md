# ethstats-network-dashboard

*If you're looking for the ethstats-cli look here: https://github.com/Alethio/ethstats-cli*

> EthStats - Network Monitor - Dashboard
>
> Front-end application for the EthStats Network Statistics tool [ethstats.io](https://ethstats.io/)

A `yarn.lock` is present in the repo for flat dependencies. To install yarn on your system, run `npm install -g yarn`.
Although `yarn` is present it's not a requirement, you can use `npm` as well.

## Run the app

* Install dependencies: `yarn install`.
* Create & edit your env configuration file: `cp config.js.example config.js`.
* Start the dev server: `yarn start`. Additionally, you can specify which port to run on, for example: `yarn start -- --port=4040`.

## Build the app
```yarn build```

This will build the app into the `dist` directory in the root of the project. It contains the `index.html` along with the minified assets, ready for production.
