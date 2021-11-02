# elasticseach-index-migrate-to-sql
Migrates a elasticseach index to sql | relational database.


# Local Testing
### Deploying on service: elk search & postgre
From root of project
``` docker-compose -f docker/docker-compose.yml up -d ```

### Remove all service: elk search & postgre
From root of project
``` docker-compose -f docker/docker-compose.yml down ```

# Usage

- copy settings/setting.json.tmpl >> settings/setting.json
``` cp settings/setting.json.tmpl settings/setting.json ```
- edit the settings.json for your database and elasticsearch connection
- edit mapping indexes -> db tables.
- Run script 
``` npm start ```

# arguments

# Production 


