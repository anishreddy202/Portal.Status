/*jshint maxlen:120 */
/*jshint -W079 */
var mockData = (function() {
  return {
    getUsers: getUsers,
    updateUser:updateUser,
    createUser:createUser,
    deleteUser:deleteUser
  };

  function getUsers(pageSize, currentPage) {
    var start = pageSize * currentPage || 0;
    var end = start + pageSize || 5;

    var users = [
      { "id":"1",
        "userName":"testUser1",
        "email":"testUser1@mail.com",
        "firstName":"Test",
        "lastName":"User1",
        "groups":["members"] },
      { "id":"2",
        "userName":"testUser2",
        "email":"testUser2@mail.com",
        "firstName":"Test",
        "lastName":"User2",
        "groups":["members"] },
      { "id":"3",
        "userName":"testUser3",
        "email":"testUser3@mail.com",
        "firstName":"Test",
        "lastName":"User3",
        "groups":["members"] },
      { "id":"4",
        "userName":"testUser4",
        "email":"testUser4@mail.com",
        "firstName":"Test",
        "lastName":"User4",
        "groups":["members"] },
      { "id":"5",
        "userName":"testUser5",
        "email":"testUser5@mail.com",
        "firstName":"Test",
        "lastName":"User5",
        "groups":["members"] },
      { "id":"6",
        "userName":"testUser6",
        "email":"testUser6@mail.com",
        "firstName":"Test",
        "lastName":"User6",
        "groups":["members"] },
      { "id":"7",
        "userName":"testUser7",
        "email":"testUser6@mail.com",
        "firstName":"Test",
        "lastName":"User7",
        "groups":["members"] },
      { "id":"8",
        "userName":"testUser8",
        "email":"testUser8@mail.com",
        "firstName":"Test",
        "lastName":"User8",
        "groups":["members"] },
      { "id":"9",
        "userName":"testUser9",
        "email":"testUser9@mail.com",
        "firstName":"Test",
        "lastName":"User9",
        "groups":["members"] }
    ];

    return {
      data: {
        count: users.length,
        pages: Math.ceil(users.length / pageSize),
        currentPage: currentPage,
        users: users.splice(start, end)
      }
    };
  }

  function updateUser(user){
      return {
        data: {
          "userName": "updatetestUser9",
          "email": "testUser9@mail.com",
          "firstName": "Test",
          "lastName": "User9",
          "groups": ["members"]
        }
      }
  }

  function createUser(){
    return {
      data: {
        "userName": "testUser10",
        "email": "testUser9@mail.com",
        "firstName": "Test",
        "lastName": "User10",
        "groups": ["members"]
      }
    }
  }

  function deleteUser(){
    return {
      data: true
    }
  }

})();
