# ehr-assignment

Senior Full-stack Engineering Take-home Assignment

## Instructions

Is a monorepository where the frontend folder is the client of the app, and the backend folder is the server of the app.

The backend consists of 5 services

1. core/gateway
2. patient service
3. clinical service
4. ehr service
5. redis servicec (do not run this service - not implemented)

Note: use node js version 20.x or higher

1. run npm install in both projects (frontend and backend)
2. run the frontend with npm run dev
3. run without any specific order:
   3.1 npm start patient
   3.2 npm start clinical
   3.3 npm start ehr
4. npm start to start the core/gateway

Existing pages:

1. /login
2. /signup
3. / (patient page)

## Explanation

Is a monorepository where the frontend folder is the client of the app, and the backend folder is the server of the app.

The backend consists of 5 services

1. core/gateway
2. patient service
3. clinical service
4. ehr service
5. redis servicec (do not run this service - not implemented)

Note: use node js version 20.x or higher

1. run npm install in both projects (frontend and backend)
2. run the frontend with npm run dev
3. run without any specific order:
   3.1 npm start patient
   3.2 npm start clinical
   3.3 npm start ehr
4. npm start to start the core/gateway

Existing pages:

1. /login
2. /signup
3. / (patient page)

Explanation:

A ## microservices-based architectural solution ## was used, as we can predict that given the business model, it could expand and scale quickly, which would make it necessary to modularize the services before it becomes more complicated later on. In addition many services may require scaling horinzotal in greater quantity than others, with microservices we can take care of scaling the services we want and in the amount we want, plus we can treat each service with different data structures or databases, which given the business model can be beneficial to run complex analytic queries in data warehouse and data lake (for analytics), fast access with non-SQL data, or more structured and secure data such as payments with relational database. Because of the complexity of the business model and the interconnection between all EHRs and patient data, it makes microservices an optimal solution for this type of business.

I would apply TDD based implementation, this paradigm would allow us to generate unit, functional and integration tests.

- Unit tests: that allow to test own functions that allow to guarantee in an atomic way the operation of each logic, without fear that the result changes.

- Integration tests: as we have used microservices architecture, we must ensure that the integration between all modules can be guaranteed, either by connection by REST API, TCP, Kakfa, Redis, etc.

- Functional tests: to ensure that the implemented logic proposes the solution to the business model we are trying to solve

- Stress tests: as it is a platform that can receive millions of concurrent users, we must ensure the proper functioning of the same, taking into account auto scaling, instance replication, load balancing, etc.

Being a system that handles a large traffic of concurrent clients, it is convenient to apply coud solutions that allow scalability and robustness of the system taking into account low cost prices: I would use AWS to host in EC2 or ECS instances the business logic, apply horizontal scale using AWS auto scaling for the replication of the instances in different AZ regions to ensure the viability of the system. The AWS load balancer will be in charge of directing the request traffic to the various instances, and given the configuration we could set a maximum number of instances to be generated to be able to tolerate high customer traffic, and when the traffic drops, automatically the auto scaling will reduce the number of instances, which helps to have low costs as well.

For instances of this project we used in-data memory, but to guarantee a secure, scalable and reliable infrastructure we can use cloud solutions like DynamoDB or RDS, or with ORM and ODM manage databases like PostgreSQL or MongoDB for the modules, all depending on the business requirements.

For fast data management and caching, Redis can be applied for volatile data.

For authorization and authentication you could use solutions such as AWS Cognito, to ensure security and correct permissions for communication between different services, database, client, etc., with AWS and the use of IAM roles or policies allows to ensure restrictive access to different services depending on the requirement, so for example if we want a group of users can only have access to certain elements within the application, the granted permissions will have the necessary logic to prevent access to sites that are not authorized.
