const getAvatar = (username: string) => {
  if(!username) {
    return
  }
    const splittedName = username.split(" ")
    if (splittedName.length === 1) {
      return splittedName[0].toUpperCase().charAt(0) + splittedName[0].toUpperCase().charAt(1)
    } else if (splittedName.length > 1) {
      return (splittedName[0].charAt(0) + splittedName[1].charAt(0)).toUpperCase()
    } else {
      return "U"
    }
}

export { getAvatar }