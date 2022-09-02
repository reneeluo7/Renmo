function getUserInitials(user) {
    const initial = user.firstName[0] + user.lastName[0];
    return initial.toUpperCase();
  }

function getUserFullName(user) {
    const fullname = user.firstName + ' ' + user.lastName
    return fullname
  }


  export {getUserFullName, getUserInitials}