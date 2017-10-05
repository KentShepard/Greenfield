
//Insert user data if it doesn't exist
var signupUser = function(db, user, callback) {
  //Specify the collection where we will 'insert' in this case 'users'
  var collection = db.collection('test-users');

  collection.insert(user, function(err, result) {

    console.log('Signed up a user', user, 'into Mongo collection');
    callback(result);
  });
}

//Find a user by email address
var findUserByEmail = function(db, email, success, failure) {
  //Specify the collection where we will 'find' in this case 'users'

  var collection = db.collection('test-users');
    //Find question, empty should return all
  // For testing purposes if you need to drop table: collection.drop()
  collection.find({ email: email }).toArray(function(err, user) {
    if (user.length) {
      success(user);
    } else {
      failure();
    }
  });
}

//Update user's score
var updateUserScore = function (db, email, points, callback) {

    var collection = db.collection('test-users');

    collection.findOneAndUpdate(
      { email: email },
      { $inc: { "score" : points } } //adds number of points to user's score
    , function(err, response) {
      callback(response);
    })

}

var updateUserQuestions = function(db, email, questionData, callback) {

  var collection = db.collection('test-users');
  let questionId = questionData.id;

  collection.findOneAndUpdate(
      { email: email },
      { $set: {
          questionsAnswered: {
            [questionId]: questionData
          }
        }
      }
      //adds question response data to user's data
    , function(err, response) {
      console.log('errrrr',err,'reesssssss',response)
      callback(response);
    })
}

module.exports = {
  signupUser: signupUser,
  findUserByEmail: findUserByEmail,
  updateUserScore: updateUserScore,
  updateUserQuestions: updateUserQuestions
}
