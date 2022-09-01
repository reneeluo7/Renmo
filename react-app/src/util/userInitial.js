export default function getUserInitials(user) {
    const initial = user.firstName[0] + user.lastName[0];
    return initial.toUpperCase();
  }