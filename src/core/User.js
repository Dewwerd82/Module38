import { Component } from "./Component";
import { Utils } from "./Utils";

export class User {
    
    /**
    *  save new user in LocalStorage if this login don't exists. 
    *
    * @param {string} login user login
    * @param {string} password user password
    * @param {string/integer} roleCode number code of role 0 - user, 1 - administrator 
    */
    static createUser(login, password, roleCode='0') {
        if (userExists(login)) return false;

        let role;
        switch ('' + roleCode){
            case '0': role = 'user';
                break;
            case '1': role = 'administrator';
                break;
        }
        const user = {
            login: login,
            password: password,
            role: role,
            email: '',
            phone: ''
        }
        
        Utils.addToStorage(user, 'Users');

        return true;
    }

    /**
    *  check login and password.
    *
    * @param {string} login
    * @param {string} password
    * @return {string} user role or error
    */
    static authUser(login, password) {
        const user = userExists(login);
  
        if(user){
            if(user.password === password){
                User.setCurrentUser(login, user.role);
                return user.role;
            }else{
                return 'Invalid password';
            }
        }else{
            return 'This user does not exist';
        }
    }

    /**
    *  return user object from LocalStorage
    *
    * @param {string} login user login
    * @return {object} user object or underfined
    */
    static getUserData(login){
        return userExists(login);
    }

    /**
    *  return current user login
    * 
    * @return {string/null} 
    */
    static getCurrentUser(){
        return currentUser['login'];
    }

    /**
    *  return current user role
    * 
    * @return {string/null} 
    */
    static getCurrentRole(){
        return currentUser['role'];
    }

    /**
    *  set current user
    *
    * @param {string} login user login
    * @param {string} role user role
    */
    static setCurrentUser(login, role){
        currentUser = {
            login: login,
            role: role
        };
    }

    /**
    *  logOut current user and close Kanban-board
    * 
    */
    static logOut(){
        Component.renderComponent('menu', 'authForm');

        const props = {
          message: 'You log out'
        }
    
        Component.renderComponent('board', 'messageBlock', props);

        User.setCurrentUser(null, null);
    }
}

/**
*  check userlogin in localStorage
*
* @param {string} user user login
* @return {object} when user exits
* @return {undefined} when user not exits
*/
function userExists(login){
    return Utils.getFromStorage('Users').filter(user => user['login'] === login)[0];
}

let currentUser;