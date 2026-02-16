# Date # 

  # // ----- 9-feb ----- //

# Orders & Users API

This project implements User and Order schemas with a relational connection between them, and provides CRUD APIs to manage orders. The populate method is used to fetch the user details linked to each order.

# Features

User and Order models created with Mongoose.

Relation between Order and User (ref: "User").

- Create → Add a new order.

- Read → Fetch all orders with populated user       details.

- Update → Modify an existing order.

- Delete → Remove an order.

# Error handling for invalid operations or missing data.