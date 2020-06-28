## Super Admin Web
2020-06-25
- npm run db:migrate # this will create the persistent_tokens table
- USER_PASSWORD=<pass> USER_EMAIL=<email> npm run db:data # to create the super admin catalog and user

## Move Roles to User Catalogs
2020-04-06
Realized the the current data model that tracks roles is not equiped to handle support for allowing users
to log into websites. Eg if a merchant creates a customer account to a different site, then they will essentially
be given merchant access to that site. To resolve this, I moved the role to the user_catalogs table so that a given
role can only be present in the context of a catalog.

#### Deployment
- npm run db:migrate
- npm run db:data

## AWS S3 Support
2020-04-04
- Moved all the images from the public directory over to AWS S3
- Updated all current catalogs that had references to the public directoy to now point to S3

#### Deployment
- add AWS_S3_BUCKET environment variable
- npm run db:data

## MultiStore Support
Support for multiple stores. A lot of shit went into this guy

#### Deployment Instructions

* npm run db:migrate
* npm run db:seed:all
* MIGRATION_TYPE=data_migration npx sequelize db:migrate --to 20200204021203-create-georgecigar.js
* Create user for Mike
* npm run db:data