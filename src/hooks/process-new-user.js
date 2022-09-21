// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { data } = context;

    let email = data.email;
    let password = data.password;
    let nameF = "Jesus"

    function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    // Password must contain 8 characters and at least one number, one letter and one unique character such as !#$%&?
    function validatePassword(password) {
      var re = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/
      return re.test(password);
    }

    // Check email
    // Check user entered an email
    if(!email) {
      throw new Error('No email provided')
    } else {
      // Check email is valid format
      if (validateEmail(email)) {
        email = email
      } else {
        throw new Error('Not a valid email address')
      }
    }
    

    // Check password
    // Check user entered a password
    if (!password) {
      throw new Error('No password provided')
    } else {
      // Check password is valid
      if (validatePassword(password)) {
        password = password
      } else {
        throw new Error('Not a valid password. Password must contain 8 characters and at least one number, one letter and one unique character such as !#$%&?')
      }
    }

    // If email and password are OK then pass them
    context.data = {
      name: nameF,
      email,
      password
    }

    return context;
  };
};
