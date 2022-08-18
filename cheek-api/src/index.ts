import { AppDataSource } from "./data-source"
import { ERole, Role } from "./entities/Role"
import { EAccountStatus, User } from "./entities/User"

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new role into the database...")
    const role = new Role()
    role.role = ERole.CUSTOMER
    role.created_at = new Date()
  
    await AppDataSource.manager.save(role)
    console.log("Saved a new role with id: " + role.id)

    console.log("Loading users from the database...")
    const roles = await AppDataSource.manager.find(Role)
    console.log("Loaded roles: ", roles)

    console.log("Here you can setup and run express / fastify / any other framework.")


    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Doe"
    user.lastName = "John"
    user.phone = "0612345678"
    user.email = "j.doe@mail.com"
    user.password = "Achanger22@"
    user.account_status = EAccountStatus.PENDING
    user.created_at = new Date()
    
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)


    

}).catch(error => console.log(error))
