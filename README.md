## My budgets

An Rest-API for technology project costs. To use the service, the customer must have an account registered in the system. Within the system, it will provide the necessary data to request a quote. At the end, the system will display the total value of the project. The client can also consult old budgets.

### How to install

**Clone the repository**

```
$ git clone https://github.com/martins20/MyBudgets-Backend.git

$ cd MyBudgets-Backend

$ cp .env.example .env

$ yarn

$ yarn docker

$ yarn test

$ yarn dev:server
```

<br>

<img src="./assets/scripts.gif" alt="steps"/>

<br>

# Endpoints

<br>

## Budgets

<br>

#### **GET - /budgets/:budget_id**

**Return a budget**

<br>

#### **GET - /budgets**

**Return list of budgets**

<br>

#### **POST - /budgets**

```typescript
name: string;
dev_quantity: number;
designer_quantity: number;
sm_quantity: number;
po_quantity: number;
min_days: number;
```

**Return the created budget**

#### **DELETE - /budgets/:budget_id**

**Empty return**

<br>
<hr>
<br>

## Users

<br>

#### **POST - /users**

```typescript
first_name: string;
second_name: string;
cpf: string;
email: string;
password: string;
confirm_password: string;
phone: string;
cep: string;
cnpj: string;
company_name: string;
address: string;
number: number;
state: string;
city: string;
complement: string;
```

**Return the created user**

#### **DELETE - /users/:user_id**

**Empty return**

<br>

### Techs

-   [x] Typescript,
-   [x] Docker,
-   [x] Node,
-   [x] Jest,
-   [x] Express,
-   [x] TypeORM + Decorators,
-   [x] Express Async Errors,
-   [x] Json Web Token,
-   [x] PostgreSQL,
-   [x] Tsyringe,
-   [x] Yup
-   [x] Tsconfig Paths
