## Installation

This application uses MySQL as database, and requires an installation of MySQL to run.
The connection data for MySQL can be configured in `/integration/config.js`. The SQL needed to create the
required database can be found in `/sql/hq-payments.sql`.

## Unit Testing

Mocha is used as testing framework. Installation of mocha is done with

    $ npm install -g mocha

The test suites can be carried out by using the shell command

    mocha

## Security

This application is not secure. In order to improve security, the server would have to be configured to
only support HTTPS. Furthermore, no measures were taken to prevent SQL injection, Cross Side Scripting,
or similar security vulnerabilities.